$py = if (Test-Path .venv/bin/python) { '.venv/bin/python' } else { 'python' }
& $py "src\github_secret_leak_main.py"
