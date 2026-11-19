# ETHICS — P6 — Surveillance des fuites de secrets GitHub (AEGIS)

Engagements éthiques du projet — stand-alone, labo local, GPU refused, anti-cloud.

- **Cible** : [AEGIS Surveillance des fuites de secrets GitHub](https://github.com/LaidiMohammed/aegis-p6-github-secret-leak)
- **Périmètre** : [AEGIS Surveillance des fuites de secrets GitHub](https://aegis-p6-github-secret-leak.vercel.app) — smoke + fonctions CLI.
- **GPU refused** : implementation uniquement CPU/pure Python.
- **Données locales** : sources acceptées : labo local (localhost, Juice Shop, DVWA, etc.).
- **Smoke au prof** : cmds à exécuter — voir README/scripts/run_smoke.sh.
- **Smoke clé de validation** : voir `smoke()` dans `src/github-secret-leak_main.py` — doit retourner `{"ok": true, ...}`.
- **Site statique Vercel** : disponible pour la démo statique (smoke uniquement).

See SPEC.md (avec use cases + tableaux attendus).
