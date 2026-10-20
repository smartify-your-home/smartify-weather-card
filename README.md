# Smartify Weather Card

Customized weather chart card for Home Assistant (based on
[weather-chart-card](https://github.com/mlamberts78/weather-chart-card)) with colored icons.

## Installation

Add this repository to HACS as a custom repository of type **Dashboard**, install it and
reload the browser.

Manual: copy `weather-chart-neu.js` to `/config/www/` and add `/local/weather-chart-neu.js`
as a dashboard resource (type: JavaScript module).

## Usage

```yaml
type: custom:weather-chart-card
entity: weather.meteonomiqs_wetter
```
