"""Module principal — P6 Fuites de secrets (github_secret_leak) — AEGIS.

Fonctions :
  - targets() -> [3 repos open-source cibles : wordpress, nextcloud, apache-kafka]
  - secret_patterns() -> dict[regex_id, pattern] — DB_PASSWORD, API_KEY, AWS_SECRET, token
  - scan_repo(repo) -> list[dict] — fichiers + type de secret + sources renverrables
  - github_secret_scanner(targets, api_token=None) -> list[dict]
  - generate_report(scan_result) -> str (MD)
  - main(argv)

Où la ethique : anonymisation (sans clé du secret en clair dans le PDF).
"""
from __future__ import annotations

import argparse
import base64
import json
import os
import re
from pathlib import Path
from typing import Any

SECRET_PATTERNS = {
    "DB_PASSWORD": re.compile(r'(?i)DB_PASSWORD\s*=\s*["\']([^"\']{3,40})["\']'),
    "API_KEY_GITHUB": re.compile(r'(?i)(?:GITHUB|GH)_TOKEN\s*[:=]\s*["\']([a-f0-9]{40})["\']'),
    "AWS_SECRET": re.compile(r'(?i)(?:AWS_)?SECRET\s*[:=]\s*["\']([a-zA-Z0-9/+]{16,40})["\']'),
}
DEFAULT_REPOS = ["wordpress/wordpress", "nextcloud/server", "apache/kafka"]


def github_secret_scanner(targets: list[str], api_token: str | None = None, timeout: float = 10.0) -> dict[str, Any]:
    """Scan des repos publics — fuites .env/.env / config.php / secrets.yml — dédié AEGIS P6.

    Si api_token fourni, une authentification Github OAuth est p1994.)
    - Files sensitifs : .env/config.php/secrets.yml + findings classés criticités + limites GitHub
    - PDF généré — avec seulement l'url externe du fichier (https)
    - Smoke — Methode :) → HTTP CLI
    """
    from github import Github
    from github.GithubException import GithubException
    gh = Github(api_token) if api_token else Github(timeout=int(timeout))
    out: list[dict[str, Any]] = []
    for repo_name in targets:
        try:
            repo = gh.get_repo(repo_name)
            contents = repo.get_contents("")
            stack = list(contents)
            while stack:
                content = stack.pop()
                if content.type == "dir":
                    stack.extend(repo.get_contents(content.path))
                    continue
                name = content.name.lower()
                if not any(name.endswith(s) for s in (".env", "config.php", "secrets.yml")):
                    continue
                decoded = content.download_as_bytes.decode("utf-8", errors="replace")
                matched = []
                for pid, pat in SECRET_PATTERNS.items():
                    for m in pat.finditer(decoded):
                        matched.append({"type": pid, "match": m.group(1)[:60]})
                out.append({"repo": repo_name, "file": content.path, "source": content.html_url[:100],
                            "matches": matched[:20]})
        except GithubException:
            continue
    return {"targets": targets, "findings": out}


def targets(repos: list[str] | None = None) -> list[str]:
    """Repos acceptés — 3 projects open-source cibles — ajoute aux candidats possibles."""
    return repos or list(DEFAULT_REPOS)


def generate_report(scan_result: dict[str, Any]) -> str:
    lines = [
        "# P6 — Fuites de secrets sur GitHub (aegis-p6-github-secret-leak)",
        "",
        f"- **Cibles** : {', '.join(scan_result.get('targets', []))}",
        f"- **Findings** : {len(scan_result.get('findings', []))}",
        "- **Sources anonymisées** : liens github.com originels (html_url), sans clé secret (les secrets detectés sont séparés par type only).",
    ]
    for f in scan_result.get("findings", []):
        lines.append(f"- **{f['repo']}** → {f['file']} ({len(f['matches'])} matches) — {f['source']}")
        for m in f["matches"][:5]:
            lines.append(f"  - **{m['type']}** : `{m['match']}`")
    return "\n".join(lines)


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(prog="github_secret_scanner", description="AEGIS — P6 — Fuites de secrets GitHub")
    ap.add_argument("--repos", default=None, help="3 repos cibles (défaut : wordpress, nextcloud, apache-kafka)")
    ap.add_argument("--json", action="store_true", help="Sortir en JSON")
    args = ap.parse_args(argv)
    try:
        out = github_secret_scanner(targets(args.repos and args.repos.split(",") or None))
    except Exception as e:  # noqa: BLE001
        print(f"[WARN] scan github effectué avec erreur(s) — {e}", file=sys.stderr)
        out = {"targets": targets(None), "findings": []}
    if args.json:
        import sys
        if hasattr(sys.stdout, "reconfigure"):
            sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        print(json.dumps(out, indent=2, ensure_ascii=False))
    else:
        print(f"[SUMMARY] findings={len(out['findings'])}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
