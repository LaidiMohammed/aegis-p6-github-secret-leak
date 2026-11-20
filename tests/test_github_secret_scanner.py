"""Tests unitaires — P6 Fuites GitHub (mocks — sans shell).

- targets : par défaut 3 repos.
- github_secret_scanner : Mock de Github + ContentFile — retourne findings + match.
- generate_report : md — contenus attendus.
- main : smoke — exit 0.
"""
from __future__ import annotations

import sys
from pathlib import Path
from unittest.mock import MagicMock, patch

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from src import github_secret_leak_main as m


def cf(path: str, content: str = "DB_PASSWORD=\"secret_value\"\nAWS_SECRET='ab'\n"):
    f = MagicMock()
    f.name = path.split("/")[-1]
    f.path = path
    f.type = "file"
    f.html_url = f"https://github.com/WordPress/WordPress/blob/trunk/{path}"
    f.download_as_bytes = content.encode()
    return f


def test_targets_default():
    assert m.targets() == ["wordpress/wordpress", "nextcloud/server", "apache/kafka"]


def test_github_secret_scanner_mock():
    mock_content = [cf("config.php"), cf("README.md"), cf("wp-config.php")]
    with patch("github.Github") as mg:
        repo = mg.return_value.get_repo.return_value
        repo.get_contents.return_value = mock_content
        out = m.github_secret_scanner(["wordpress/wordpress"], api_token=None)
    assert out["targets"] == ["wordpress/wordpress"]
    assert len(out["findings"]) >= 1
    f0 = out["findings"][0]
    assert f0["repo"] == "wordpress/wordpress" and f0["matches"]


def test_github_secret_scanner_regex():
    txt = "GITHUB_TOKEN='0123456789abcdef0123456789abcdef01234567'\nDB_PASSWORD='hunter2'\n"
    with patch("github.Github") as mg:
        repo = mg.return_value.get_repo.return_value
        repo.get_contents.return_value = [cf("config.php", txt)]
        out = m.github_secret_scanner(["wordpress/wordpress"])
    types = {m2["type"] for f in out["findings"] for m2 in f["matches"]}
    assert "DB_PASSWORD" in types


def test_generate_report_markdown():
    scan = {"targets": ["wordpress/wordpress"],
            "findings": [{"repo": "wordpress/wordpress", "file": "config.php",
                          "source": "https://github.com/.../config.php", "matches": [{"type": "DB_PASSWORD", "match": "secret_value"}]}]}
    md = m.generate_report(scan)
    assert "wordpress/wordpress" in md and "config.php" in md and "DB_PASSWORD" in md


def test_main_smoke():
    with patch.object(m, "github_secret_scanner", return_value={"targets": m.targets(), "findings": []}):
        assert m.main(["--json"]) == 0


if __name__ == "__main__":
    pytest.main([__file__, "-q"])
