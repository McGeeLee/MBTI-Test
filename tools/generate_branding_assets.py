import argparse
from pathlib import Path

from PIL import Image, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
BRANDING_DIR = ROOT / "apps" / "mobile" / "assets" / "branding"


def build_icon(source_path: Path) -> None:
    source = Image.open(source_path).convert("RGB")
    icon = source.resize((1024, 1024), Image.Resampling.LANCZOS)
    icon = icon.quantize(colors=256, method=Image.Quantize.MEDIANCUT)
    icon.save(
        BRANDING_DIR / "app_icon.png",
        format="PNG",
        optimize=True,
        compress_level=9,
    )


def build_splash(source_path: Path) -> None:
    source = Image.open(source_path).convert("RGBA")
    canvas_size = (1080, 2400)
    background = Image.new("RGBA", canvas_size, "#CBEAFF")

    backdrop = source.resize(canvas_size, Image.Resampling.LANCZOS)
    backdrop = backdrop.filter(ImageFilter.GaussianBlur(radius=28))
    backdrop = Image.blend(background, backdrop, 0.22)

    max_width = 920
    ratio = max_width / source.width
    figure = source.resize(
        (max_width, int(source.height * ratio)),
        Image.Resampling.LANCZOS,
    )
    x = (canvas_size[0] - figure.width) // 2
    y = canvas_size[1] - figure.height - 40
    backdrop.alpha_composite(figure, (x, y))

    backdrop.convert("RGB").save(
        BRANDING_DIR / "splash_image.png",
        format="PNG",
        optimize=True,
        compress_level=9,
    )


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate Flutter branding assets.")
    parser.add_argument("--icon-source", type=Path, required=True)
    parser.add_argument("--splash-source", type=Path, required=True)
    args = parser.parse_args()

    for source in (args.icon_source, args.splash_source):
        if not source.is_file():
            parser.error(f"source image does not exist: {source}")

    BRANDING_DIR.mkdir(parents=True, exist_ok=True)
    build_icon(args.icon_source)
    build_splash(args.splash_source)


if __name__ == "__main__":
    main()
