# Smartify Weather Card

Customized weather chart card for Home Assistant (based on
[weather-chart-card](https://github.com/mlamberts78/weather-chart-card)) with colored icons.

## Installation

Add this repository to HACS as a custom repository of type **Dashboard**, install it and
reload the browser.

Manual: copy `dist/smartify-weather-chart.js` to `/config/www/` and add `/local/smartify-weather-chart.js`
as a dashboard resource (type: JavaScript module).

## Usage

```yaml
type: custom:weather-chart-card
entity: weather.meteonomiqs_wetter
```
