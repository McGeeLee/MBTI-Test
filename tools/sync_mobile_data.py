import argparse
import shutil
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "shared" / "data" / "locales"
TARGET_DIR = ROOT / "apps" / "mobile" / "assets" / "data"
LOCALES = ("en", "ja", "ko", "vi", "zh")


def asset_pairs() -> list[tuple[Path, Path]]:
    return [
        (SOURCE_DIR / f"{kind}.{locale}.json", TARGET_DIR / f"{kind}_{locale}.json")
        for locale in LOCALES
        for kind in ("questions", "types")
    ]


def sync_assets() -> None:
    TARGET_DIR.mkdir(parents=True, exist_ok=True)
    for source, target in asset_pairs():
        if not source.exists():
            raise FileNotFoundError(f"Missing canonical data file: {source}")
        shutil.copyfile(source, target)


def check_assets() -> list[str]:
    errors: list[str] = []
    for source, target in asset_pairs():
        if not source.exists():
            errors.append(f"missing source: {source.relative_to(ROOT)}")
        elif not target.exists():
            errors.append(f"missing mobile asset: {target.relative_to(ROOT)}")
        elif source.read_bytes() != target.read_bytes():
            errors.append(f"out of sync: {target.relative_to(ROOT)}")
    return errors


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Synchronize canonical MBTI data into Flutter assets.",
    )
    parser.add_argument(
        "--check",
        action="store_true",
        help="Check asset consistency without writing files.",
    )
    args = parser.parse_args()

    if args.check:
        errors = check_assets()
        if errors:
            for error in errors:
                print(error)
            return 1
        print("Mobile data assets are in sync.")
        return 0

    sync_assets()
    print("Mobile data assets synchronized.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
