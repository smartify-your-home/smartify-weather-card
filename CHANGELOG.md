# Changelog – Smartify Weather Card

Alle nutzerrelevanten Änderungen werden ab v1.1.1 nach SemVer dokumentiert. Frühere Entwicklungsstände sind im GitHub-Release-Verlauf dokumentiert; das vorherige Release trägt den Tag `1.0.0` und den Titel `1.1.0`. Historische Metadaten werden nicht nachträglich umgeschrieben.

## [1.1.1] – 2026-11-11

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


### Qualitätssicherung / CI
- Eigenständiger Validierungs-Workflow für Push, Pull Requests und manuelle Ausführung ergänzt.
- JavaScript-Syntaxprüfung, Versions-/HACS-Konsistenz, Forecast-Scroll-Regressionen und Workflow-YAML-Prüfung eingeführt.
- Release-Workflow veröffentlicht nur nach erfolgreicher, wiederverwendbarer Validierung. Der bisherige GitHub-Actions-`startup_failure` ist dadurch nicht automatisch behoben.

### Migration / Upgrade
- Keine Änderung des Kartentyps oder der bestehenden YAML-Schlüssel.
- Die frühere automatische Begrenzung der Forecast-Zahl bei `number_of_forecasts: 0` entfällt. Für eine feste maximale Anzahl den Wert explizit setzen.
- Nach einem Update HACS-Ressource/Browser-Cache prüfen, bei manueller Installation die Ressource mit `?v=1.1.1` versionieren.

### Bekannte Einschränkungen / Teststatus
- Prüfung im laufenden Home Assistant (inkl. iPhone/iPad) steht aus.
- Die Version wurde in Dateien vorbereitet; ein separater GitHub-Tag und ein veröffentlichter GitHub-Release sind dadurch nicht automatisch entstanden.
