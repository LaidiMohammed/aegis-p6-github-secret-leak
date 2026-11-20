"""generate_report.py — Génère le PDF du rapport P6 — Fuites GitHub (aegis-p6-github-secret-leak).

Contenu : findings par repo + type de secrets + sources anonymisées + notes éthique.
"""
from __future__ import annotations

import argparse
import json
from pathlib import Path


def build_markdown(data: dict) -> str:
    targets = data.get("targets", [])
    findings = data.get("findings", [])
    lines = [
        "# P6 — Fuites de secrets sur GitHub (aegis-p6-github-secret-leak)",
        "",
        f"- **Cibles :** {', '.join(targets) if targets else '-'}",
        f"- **Findings :** {len(findings)}",
        "- **Ethique :** anonymisation — liens url github originels — absence de clé secrets dans le PDF.",
        "## 1. Findings — composant par composant",
        "",
    ]
    for f in findings[:30]:
        matches = f.get("matches", [])[:8]
        lines.append(f"- **{f.get('repo')}** → `{f.get('file')}` ({len(matches)} matches)")
        for m in matches:
            lines.append(f"  - **{m.get('type')}** : {m.get('match')}")
    lines += [
        "",
        "## 2. Sources anonymisées",
        "- Liens Github originels (html_url) — actuellement publique — seulement url (pas de clé: voir regex).",
        "",
        "## 3. Solutions",
        "- Utiliser .gitignore pour les fichiers sensibles (page 404 meneur).",
        "- Supprimer les secrets historiques avec `git filter-repo` et rechercher les leaks via GitHub CodeScanning.",
        "- Activer le code scanning natif de GitHub (GitHub Secret Scanning) — scanning automatique.",
        "",
        f"## 4. Exécutions à montrer au prof :",
        f"- `python -m github_secret_leak_main --json` (scan)",
        f"- `python -m generate_report --json outputs/results.json --pdf outputs/rapport-p6.pdf`",
    ]
    return "\n".join(lines)


def build_pdf(markdown: str, out_path: Path) -> None:
    from reportlab.lib.pagesizes import LETTER
    from reportlab.lib.styles import getSampleStyleSheet
    from reportlab.lib.units import inch
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer

    def esc(t: str) -> str:
        return t.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")

    out_path.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(str(out_path), pagesize=LETTER, topMargin=0.5 * inch, bottomMargin=0.5 * inch, leftMargin=0.75 * inch, rightMargin=0.75 * inch)
    styles = getSampleStyleSheet()
    story = []
    for line in markdown.split("\n"):
        if not line.strip():
            story.append(Spacer(1, 6))
            continue
        if line.startswith("# "):
            story.append(Paragraph(esc(line[2:]), styles["h1"]))
        elif line.startswith("## "):
            story.append(Paragraph(esc(line[3:]), styles["h2"]))
        else:
            story.append(Paragraph(esc(line), styles["Normal"]))
    doc.build(story)
    print(f"[OK] PDF écrit : {out_path} ({out_path.stat().st_size} octets)")


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(prog="generate_report", description="Génère le rapport P6")
    ap.add_argument("--json", type=Path, default=None)
    ap.add_argument("--pdf", type=Path, default=Path("outputs/rapport-p6.pdf"))
    args = ap.parse_args(argv)
    data = json.loads(args.json.read_text(encoding="utf-8")) if args.json else {"targets": [], "findings": []}
    md = build_markdown(data)
    args.pdf.parent.mkdir(parents=True, exist_ok=True)
    (args.pdf.parent / "report.md").write_text(md, encoding="utf-8")
    build_pdf(md, args.pdf)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
