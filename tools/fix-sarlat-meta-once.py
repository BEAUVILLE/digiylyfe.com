from pathlib import Path
p=Path('sarlat.html')
s=p.read_text(encoding='utf-8')
old="ui.meta.split('\\\n')[0]"
# The previous generated source contains backslash + physical newline inside the JS string.
if old not in s:
    old="ui.meta.split('\\\n')[0]".replace('\\n','\\\n')
if old not in s:
    # Direct structural fallback: find between ui.meta.split(' and ')[0].
    start=s.find("ui.meta.split('")
    end=s.find("')[0]",start)
    if start<0 or end<0:
        raise SystemExit('Sarlat meta split guard failed')
    s=s[:start]+"ui.meta.split(String.fromCharCode(10))[0]"+s[end+5:]
else:
    s=s.replace(old,"ui.meta.split(String.fromCharCode(10))[0]",1)
if "ui.meta.split(String.fromCharCode(10))[0]" not in s:
    raise SystemExit('Sarlat meta fix missing')
p.write_text(s,encoding='utf-8')
