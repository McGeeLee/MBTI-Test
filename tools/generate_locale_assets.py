import concurrent.futures
import json
import time
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "src" / "data"
TARGET_DIR = ROOT / "mobile_app" / "assets" / "data"
TOOLS_DIR = ROOT / "tools"

LOCALES = ("en", "ko", "ja", "zh")
CACHE_FILES = {
    locale: TOOLS_DIR / f"translation_cache_{locale}.json" for locale in LOCALES
}
FAILURE_FILES = {
    locale: TOOLS_DIR / f"translation_failures_{locale}.json" for locale in LOCALES
}

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
    "en": {
        "分析家": "Analysts",
        "外交家": "Diplomats",
        "守护者": "Sentinels",
        "探险家": "Explorers",
    },
    "ko": {
        "分析家": "분석가형",
        "外交家": "외교관형",
        "守护者": "수호자형",
        "探险家": "탐험가형",
    },
    "ja": {
        "分析家": "分析家",
        "外交家": "外交官",
        "守护者": "守護者",
        "探险家": "探検家",
    },
    "zh": {
        "分析家": "分析家",
        "外交家": "外交家",
        "守护者": "守护者",
        "探险家": "探险家",
    },
}

VERSION_META = {
    "en": {
        "quick": {
            "title": "Quick",
            "duration": "About 5 minutes",
            "description": "A fast read on your core personality tendencies when time is limited.",
        },
        "standard": {
            "title": "Standard",
            "duration": "About 15 minutes",
            "description": "The most balanced version for depth and pacing, suitable for most users.",
        },
        "full": {
            "title": "Full",
            "duration": "About 30 minutes",
            "description": "A deeper and more detailed analysis when you want a fuller personality picture.",
        },
    },
    "ko": {
        "quick": {
            "title": "빠른 버전",
            "duration": "약 5분",
            "description": "시간이 적을 때 핵심 성향을 빠르게 파악할 수 있는 버전입니다.",
        },
        "standard": {
            "title": "표준 버전",
            "duration": "약 15분",
            "description": "깊이와 속도의 균형이 가장 좋은 버전으로 대부분의 사용자에게 적합합니다.",
        },
        "full": {
            "title": "전체 버전",
            "duration": "약 30분",
            "description": "더 넓고 깊은 성격 분석이 필요할 때 적합한 상세 버전입니다.",
        },
    },
    "ja": {
        "quick": {
            "title": "クイック版",
            "duration": "約5分",
            "description": "時間がないときに、あなたの核となる傾向を素早く把握できるバージョンです。",
        },
        "standard": {
            "title": "標準版",
            "duration": "約15分",
            "description": "深さとテンポのバランスが最も良く、ほとんどの人に適したバージョンです。",
        },
        "full": {
            "title": "フル版",
            "duration": "約30分",
            "description": "より詳しく多面的な分析を行いたいときのための詳細バージョンです。",
        },
    },
    "zh": {
        "quick": {
            "title": "快速版",
            "duration": "约 5 分钟",
            "description": "在时间有限时，快速了解你的核心性格倾向。",
        },
        "standard": {
            "title": "标准版",
            "duration": "约 15 分钟",
            "description": "在深度与节奏之间最均衡的版本，适合大多数用户。",
        },
        "full": {
            "title": "完整版",
            "duration": "约 30 分钟",
            "description": "适合想获得更深入、更全面性格分析的用户。",
        },
    },
}

STRING_FIXES = {
    "en": {
        "quick": "Quick",
        "standard": "Standard",
        "full": "Full",
    },
    "ko": {
        "quick": "빠른 버전",
        "standard": "표준 버전",
        "full": "전체 버전",
    },
    "ja": {
        "quick": "クイック版",
        "standard": "標準版",
        "full": "フル版",
    },
    "zh": {
        "quick": "快速版",
        "standard": "标准版",
        "full": "完整版",
    },
}


def load_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def load_cache(locale: str) -> dict[str, str]:
    path = CACHE_FILES[locale]
    if not path.exists():
        return {}
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return {}


def save_json(path: Path, data: Any) -> None:
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")


def should_keep_string(key: str | None, value: str) -> bool:
    if key in SKIP_KEYS:
        return True
    if value.startswith("#"):
        return True
    if value.isupper() and len(value) <= 5:
        return True
    return False


def collect_strings(node: Any, bucket: set[str], key: str | None = None) -> None:
    if isinstance(node, dict):
        for child_key, child_value in node.items():
            collect_strings(child_value, bucket, child_key)
        return

    if isinstance(node, list):
        for item in node:
            collect_strings(item, bucket, key)
        return

    if isinstance(node, str) and not should_keep_string(key, node):
        bucket.add(node.strip())


def translate_text(text: str, target_locale: str) -> str:
    fixes = STRING_FIXES[target_locale]
    if text in fixes:
        return fixes[text]

    params = urllib.parse.urlencode(
        {
            "client": "gtx",
            "sl": "zh-CN",
            "tl": target_locale,
            "dt": "t",
            "q": text,
        }
    )
    url = f"https://translate.googleapis.com/translate_a/single?{params}"
    request = urllib.request.Request(
        url,
        headers={"User-Agent": "Mozilla/5.0"},
    )

    last_error: Exception | None = None
    for _ in range(3):
        try:
            with urllib.request.urlopen(request, timeout=30) as response:
                payload = json.loads(response.read().decode("utf-8"))
            return "".join(part[0] for part in payload[0] if part[0]).strip()
        except Exception as exc:  # noqa: BLE001
            last_error = exc
            time.sleep(1)

    if last_error is not None:
        raise last_error
    return text


def translate_strings(strings: set[str], locale: str) -> tuple[dict[str, str], dict[str, str]]:
    cache = load_cache(locale)
    failures: dict[str, str] = {}
    pending = [item for item in sorted(strings) if item and item not in cache]

    if not pending:
        return cache, failures

    completed = 0
    total = len(pending)

    def worker(text: str) -> tuple[str, str | None, str | None]:
        try:
            return text, translate_text(text, locale), None
        except Exception as exc:  # noqa: BLE001
            return text, None, str(exc)

    with concurrent.futures.ThreadPoolExecutor(max_workers=8) as executor:
        futures = [executor.submit(worker, item) for item in pending]
        for future in concurrent.futures.as_completed(futures):
            text, translated, error = future.result()
            if translated is not None:
                cache[text] = translated
            else:
                failures[text] = error or "Unknown error"
                cache[text] = text

            completed += 1
            if completed % 100 == 0 or completed == total:
                print(f"[{locale}] {completed}/{total}")
                save_json(CACHE_FILES[locale], cache)

    save_json(CACHE_FILES[locale], cache)
    return cache, failures


def apply_translations(
    node: Any,
    locale: str,
    cache: dict[str, str],
    key: str | None = None,
) -> Any:
    if isinstance(node, dict):
        output: dict[str, Any] = {}
        for child_key, child_value in node.items():
            if child_key == "category" and isinstance(child_value, str):
                output[child_key] = CATEGORY_MAP[locale].get(child_value, child_value)
                continue
            output[child_key] = apply_translations(child_value, locale, cache, child_key)
        return output

    if isinstance(node, list):
        return [apply_translations(item, locale, cache, key) for item in node]

    if isinstance(node, str):
        if should_keep_string(key, node):
            return node
        return cache.get(node.strip(), node)

    return node


def build_questions_bundle(
    source_questions: dict[str, Any],
    locale: str,
    cache: dict[str, str],
) -> dict[str, Any]:
    if locale == "zh":
        translated_questions = source_questions
    else:
        translated_questions = apply_translations(source_questions, locale, cache)

    return {
        "meta": VERSION_META[locale],
        "questions": translated_questions,
    }


def build_types(
    source_types: list[dict[str, Any]],
    locale: str,
    cache: dict[str, str],
) -> list[dict[str, Any]]:
    if locale == "zh":
        return source_types
    return apply_translations(source_types, locale, cache)


def main() -> None:
    TARGET_DIR.mkdir(parents=True, exist_ok=True)

    source_questions = load_json(SOURCE_DIR / "questions.json")
    source_types = load_json(SOURCE_DIR / "types.json")

    strings: set[str] = set()
    collect_strings(source_questions, strings)
    collect_strings(source_types, strings)

    for locale in LOCALES:
        print(f"Generating locale: {locale}")
        if locale == "zh":
            questions_bundle = build_questions_bundle(source_questions, locale, {})
            types_bundle = build_types(source_types, locale, {})
            save_json(TARGET_DIR / f"questions_{locale}.json", questions_bundle)
            save_json(TARGET_DIR / f"types_{locale}.json", types_bundle)
            continue

        cache, failures = translate_strings(strings, locale)
        questions_bundle = build_questions_bundle(source_questions, locale, cache)
        types_bundle = build_types(source_types, locale, cache)

        save_json(TARGET_DIR / f"questions_{locale}.json", questions_bundle)
        save_json(TARGET_DIR / f"types_{locale}.json", types_bundle)

        if failures:
            save_json(FAILURE_FILES[locale], failures)


if __name__ == "__main__":
    main()
