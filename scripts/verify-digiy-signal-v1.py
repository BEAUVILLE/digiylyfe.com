#!/usr/bin/env python3
"""Generate or verify the deliberately small, reviewed public SIGNAL pilot."""
import argparse
import hashlib
import json
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "signal/v1"
ORIGIN = "https://digiylyfe.com/"
NOTICE = "Pilote de données publiques en français. Consulter la page source pour les informations actuelles, les contacts autorisés et les disponibilités. Aucun statut d'adhésion payante ni disponibilité n'est attesté."

class Head(HTMLParser):
    def __init__(self):
        super().__init__()
        self.canonicals = []
        self.noindex = False

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "link" and "canonical" in (a.get("rel") or "").lower().split():
            self.canonicals.append(a.get("href"))
        if tag == "meta" and (a.get("name") or "").lower() in ("robots", "googlebot", "oai-searchbot"):
            self.noindex |= "noindex" in (a.get("content") or "").lower() or "none" in (a.get("content") or "").lower().split(",")

def expected():
    records = json.loads((ROOT / "scripts/digiy-signal-v1-sources.json").read_text(encoding="utf-8"))
    assert 0 < len(records) <= 5, "Pilot limited to five sources (removal allowed)"
    result, items = {}, []
    for r in records:
        path = r["source"]
        assert path in ["cartes/babakar-plombier-saly.html","cartes/sodior-btp.html","oncle-noa.html","carte-mass-coolj.html","carte-niery-art.html"], "Source not in reviewed public allowlist"
        raw = (ROOT / path).read_bytes()
        sha = hashlib.sha1(("blob %d\0" % len(raw)).encode() + raw).hexdigest()
        assert sha == r["sourceSha"], f"{path}: source changed; review or remove SIGNAL before merge"
        head = Head()
        head.feed(raw.decode("utf-8"))
        assert head.canonicals == [ORIGIN + path] and not head.noindex, f"{path}: canonical/public status changed"
        assert r["id"] + ".json" not in result, "Duplicate signal id"
        assert r["id"] in ["babakar-plombier-saly","sodior-btp","oncle-noa","mass-coolj","niery-art"], "Unknown signal id"
        obj = {"@context": "https://schema.org", "@type": "WebPage", "name": r["name"],
               "url": ORIGIN + path, "inLanguage": "fr", "description": r["description"],
               "about": {"@type": r["type"], "name": r["name"]}}
        if r["area"]:
            obj["about"]["description"] = r["area"]
        result[r["id"] + ".json"] = obj
        items.append({"name": r["name"], "source": ORIGIN + path,
                      "signal": ORIGIN + "signal/v1/" + r["id"] + ".json"})
    result["index.json"] = {"version": 1, "publisher": "DIGIYLYFE", "language": "fr", "notice": NOTICE, "items": items}
    return result

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--write", action="store_true", help="Regenerate after manual source review; remove obsolete JSON")
    args = parser.parse_args()
    files = expected()
    OUT.mkdir(parents=True, exist_ok=True) if args.write else None
    if args.write:
        for p in OUT.glob("*.json"):
            if p.name not in files:
                p.unlink()
        for name, data in files.items():
            (OUT / name).write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    assert {p.name for p in OUT.glob("*.json")} == set(files), "Missing or obsolete signal"
    for name, data in files.items():
        raw = (OUT / name).read_bytes()
        assert len(raw) < 5000, f"{name}: exceeds 5 kB"
        assert json.loads(raw) == data, f"{name}: stale or altered; regenerate after review"
    print(f"PASS: {len(files)-1} public signals + index; {sum((OUT/n).stat().st_size for n in files)} bytes; no runtime dependencies")

if __name__ == "__main__":
    main()
