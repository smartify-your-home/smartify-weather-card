# Release Notes – Smartify Weather Card

## v1.1.1 – Horizontales Scrollen der Wettervorhersage
**Stand:** 11. November 2026  
**Status:** Code und Dokumentation vorbereitet; GitHub-Release-Veröffentlichung über GitHub Actions vorgesehen.

### Neu
Die tägliche **und** stündliche Wettervorhersage lässt sich jetzt seitlich scrollen. Diagramm, Niederschlag, Wetter-Icons und Windangaben bewegen sich zusammen und bleiben aufeinander ausgerichtet. Das funktioniert mit Touch-Gesten am Handy und Tablet sowie mit einer Scrollleiste am Desktop.

Eine dezente Versionsnummer unten rechts in der Karte erleichtert die Kontrolle, welcher Code geladen wurde.

### Verbessert
- Bei `forecast.number_of_forecasts: 0` werden alle verfügbaren Prognosepunkte gezeichnet, statt sie auf die aktuelle Kartenbreite zu begrenzen.
- Stunden und Tage bekommen passende Mindestbreiten, damit Labels lesbar bleiben.
- Bei aktualisierten Forecast-Daten wird die Scrollbreite neu berechnet.
- Schutz gegen eine doppelte Registrierung des Custom Elements.

### Update
1. Über HACS die neue Version installieren, sobald sie dort als Update angeboten wird.
2. Dashboard neu laden. Bei Cache-Problemen Browser/App hart neu laden.
3. Bei manueller Installation Datei `dist/smartify-weather-chart.js` aktualisieren und die Ressourcen-URL auf `/local/smartify-weather-chart.js?v=1.1.1` setzen.
4. Keine YAML-Migration nötig. Wer statt sämtlicher Stunden/Tage nur eine feste Anzahl möchte, setzt `forecast.number_of_forecasts` explizit.

### Kompatibilität, Hinweise und Tests
- Bestehender Kartentyp: `custom:weather-chart-card`.
- Beide Forecast-Typen: `daily` und `hourly`.
- Die separate Einstellung `autoscroll` bleibt bestehen und steuert nicht den manuellen Scrollbalken.
- **Noch nicht im echten Home Assistant auf Smartphone/Tablet/Desktop getestet.** Funktion und Ausrichtung müssen dort vor endgültiger Freigabe geprüft werden.
- Keine automatische Aussage über veröffentlichte GitHub-Releases aus diesen Notes ableiten.
