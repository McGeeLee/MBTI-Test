from pathlib import Path

from PIL import Image, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
APP_DIR = ROOT / "mobile_app"
BRANDING_DIR = APP_DIR / "assets" / "branding"

ICON_SOURCE = Path(r"C:\Users\mrdee\Downloads\icon16.jpg")
SPLASH_SOURCE = Path(r"C:\Users\mrdee\Downloads\splash16.png")


def ensure_dirs() -> None:
    BRANDING_DIR.mkdir(parents=True, exist_ok=True)


def build_icon() -> None:
    source = Image.open(ICON_SOURCE).convert("RGB")
    icon = source.resize((1024, 1024), Image.Resampling.LANCZOS)
    icon = icon.quantize(colors=256, method=Image.Quantize.MEDIANCUT)
    target = BRANDING_DIR / "app_icon.png"
    icon.save(target, format="PNG", optimize=True, compress_level=9)


def build_splash() -> None:
    source = Image.open(SPLASH_SOURCE).convert("RGBA")
    canvas_size = (1080, 2400)

    background = Image.new("RGBA", canvas_size, "#CBEAFF")

    # Soft blurred backdrop from the source image for depth without a heavy file.
    backdrop = source.resize(canvas_size, Image.Resampling.LANCZOS)
    backdrop = backdrop.filter(ImageFilter.GaussianBlur(radius=28))
    backdrop = Image.blend(background, backdrop, 0.22)

    # Main character art scaled to keep the full figure visible on tall phones.
    max_width = 920
    ratio = max_width / source.width
    target_height = int(source.height * ratio)
    figure = source.resize((max_width, target_height), Image.Resampling.LANCZOS)

    x = (canvas_size[0] - figure.width) // 2
    y = canvas_size[1] - figure.height - 40
    backdrop.alpha_composite(figure, (x, y))

    target = BRANDING_DIR / "splash_image.png"
    backdrop.convert("RGB").save(
        target,
        format="PNG",
        optimize=True,
        compress_level=9,
    )


def main() -> None:
    ensure_dirs()
    build_icon()
    build_splash()


if __name__ == "__main__":
    main()
