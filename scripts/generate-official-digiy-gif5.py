#!/usr/bin/env python3
"""Carte officielle DIGIYLYFE : 5 secondes de lumière, QR et graphisme d'origine intacts."""
from pathlib import Path
from hashlib import sha256, sha1
from math import sin, pi
from PIL import Image, ImageDraw

ROOT=Path(__file__).resolve().parents[1]
SOURCE=ROOT/"carte-visite-digiy.png"
OUT=ROOT/"assets/digiy-carte-officielle-5s.gif"
FRAME_COUNT=20
FRAME_MS=250
WIDTH=460

def star(draw,x,y,r,opacity):
    # Étoiles sur les contours, jamais sur le QR central.
    color=(255,227,141,opacity)
    draw.line((int(x-r),int(y),int(x+r),int(y)),fill=color,width=max(2,round(r*.24)))
    draw.line((int(x),int(y-r),int(x),int(y+r)),fill=color,width=max(2,round(r*.24)))
    q=max(2,round(r*.25))
    draw.ellipse((int(x-q),int(y-q),int(x+q),int(y+q)),fill=(255,249,219,min(255,opacity+15)))

def main():
    original=SOURCE.read_bytes()
    git_blob=sha1(b"blob "+str(len(original)).encode()+b"\0"+original).hexdigest()
    assert git_blob=="df008bab3b618b246077c77d75c34b05d6429e38", "La carte officielle source a changé : revue humaine nécessaire"
    raw_before=sha256(original).hexdigest()
    with Image.open(SOURCE) as src:
        rgb=src.convert("RGB")
        ratio=WIDTH/rgb.width
        base=rgb.resize((WIDTH,round(rgb.height*ratio)),Image.Resampling.LANCZOS)
        source_size=rgb.size
    w,h=base.size
    # Palette commune, pas de changement de couleurs à chaque frame.
    palette=base.quantize(colors=224,method=Image.Quantize.MEDIANCUT,dither=Image.Dither.NONE)
    frames=[]
    for i in range(FRAME_COUNT):
        phase=i/(FRAME_COUNT-1)
        frame=base.convert("RGBA")
        layer=Image.new("RGBA",base.size,(0,0,0,0))
        pen=ImageDraw.Draw(layer)
        # Or lumineux en déplacement sur les bordures, à distance du QR.
        envelope=max(0.0,min(1.0,(1.0-phase)*6))
        shine=round(225*envelope*(.65+.35*sin(pi*(i+1)/4)**2))
        star(pen,w*(.08+.84*phase),h*.03,10+3*sin(pi*phase),shine)
        star(pen,w*(.90-.78*phase),h*.86,7+3*sin(pi*phase),round(shine*.67))
        # Étincelles près du signe infini, jamais au centre QR.
        if i%4 in (0,1,2):
            star(pen,w*(.33+.32*((i%9)/8)),h*.115,5.5,round(shine*.60))
        frame=Image.alpha_composite(frame,layer)
        frames.append(frame.convert("RGB").quantize(palette=palette,dither=Image.Dither.NONE))
    # Dernière image : carte sans effet, et QR de l'original.
    frames[-1]=base.quantize(palette=palette,dither=Image.Dither.NONE)
    OUT.parent.mkdir(parents=True,exist_ok=True)
    frames[0].save(OUT,save_all=True,append_images=frames[1:],duration=[FRAME_MS]*FRAME_COUNT,disposal=2,optimize=True)
    with Image.open(OUT) as check:
        actual=sum(int((check.seek(j) or check.info.get("duration",0))) for j in range(check.n_frames))
        assert actual==5000,(check.n_frames,actual)
        assert check.info.get("loop") is None, "Une boucle GIF ne doit jamais être programmée"
        assert check.size==base.size
        print("GIF",check.size,"frames",check.n_frames,"duration",actual,"ms")
    assert sha256(SOURCE.read_bytes()).hexdigest()==raw_before,"Le QR officiel/source a été modifié!"
    assert OUT.stat().st_size<6_000_000, "GIF trop lourd : réduire WIDTH ou optimiser"
    print("Source",source_size,"sha256",raw_before,"(inchangée)")
    print("Fichier",OUT,"octets",OUT.stat().st_size)
if __name__=="__main__":
    main()
