#!/usr/bin/env python3
"""Build deterministic personalized PWA manifests/icons for DIGIY PRO cards."""
from __future__ import annotations

import json
import re
import shutil
import sys
import urllib.request
from io import BytesIO
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[2]
CARDS = ROOT / "cartes"
OUT = ROOT / "pwa"
ICONS = OUT / "icons"

FIELD_STR = r'["\']?{key}["\']?\s*:\s*"((?:\\.|[^"\\])*)"'
FIELD_BOOL = r'["\']?{key}["\']?\s*:\s*(true|false)'

def js_string(block: str, key: str) -> str:
    m = re.search(FIELD_STR.format(key=re.escape(key)), block)
    if not m:
        return ""
    try:
        return json.loads('"' + m.group(1) + '"')
    except Exception:
        return m.group(1)

def js_bool(block: str, key: str) -> bool:
    m = re.search(FIELD_BOOL.format(key=re.escape(key)), block, re.I)
    return bool(m and m.group(1).lower() == "true")

def card_block(text: str) -> str:
    m = re.search(r'const\s+CARD\s*=\s*\{([\s\S]*?)\n\s*\};', text)
    return m.group(1) if m else ""

def safe_slug(s: str) -> str:
    s = re.sub(r"[^a-z0-9-]+", "-", s.lower())
    s = re.sub(r"-+", "-", s).strip("-")
    return s or "professionnel"

def short_name(name: str) -> str:
    name = " ".join(name.split())
    return name if len(name) <= 18 else name[:18].rstrip()

def download_icon(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": "DIGIYLYFE-PWA-Builder/1.0"})
    with urllib.request.urlopen(req, timeout=15) as resp:
        data = resp.read(8 * 1024 * 1024 + 1)
    if len(data) > 8 * 1024 * 1024:
        raise ValueError("icon source exceeds 8 MB")
    return data

def make_icon(source: bytes, size: int, dest: Path) -> None:
    with Image.open(BytesIO(source)) as im:
        im = im.convert("RGBA")
        bg = Image.new("RGBA", im.size, (6, 20, 15, 255))
        bg.alpha_composite(im)
        fitted = ImageOps.fit(bg.convert("RGB"), (size, size), method=Image.Resampling.LANCZOS)
        fitted.save(dest, format="PNG", optimize=True)

def fallback_icon(size: int, dest: Path) -> None:
    src = ROOT / "assets" / "pwa" / f"digiy-fallback-{size}.png"
    if not src.exists():
        raise FileNotFoundError(src)
    shutil.copyfile(src, dest)

def main() -> int:
    OUT.mkdir(exist_ok=True)
    ICONS.mkdir(exist_ok=True)
    registry = []

    for path in sorted(CARDS.rglob("*.html")):
        text = path.read_text(encoding="utf-8")
        block = card_block(text)
        if not block or not js_bool(block, "pwaEnabled"):
            continue

        slug = safe_slug(path.stem)
        name = js_string(block, "pwaName") or js_string(block, "name") or slug.replace("-", " ").title()
        icon_url = (
            js_string(block, "pwaIconUrl")
            or js_string(block, "photoUrl")
            or js_string(block, "heroPhotoUrl")
        )
        rel = path.relative_to(ROOT).as_posix()
        start_url = "/" + rel + "?source=pwa"
        icon192 = ICONS / f"{slug}-192.png"
        icon512 = ICONS / f"{slug}-512.png"

        source = None
        if icon_url.startswith("https://"):
            try:
                source = download_icon(icon_url)
            except Exception as exc:
                print(f"[WARN] {slug}: custom icon unavailable ({exc}); DIGIY fallback used.", file=sys.stderr)

        if source:
            try:
                make_icon(source, 192, icon192)
                make_icon(source, 512, icon512)
            except Exception as exc:
                print(f"[WARN] {slug}: custom icon invalid ({exc}); DIGIY fallback used.", file=sys.stderr)
                fallback_icon(192, icon192)
                fallback_icon(512, icon512)
        else:
            fallback_icon(192, icon192)
            fallback_icon(512, icon512)

        manifest = {
            "id": f"/pwa/{slug}",
            "name": name,
            "short_name": short_name(name),
            "description": f"{name} · présence professionnelle propulsée par DIGIYLYFE",
            "start_url": start_url,
            "scope": "/",
            "display": "standalone",
            "background_color": "#06140f",
            "theme_color": "#126b43",
            "icons": [
                {
                    "src": f"/pwa/icons/{slug}-192.png",
                    "sizes": "192x192",
                    "type": "image/png",
                    "purpose": "any maskable",
                },
                {
                    "src": f"/pwa/icons/{slug}-512.png",
                    "sizes": "512x512",
                    "type": "image/png",
                    "purpose": "any maskable",
                },
            ],
        }
        (OUT / f"{slug}.webmanifest").write_text(
            json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        registry.append(
            {
                "slug": slug,
                "name": name,
                "card": "/" + rel,
                "manifest": f"/pwa/{slug}.webmanifest",
                "icon_source": icon_url or "DIGIYLYFE fallback",
            }
        )
        print(f"[OK] {name}: {slug}.webmanifest")

    (OUT / "pro-registry.json").write_text(
        json.dumps(registry, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"{len(registry)} empreinte(s) PWA PRO générée(s).")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
