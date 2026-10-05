#!/usr/bin/env python3
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
import subprocess, shlex, math, os, sys

ROOT = Path(__file__).resolve().parents[1]
ASSET = ROOT / "assets/comprendre/digiylyfe-palette-vitrine.webp"
OUT = ROOT / "render_tiktok"
OUT.mkdir(exist_ok=True)
W, H = 1080, 1920
FPS = 30

STEPS = [
    dict(panel=0, title="BESOIN", badge="Vous cherchez quelque chose près de vous ?", voice="Vous cherchez quelque chose près de vous ? Un plombier à Saly. Un chauffeur pour A I B D. Un logement ce week-end. Un restaurant ce soir."),
    dict(panel=1, title="SOLUTION", badge="DIGIYLYFE vous trouve la bonne personne, près de vous.", voice="Choisissez votre pays, votre zone, puis dites ce que vous cherchez. DIGIYLYFE vous aide à trouver la bonne personne, près de vous."),
    dict(panel=2, title="RÉSULTAT", badge="Vous avez trouvé. Vous contactez directement.", voice="Vous avez trouvé. Vous contactez directement. Pas d'intermédiaire. Zéro pour cent de commission DIGIYLYFE."),
    dict(panel=3, title="AUTRES BESOINS", badge="Tout ce dont vous avez besoin dans votre territoire.", voice="Se loger. Se déplacer. Manger. Travailler. Acheter ou vendre. Sortir, découvrir, prendre soin de soi. Tout ce dont vous avez besoin dans votre territoire."),
    dict(panel=4, title="POUR LE PROFESSIONNEL", badge="Et si c'était votre activité que l'on trouvait ?", voice="Et si c'était votre activité que l'on trouvait ? Votre activité. Votre territoire. Votre contact direct."),
    dict(panel=5, title="COMPRÉHENSION", badge="Les professionnels créent l'offre. Les clients créent la circulation.", voice="Les professionnels créent l'offre. Mais la force du réseau vient aussi des clients. Ils créent la circulation, d'un besoin à l'autre, dans le territoire."),
    dict(panel=3, title="ROUTE NUMÉRIQUE", badge="Une route numérique devant la porte de chaque activité.", voice="DIGIYLYFE met une route numérique devant la porte de chaque activité. Le client trouve, choisit et contacte directement le professionnel."),
    dict(panel=5, title="EFFET RÉSEAU", badge="Plus le territoire est utilisé, plus chacun a de chances d'être trouvé.", voice="Plus les clients empruntent ces routes, plus le territoire devient visible, et plus chaque activité a de chances d'être trouvée."),
    dict(panel=4, title="FORCE DU RÉSEAU", badge="La force du réseau. L'indépendance de chacun.", voice="La force du réseau. L'indépendance de chacun. Les professionnels gardent leurs clients, leurs contacts et leurs paiements."),
    dict(panel=6, title="LA PREUVE", badge="Des besoins réels. Des résultats concrets.", voice="Des besoins réels. Des résultats concrets. DIGIYLYFE commence ici, dans votre territoire."),
    dict(panel=7, title="À VOUS", badge="Être vu. Être compris. Être trouvé. Être contacté.", voice="Être vu. Être compris. Être trouvé. Être contacté. Cherchez maintenant, ou faites connaître votre activité sur DIGIYLYFE."),
]

def run(cmd):
    print("+", " ".join(shlex.quote(str(x)) for x in cmd), flush=True)
    subprocess.run([str(x) for x in cmd], check=True)

def font(path, size):
    return ImageFont.truetype(path, size)

FONT_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_REG = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"

def cover_crop(img, size):
    tw, th = size
    scale = max(tw/img.width, th/img.height)
    nw, nh = math.ceil(img.width*scale), math.ceil(img.height*scale)
    r = img.resize((nw,nh), Image.Resampling.LANCZOS)
    left=(nw-tw)//2; top=(nh-th)//2
    return r.crop((left,top,left+tw,top+th))

def contain(img, size):
    tw, th=size
    scale=min(tw/img.width, th/img.height)
    nw, nh=max(1,round(img.width*scale)), max(1,round(img.height*scale))
    return img.resize((nw,nh), Image.Resampling.LANCZOS)

def wrap_text(draw, text, fnt, maxw):
    words=text.split()
    lines=[]; cur=""
    for w in words:
        test=w if not cur else cur+" "+w
        box=draw.textbbox((0,0),test,font=fnt)
        if box[2]-box[0] <= maxw:
            cur=test
        else:
            if cur: lines.append(cur)
            cur=w
    if cur: lines.append(cur)
    return lines

def rounded_label(draw, xy, text, fnt, fill, text_fill, radius=40, pad_x=28, pad_y=14):
    x,y=xy
    box=draw.textbbox((0,0),text,font=fnt)
    ww=box[2]-box[0]+2*pad_x; hh=box[3]-box[1]+2*pad_y
    draw.rounded_rectangle((x,y,x+ww,y+hh),radius=radius,fill=fill)
    draw.text((x+pad_x,y+pad_y-box[1]),text,font=fnt,fill=text_fill)
    return ww,hh

def render_frames():
    palette=Image.open(ASSET).convert("RGB")
    sw=palette.width//4; sh=palette.height//2
    title_font=font(FONT_BOLD,28)
    count_font=font(FONT_BOLD,25)
    badge_font=font(FONT_BOLD,53)
    small_font=font(FONT_BOLD,22)
    files=[]
    for idx,s in enumerate(STEPS):
        p=s["panel"]; col=p%4; row=p//4
        panel=palette.crop((col*sw,row*sh,(col+1)*sw,(row+1)*sh))
        bg=cover_crop(panel,(W,H)).filter(ImageFilter.GaussianBlur(34))
        bg=ImageEnhance.Brightness(bg).enhance(0.50)
        base=bg.copy()
        fg=contain(panel,(W,H))
        base.paste(fg,((W-fg.width)//2,(H-fg.height)//2))
        d=ImageDraw.Draw(base,"RGBA")
        rounded_label(d,(42,48),s["title"],title_font,(20,151,255,245),(255,255,255,255),radius=30,pad_x=24,pad_y=12)
        count=f"{idx+1} / {len(STEPS)}"
        box=d.textbbox((0,0),count,font=count_font)
        d.rounded_rectangle((W-(box[2]-box[0])-90,50,W-42,100),radius=24,fill=(3,23,34,185))
        d.text((W-(box[2]-box[0])-66,62-box[1]),count,font=count_font,fill=(220,235,243,255))
        clean=OUT/f"scene_{idx:02d}_clean.png"
        base.save(clean,quality=95)

        badged=base.copy()
        ov=Image.new("RGBA",(W,H),(0,15,28,150))
        badged=Image.alpha_composite(badged.convert("RGBA"),ov)
        d=ImageDraw.Draw(badged,"RGBA")
        maxw=W-120
        lines=wrap_text(d,s["badge"],badge_font,maxw-72)
        line_h=66
        text_h=len(lines)*line_h
        box_h=text_h+76
        y=H-box_h-150
        d.rounded_rectangle((60,y,W-60,y+box_h),radius=54,fill=(2,37,54,246),outline=(83,245,210,255),width=4)
        ty=y+38
        for line in lines:
            b=d.textbbox((0,0),line,font=badge_font)
            tw=b[2]-b[0]
            d.text(((W-tw)//2,ty-b[1]),line,font=badge_font,fill=(255,255,255,255))
            ty+=line_h
        footer="DIGIYLYFE · TERRITOIRE → BESOIN → CONTACT DIRECT"
        fb=d.textbbox((0,0),footer,font=small_font)
        d.text(((W-(fb[2]-fb[0]))//2,H-82-fb[1]),footer,font=small_font,fill=(190,215,224,245))
        badge=OUT/f"scene_{idx:02d}_badge.png"
        badged.convert("RGB").save(badge,quality=95)
        files.append((clean,badge))
    return files

def make_audio(text, idx):
    mp3=OUT/f"voice_{idx:02d}.mp3"
    try:
        run(["edge-tts","--voice","fr-FR-HenriNeural","--rate=-4%","--text",text,"--write-media",mp3])
        return mp3
    except Exception as e:
        print("edge-tts fallback:",e)
        wav=OUT/f"voice_{idx:02d}.wav"
        run(["espeak-ng","-v","fr","-s","145","-p","45","-a","165","-w",wav,text])
        return wav

def duration(path):
    out=subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration","-of","default=nw=1:nk=1",str(path)],text=True).strip()
    return float(out)

def make_scene(idx, clean, badge, audio):
    ad=duration(audio)
    badge_d=ad+0.65
    raw=OUT/f"scene_{idx:02d}_video.mp4"
    run(["ffmpeg","-y",
         "-loop","1","-t","3","-i",clean,
         "-loop","1","-t",f"{badge_d:.3f}","-i",badge,
         "-filter_complex",f"[0:v]fps={FPS},format=yuv420p[v0];[1:v]fps={FPS},format=yuv420p[v1];[v0][v1]concat=n=2:v=1:a=0[v]",
         "-map","[v]","-c:v","libx264","-preset","veryfast","-crf","22","-movflags","+faststart",raw])
    scene=OUT/f"scene_{idx:02d}.mp4"
    total=3+badge_d
    run(["ffmpeg","-y","-i",raw,"-i",audio,
         "-filter_complex","[1:a]adelay=3000:all=1,volume=1.25,apad=pad_dur=0.65[a]",
         "-map","0:v:0","-map","[a]",
         "-c:v","copy","-c:a","aac","-b:a","128k","-t",f"{total:.3f}","-movflags","+faststart",scene])
    return scene,total

def main():
    frames=render_frames()
    scenes=[]; total=0
    for idx,(clean,badge) in enumerate(frames):
        audio=make_audio(STEPS[idx]["voice"],idx)
        scene,d=make_scene(idx,clean,badge,audio)
        scenes.append(scene); total+=d
    concat=OUT/"concat.txt"
    concat.write_text("\n".join(f"file '{p.name}'" for p in scenes)+"\n",encoding="utf-8")
    final=ROOT/"DIGIYLYFE_NOTICE_TERRITOIRE_TIKTOK_9x16.mp4"
    run(["ffmpeg","-y","-f","concat","-safe","0","-i",concat,"-c","copy","-movflags","+faststart",final])
    print(f"FINAL={final}")
    print(f"DURATION≈{total:.1f}s")

if __name__=="__main__":
    main()
