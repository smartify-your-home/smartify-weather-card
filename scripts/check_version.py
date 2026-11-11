#!/usr/bin/env python3
"""Validate release metadata and repository contracts; fail closed on inconsistencies."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
script = (ROOT / "dist/smartify-weather-chart.js").read_text(encoding="utf-8")
match = re.search(r"SMARTIFY_WEATHER_CARD_VERSION\s*=\s*'([0-9]+\.[0-9]+\.[0-9]+)'", script)
if not match:
    raise SystemExit("FAIL: missing SMARTIFY_WEATHER_CARD_VERSION")
version = match.group(1)
for name in ("README.md", "CHANGELOG.md", "RELEASE_NOTES.md"):
    body = (ROOT / name).read_text(encoding="utf-8")
    if not re.search(rf"(?<![\d.])v?{re.escape(version)}(?![\d.])", body):
        raise SystemExit(f"FAIL: {name} missing version {version}")

changelog = (ROOT / "CHANGELOG.md").read_text(encoding="utf-8")
if not re.search(rf"(?m)^##\s+\[?v?{re.escape(version)}\]?(?=\s|$)", changelog):
    raise SystemExit(f"FAIL: CHANGELOG.md has no section for {version}")
notes = (ROOT / "RELEASE_NOTES.md").read_text(encoding="utf-8")
if not re.search(rf"(?m)^##\s+v{re.escape(version)}\b", notes):
    raise SystemExit(f"FAIL: RELEASE_NOTES.md has no top-level release entry for {version}")

metadata = json.loads((ROOT / "hacs.json").read_text(encoding="utf-8"))
if metadata.get("filename") != "smartify-weather-chart.js":
    raise SystemExit("FAIL: HACS filename does not match build artifact")
if not metadata.get("name"):
    raise SystemExit("FAIL: HACS name missing")
if not (ROOT / "dist" / metadata["filename"]).is_file():
    raise SystemExit("FAIL: HACS distributable does not exist")
if "custom:weather-chart-card" not in (ROOT / "README.md").read_text(encoding="utf-8"):
    raise SystemExit("FAIL: documented Lovelace card type missing")
print(f"PASS: Smartify Weather Card v{version} metadata and HACS contract")
