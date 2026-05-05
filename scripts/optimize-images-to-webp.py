from __future__ import annotations

import json
import re
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "client" / "public"
TEXT_ROOTS = [
    ROOT / "client" / "src",
    ROOT / "data",
    ROOT / "client" / "public" / "data",
]
IMAGE_EXTENSIONS = {".png", ".jpg", ".jpeg"}
TEXT_EXTENSIONS = {".ts", ".tsx", ".js", ".jsx", ".json", ".css", ".html", ".md"}


def webp_quality(path: Path) -> int:
    size = path.stat().st_size
    if "/logos/" in path.as_posix() or "/certificates/" in path.as_posix():
        return 86
    if size > 1_500_000:
        return 78
    if size > 500_000:
        return 80
    return 82


def convert_image(path: Path) -> tuple[Path, int, int]:
    output = path.with_suffix(".webp")
    before = path.stat().st_size
    with Image.open(path) as image:
        if image.mode not in {"RGB", "RGBA"}:
            image = image.convert("RGBA" if "A" in image.getbands() else "RGB")
        image.save(output, "WEBP", quality=webp_quality(path), method=6)
    return output, before, output.stat().st_size


def public_url(path: Path) -> str:
    return "/" + path.relative_to(PUBLIC).as_posix()


def replace_references(mapping: dict[str, str]) -> list[Path]:
    changed: list[Path] = []
    for root in TEXT_ROOTS:
        if not root.exists():
            continue
        for path in root.rglob("*"):
            if not path.is_file() or path.suffix.lower() not in TEXT_EXTENSIONS:
                continue
            text = path.read_text(encoding="utf-8")
            next_text = text
            for old, new in mapping.items():
                next_text = next_text.replace(old, new)
            if next_text != text:
                path.write_text(next_text, encoding="utf-8")
                changed.append(path)
    return changed


def sync_blog_visual_file_names() -> list[Path]:
    changed: list[Path] = []
    for path in [ROOT / "data" / "blog-posts.json", ROOT / "client" / "public" / "data" / "blog-posts.json"]:
        if not path.exists():
            continue
        payload = json.loads(path.read_text(encoding="utf-8"))
        updated = False
        for post in payload.get("posts", []):
            for visual in post.get("visuals", []):
                url = visual.get("url")
                if isinstance(url, str) and url.endswith(".webp"):
                    file_name = url.rsplit("/", 1)[-1]
                    if visual.get("fileName") != file_name:
                        visual["fileName"] = file_name
                        updated = True
        if updated:
            path.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
            changed.append(path)
    return changed


def main() -> None:
    converted = []
    mapping: dict[str, str] = {}
    for path in PUBLIC.rglob("*"):
        if not path.is_file() or path.suffix.lower() not in IMAGE_EXTENSIONS:
            continue
        output, before, after = convert_image(path)
        converted.append({"source": str(path.relative_to(ROOT)), "webp": str(output.relative_to(ROOT)), "before": before, "after": after})
        mapping[public_url(path)] = public_url(output)

    changed = replace_references(mapping)
    changed.extend(sync_blog_visual_file_names())
    before_total = sum(item["before"] for item in converted)
    after_total = sum(item["after"] for item in converted)
    report = {
        "converted": len(converted),
        "beforeMB": round(before_total / 1024 / 1024, 2),
        "afterMB": round(after_total / 1024 / 1024, 2),
        "savedMB": round((before_total - after_total) / 1024 / 1024, 2),
        "changedFiles": [str(path.relative_to(ROOT)) for path in changed],
        "largest": sorted(converted, key=lambda item: item["before"], reverse=True)[:20],
    }
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
