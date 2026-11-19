# AEGIS — P6 — Surveillance des fuites de secrets GitHub

[![Vercel](https://img.shields.io/badge/Vercel-aegis-p6--blue?logo=vercel)](https://aegis-p6-github-secret-leak.vercel.app)
[![Tests](https://img.shields.io/badge/Tests-passing-brightgreen)]

Surveillance des fuites de secrets GitHub — PFE P13 style AEGIS (Master 1 Sécurité informatique).

## Infos rapides

| Élément | Valeur |
|---|---|
| **GitHub** | https://github.com/LaidiMohammed/aegis-p6-github-secret-leak |
| **Vercel** | https://aegis-p6-github-secret-leak.vercel.app |
| **Stacks** | PyGithub, requests, reportlab |
| **Type** | fg |
| **Ethique** | Labo local, anti-GPU, anti-cloud, stand-alone |

## Install

```bash
pip install -r requirements.txt
make install  # (venv)
```

## Smoke & tests (démo à la prof)

```bash
make smoke   # ou: scripts/run_smoke.sh
make test
```

## Fonctions à exécuter à la démo

Voir [`docs/ETHICS.md`](docs/ETHICS.md), [`docs/SPEC.md`](docs/SPEC.md).
