# AGENTS.md – Smartify Weather Card

**Verbindliche Entwicklungs-, Test-, Dokumentations- und Release-Regeln.** Vor jedem Eingriff vollständig lesen – auch bei kleinen CSS-Änderungen, Hotfixes und Änderungen durch Coding-Agenten.

## 1. Vor dem Edit: Lesepflicht und Parallelentwicklung
1. Aktuellen Stand von `main`, offene Pull Requests, Tags und tatsächlich veröffentlichte GitHub-Releases prüfen. Ein Commit, Tag oder Versionsbump allein ist **kein Release**.
2. `AGENTS.md`, `README.md`, `CHANGELOG.md`, `RELEASE_NOTES.md`, `hacs.json` und den betreffenden Code in `dist/smartify-weather-chart.js` vollständig bzw. auf relevante Aufrufpfade lesen.
3. Bereits behobene Fehler sowie frühere Änderungen berücksichtigen. Keine bestehenden Funktionen versehentlich zurückbauen.
4. Bei parallelen Arbeiten unmittelbar vor dem Schreiben den aktuellen Datei-SHA abrufen, konfliktfrei zusammenführen; kein Force-Push und keine geänderten historischen Tags.

## 2. Projektidentität und Architektur
- Repository: `smartify-your-home/smartify-weather-card`
- HACS-Typ: **Dashboard**, keine HA-Integration und kein Supervisor-Add-on.
- Installationsdatei: `dist/smartify-weather-chart.js`; HACS-Dateiname aus `hacs.json`: `smartify-weather-chart.js`.
- Benutzerdefiniertes Kartenelement und YAML-Typ: `custom:weather-chart-card`. Nicht ohne Migration umbenennen.
- Daten: Home-Assistant-`weather.*`-Entities und `weather/subscribe_forecast` mit `daily`/`hourly`. Entitätswahl, Sensorersatz, Chart.js, Icons und Grafik-Editor schützen.
- Die Karte wird als **Lovelace-JavaScript-Modulressource** geladen. Keine parallele Extra-JS-Einbindung einführen. Manuelle Ressource: `/local/smartify-weather-chart.js?v=X.Y.Z` (bei neuer Version aktualisieren).
- Custom-Element-Registrierung gegen doppelte Definition absichern. Keine unnötige Neuanmeldung bei Karten-Re-Render.

## 3. Version, Changelog, Release Notes
**Jede nutzerrelevante Änderung erhält eine neue SemVer-Version**, kein stilles Nachpatchen einer bereits veröffentlichten Version.
1. Version `X.Y.Z` synchron in der JavaScript-Konstante `SMARTIFY_WEATHER_CARD_VERSION`, in `README.md`, `CHANGELOG.md` und `RELEASE_NOTES.md` führen.
2. `CHANGELOG.md` mit neuer Version und Datum (wenn bestätigt), »Neu«, »Geändert«, »Behoben«, Migration und bekannten Einschränkungen chronologisch pflegen. Historische Einträge nicht umschreiben.
3. `RELEASE_NOTES.md` zusätzlich als benutzerfreundliche Beschreibung: Neuerungen, Fixes, Upgrade-Anleitung, Kompatibilität, Einschränkungen und ehrlich angegebenen Teststatus.
4. `README.md` und die Konfigurationsbeispiele/Optionstabelle bei neuen Funktionen anpassen; HACS- und manuelle Installationshinweise aktuell halten.
5. Für veröffentlichte Versionen Git-Tag `vX.Y.Z` und **echtes GitHub-Release** mit Notes erzeugen, vorhandene Workflows beachten und Veröffentlichung tatsächlich verifizieren. Nicht behaupten, ein Release sei veröffentlicht, wenn nur Commits existieren.
6. Änderungen in der Kommunikation **primär mit Versionsnummer** nennen. Commit-SHA optional als technische Ergänzung.

## 4. Forecast-Scroll-Regeln ab v1.1.1
- Horizontaler Scrollbereich umschließt **gemeinsam** Chart.js-Canvas, Wetter-Icons und Windreihe; diese müssen exakt miteinander ausgerichtet bleiben.
- Gilt für `forecast.type: daily` und `hourly`; Desktop-Scrollleiste und Touch-Scrollen für Smartphone/Tablet. Hauptbereich und Attribute bleiben fest.
- `forecast.number_of_forecasts: 0` zeigt alle vom Wetteranbieter verfügbaren Einträge, Werte >0 begrenzen bewusst die Menge.
- Beim Eingang neuer Forecast-Daten müssen Anzahl, Track-Breite und Chart neu berechnet werden. Keine endlose ResizeObserver/Render-Schleife.
- `autoscroll` ist eine **bestehende, andere Option** für zeitbezogenes Forecast-Filtern und darf nicht mit der manuellen Horizontal-Scrollfunktion verwechselt oder still geändert werden.
- Scrollen darf weder Klick für »More Info« noch Chart-Tooltips, Wetterdaten, Niederschlagswahrscheinlichkeit oder beide Darstellungsstile beschädigen.

## 5. Tests und Freigabegates
Vor Release nach Möglichkeit JavaScript-Syntaxprüfung (z. B. `node --check dist/smartify-weather-chart.js`), gültiges `hacs.json`, Dom-/CSS-Regressionen und Home-Assistant-Praxistest. Mindestens:
- Täglich und stündlich; Style 1/2; kurze und lange Forecasts.
- `number_of_forecasts: 0` und explizite Limits; Datenaktualisierung und Card-Größenwechsel.
- Handy/Tablet/Desktop; Touch, Maus, Tastatur; Scrollleiste und Diagramm-/Icon-/Wind-Ausrichtung.
- `autoscroll`, dynamische Icons, Tooltip, Niederschlagsmenge/-wahrscheinlichkeit und deaktivierte Icon-/Windzeilen.
- Chart-Neuzeichnung und HA Dashboard Editor ohne Konfigurationsfehler.
Tests niemals durch Entfernen/Abschwächen vortäuschen; ohne reale HA-Laufzeit den End-to-End-Test als **nicht durchgeführt** melden.

## 6. Abschlussbericht / Definition of Done
Ein Änderungsauftrag ist nur abgeschlossen, wenn Code, Versionskennzeichnung, Changelog, Release Notes und betroffene README-Inhalte konsistent vorliegen. Abschluss nennt Versionsnummer, relevante Änderungen, Tests/fehlende Tests und klar den Status von **GitHub-Release: ja/nein**.

## 7. Verbindliche CI-Validierung (ab v1.1.1)
- `.github/workflows/validation.yml` läuft separat bei Push, Pull Request und manuell; der Release-Workflow bindet sie als **wiederverwendbaren Pflichtjob** ein (`needs: validate`).
- Die Validierung führt `node --check` für die verteilte Karte und Tests, `python scripts/check_version.py`, `node --test tests/*.test.cjs` und eine YAML-Prüfung der Workflows aus. Ein fehlgeschlagener Test verhindert die Veröffentlichung.
- Änderungen an den Vorhersagevarianten benötigen passende Regressionstests; die bestehenden Tests niemals zum Umgehen von Fehlern abschwächen oder entfernen.
- Statische Contract-Tests ersetzen keinen echten Home-Assistant-Test. CI-Status ist gesondert vom GitHub-Actions-Startstatus zu berichten: `startup_failure` entsteht vor Ausführung und wird durch Codevalidierung allein nicht geheilt.
