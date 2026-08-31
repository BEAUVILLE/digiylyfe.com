#!/usr/bin/env bash
set -euo pipefail

PNG="carte-visite-digiy.png"
WEBP="carte-visite-digiy.webp"
AVIF="carte-visite-digiy.avif"
HTML="carte.index.html"

for f in "$PNG" "$HTML"; do
  test -f "$f" || { echo "Missing $f" >&2; exit 1; }
done
command -v ffmpeg >/dev/null || { echo "ffmpeg unavailable" >&2; exit 1; }

PNG_SIZE=$(stat -c%s "$PNG")
DIMENSIONS=$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 "$PNG" | head -n1)
echo "Source PNG: ${PNG_SIZE} bytes · ${DIMENSIONS}"

# Business-card artwork contains text: favor high visual fidelity while cutting transfer weight.
ffmpeg -hide_banner -loglevel error -y -i "$PNG" -frames:v 1 \
  -c:v libwebp -lossless 0 -quality 88 -compression_level 6 -preset picture "$WEBP"

ffmpeg -hide_banner -loglevel error -y -i "$PNG" -frames:v 1 \
  -c:v libaom-av1 -crf 22 -b:v 0 -still-picture 1 -cpu-used 6 -pix_fmt yuv444p "$AVIF"

WEBP_SIZE=$(stat -c%s "$WEBP")
AVIF_SIZE=$(stat -c%s "$AVIF")
echo "WebP: ${WEBP_SIZE} bytes"
echo "AVIF: ${AVIF_SIZE} bytes"

if [ "$WEBP_SIZE" -ge "$PNG_SIZE" ]; then
  echo "WebP is not lighter than PNG" >&2
  exit 1
fi
if [ "$AVIF_SIZE" -ge "$PNG_SIZE" ]; then
  echo "AVIF is not lighter than PNG" >&2
  exit 1
fi

python3 - <<'PY'
from pathlib import Path
p=Path('carte.index.html')
s=p.read_text(encoding='utf-8')
old='''        <img src="https://digiylyfe.com/carte-visite-digiy.png" alt="Carte officielle DIGIYLYFE">'''
new='''        <picture>\n          <source srcset="https://digiylyfe.com/carte-visite-digiy.avif" type="image/avif">\n          <source srcset="https://digiylyfe.com/carte-visite-digiy.webp" type="image/webp">\n          <img src="https://digiylyfe.com/carte-visite-digiy.png" alt="Carte officielle DIGIYLYFE" decoding="async" fetchpriority="high">\n        </picture>'''
if new in s:
    print('Picture sources already installed')
elif old in s:
    s=s.replace(old,new,1)
    p.write_text(s,encoding='utf-8')
    print('Installed AVIF/WebP/PNG picture sources')
else:
    raise SystemExit('Expected card image markup not found')
PY

printf 'DIGIY_CARD_MEDIA_BYTES png=%s webp=%s avif=%s\n' "$PNG_SIZE" "$WEBP_SIZE" "$AVIF_SIZE"
