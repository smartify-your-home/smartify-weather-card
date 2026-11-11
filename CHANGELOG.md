# Changelog – Smartify Weather Card

Alle nutzerrelevanten Änderungen werden ab v0.1.0 nach SemVer dokumentiert. Frühere unversionierte Entwicklungsstände werden nicht nachträglich als veröffentlichte Releases ausgegeben.

## [0.1.0] – 2026-11-11

### Neu
- Horizontal scrollbar für die **Stunden- und Tagesvorhersage** auf Desktop und Touch-Geräten.
- Gemeinsamer Scrollbereich für Temperaturkurve/Niederschlag, Wetter-Icons und Windwerte.
- Kleine sichtbare Smartify-Versionsnummer in der Karte.
- Verbindliche Projektregeln in `AGENTS.md`; eigene `RELEASE_NOTES.md`.

### Geändert
- `forecast.number_of_forecasts: 0` nutzt nun alle verfügbaren Forecast-Einträge statt einer von der Kartenbreite abhängigen Anzahl.
- Forecast-Track berücksichtigt je nach Ansichtsart eine eigene Mindestbreite pro Eintrag.
- Forecast-Aktualisierungen lösen eine erneute Breitenberechnung aus.
- Registrierung von `weather-chart-card` gegen wiederholtes `customElements.define` abgesichert.

### Migration / Upgrade
- Keine Änderung des Kartentyps oder der bestehenden YAML-Schlüssel.
- Die frühere automatische Begrenzung der Forecast-Zahl bei `number_of_forecasts: 0` entfällt. Für eine feste maximale Anzahl den Wert explizit setzen.
- Nach einem Update HACS-Ressource/Browser-Cache prüfen, bei manueller Installation die Ressource mit `?v=0.1.0` versionieren.

### Bekannte Einschränkungen / Teststatus
- Prüfung im laufenden Home Assistant (inkl. iPhone/iPad) steht aus.
- Die Version wurde in Dateien vorbereitet; ein separater GitHub-Tag und ein veröffentlichter GitHub-Release sind dadurch nicht automatisch entstanden.
