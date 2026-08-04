import asyncio
import json
from pathlib import Path
from typing import Any

import httpx

from sync_mobile_data import sync_assets


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "shared" / "data" / "source"
TARGET_DIR = ROOT / "shared" / "data" / "locales"
CACHE_FILE = ROOT / "tools" / "cache" / "translation_cache_vi.json"

SKIP_KEYS = {
    "id",
    "label",
    "value",
    "primary",
    "secondary",
    "compatible",
    "challenging",
}

CATEGORY_MAP = {
    "分析家": "Nhà phân tích",
    "外交家": "Nhà ngoại giao",
    "守护者": "Người bảo hộ",
    "探险家": "Nhà thám hiểm",
}

VERSION_META = {
    "quick": {
        "title": "Bản nhanh",
        "duration": "Khoảng 5 phút",
        "description": "Đánh giá nhanh xu hướng tính cách cốt lõi, phù hợp khi bạn có ít thời gian.",
    },
    "standard": {
        "title": "Bản tiêu chuẩn",
        "duration": "Khoảng 15 phút",
        "description": "Phiên bản cân bằng giữa độ sâu và thời gian, phù hợp với phần lớn người dùng.",
    },
    "full": {
        "title": "Bản đầy đủ",
        "duration": "Khoảng 30 phút",
        "description": "Phân tích sâu và chi tiết hơn, phù hợp khi bạn muốn có góc nhìn toàn diện.",
    },
}

STRING_FIXES = {
    "MBTI Personality": "Nhóm tính cách MBTI",
    "quick": "Bản nhanh",
    "standard": "Bản tiêu chuẩn",
    "full": "Bản đầy đủ",
}


class TranslationContext:
    def __init__(self) -> None:
        self.cache = self._load_cache()
        self.client: httpx.AsyncClient | None = None
        self.semaphore = asyncio.Semaphore(10)
        self.failures: dict[str, str] = {}

    def _load_cache(self) -> dict[str, str]:
        if not CACHE_FILE.exists():
            return {}
        try:
            return json.loads(CACHE_FILE.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            return {}

    def save_cache(self) -> None:
        CACHE_FILE.write_text(
            json.dumps(self.cache, ensure_ascii=False, indent=2),
            encoding="utf-8",
        )

    async def __aenter__(self) -> "TranslationContext":
        self.client = httpx.AsyncClient(
            timeout=30,
            headers={"User-Agent": "Mozilla/5.0"},
        )
        return self

    async def __aexit__(self, exc_type, exc, tb) -> None:
        if self.client is not None:
            await self.client.aclose()

    async def translate_text(self, text: str) -> str:
        text = text.strip()
        if not text:
            return text

        if text in self.cache:
            return self.cache[text]

        if text in STRING_FIXES:
            translated = STRING_FIXES[text]
            self.cache[text] = translated
            return translated

        assert self.client is not None
        async with self.semaphore:
            payload = None
            last_error = None
            for _ in range(3):
                try:
                    response = await self.client.get(
                        "https://translate.googleapis.com/translate_a/single",
                        params={
                            "client": "gtx",
                            "sl": "zh-CN",
                            "tl": "vi",
                            "dt": "t",
                            "q": text,
                        },
                    )
                    response.raise_for_status()
                    payload = response.json()
                    break
                except Exception as exc:  # noqa: BLE001
                    last_error = exc
                    await asyncio.sleep(1)

        if payload is None:
            self.failures[text] = str(last_error)
            self.cache[text] = text
            return text

        translated = "".join(part[0] for part in payload[0] if part[0]).strip()
        self.cache[text] = translated
        return translated


def should_keep_string(key: str | None, value: str) -> bool:
    if key in SKIP_KEYS:
        return True

    if value.startswith("#"):
        return True

    if value in VERSION_META:
        return True

    if value.isupper() and len(value) <= 5:
        return True

    return False


def collect_strings(node: Any, bucket: set[str], key: str | None = None) -> None:
    if isinstance(node, dict):
        for child_key, child_value in node.items():
            if child_key == "category" and isinstance(child_value, str):
                continue
            collect_strings(child_value, bucket, child_key)
        return

    if isinstance(node, list):
        for item in node:
            collect_strings(item, bucket, key)
        return

    if isinstance(node, str):
        if not should_keep_string(key, node):
            bucket.add(node.strip())
        return

    return


async def apply_translations(node: Any, ctx: TranslationContext, key: str | None = None) -> Any:
    if isinstance(node, dict):
        out: dict[str, Any] = {}
        for child_key, child_value in node.items():
            if child_key == "category" and isinstance(child_value, str):
                out[child_key] = CATEGORY_MAP.get(child_value, child_value)
                continue
            out[child_key] = await apply_translations(child_value, ctx, child_key)
        return out

    if isinstance(node, list):
        return [await apply_translations(item, ctx, key) for item in node]

    if isinstance(node, str):
        if should_keep_string(key, node):
            return node
        return ctx.cache.get(node.strip(), node)

    return node


async def translate_batch(strings: list[str], ctx: TranslationContext) -> None:
    pending = [item for item in strings if item and item not in ctx.cache and item not in STRING_FIXES]
    total = len(pending)
    if total == 0:
        return

    completed = 0

    async def worker(text: str) -> None:
        nonlocal completed
        await ctx.translate_text(text)
        completed += 1
        if completed % 50 == 0 or completed == total:
            ctx.save_cache()

    await asyncio.gather(*(worker(text) for text in pending))
    ctx.save_cache()


async def build_questions(ctx: TranslationContext) -> dict[str, Any]:
    source = json.loads((SOURCE_DIR / "questions.json").read_text(encoding="utf-8"))
    strings: set[str] = set()
    collect_strings(source, strings)
    await translate_batch(sorted(strings), ctx)
    translated = await apply_translations(source, ctx)
    return {
        "meta": VERSION_META,
        "questions": translated,
    }


async def build_types(ctx: TranslationContext) -> list[dict[str, Any]]:
    source = json.loads((SOURCE_DIR / "types.json").read_text(encoding="utf-8"))
    strings: set[str] = set()
    collect_strings(source, strings)
    await translate_batch(sorted(strings), ctx)
    return await apply_translations(source, ctx)


async def main() -> None:
    TARGET_DIR.mkdir(parents=True, exist_ok=True)

    async with TranslationContext() as ctx:
        questions = await build_questions(ctx)
        personality_types = await build_types(ctx)

    (TARGET_DIR / "questions.vi.json").write_text(
        json.dumps(questions, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    (TARGET_DIR / "types.vi.json").write_text(
        json.dumps(personality_types, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    if ctx.failures:
        (ROOT / "tools" / "translation_failures_vi.json").write_text(
            json.dumps(ctx.failures, ensure_ascii=False, indent=2),
            encoding="utf-8",
        )

    sync_assets()


if __name__ == "__main__":
    asyncio.run(main())
