#!/usr/bin/env node
'use strict';

// Static regression contracts. These do NOT replace browser/HA end-to-end tests.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const source = fs.readFileSync(path.join(__dirname, '..', 'dist', 'smartify-weather-chart.js'), 'utf8');

test('stable Lovelace card type and protected registration', () => {
  assert.match(source, /customElements\.get\('weather-chart-card'\)/);
  assert.match(source, /customElements\.define\('weather-chart-card',\s*WeatherChartCard\)/);
  assert.match(source, /static getConfigElement\(\)/);
});

test('both hourly and daily forecasts remain supported', () => {
  assert.match(source, /forecast\.type === 'hourly'/);
  assert.match(source, /forecast\.type === 'daily'/);
  assert.match(source, /FORECAST_HOURLY/);
  assert.match(source, /FORECAST_DAILY/);
  assert.match(source, /weather\/subscribe_forecast/);
});

test('scroll container wraps chart, condition icons and wind in that order', () => {
  assert.match(source, /<div class="forecast-scroll"[^>]*>[\s\S]*?<div class="forecast-track">[\s\S]*?<canvas id="forecastChart"><\/canvas>[\s\S]*?\$\{this\.renderForecastConditionIcons\(\)\}[\s\S]*?\$\{this\.renderWind\(\)\}[\s\S]*?<\/div>[\s\S]*?<\/div>/);
  assert.match(source, /\.forecast-scroll\s*\{[^}]*overflow-x:\s*auto/);
  assert.match(source, /\.forecast-scroll\s*\{[^}]*-webkit-overflow-scrolling:\s*touch/);
  assert.match(source, /\.forecast-track\s*\{[^}]*min-width:/);
});

test('zero forecast limit means all available items, positive limit stays bounded', () => {
  assert.match(source, /const availableItems = this\.forecasts \? this\.forecasts\.length : 0/);
  assert.match(source, /requestedItems > 0 \? Math\.min\(requestedItems, availableItems\) : availableItems/);
});

test('forecast updates recompute width and redraw after render', () => {
  assert.match(source, /const callback = async \(event\) => \{[\s\S]*?this\.forecasts = event\.forecast;[\s\S]*?this\.measureCard\(\);[\s\S]*?await this\.updateComplete;[\s\S]*?this\.drawChart\(\);/);
});

test('existing display styles and optional forecast content remain', () => {
  assert.match(source, /config\.forecast\.style === 'style2'/);
  assert.match(source, /condition_icons === false/);
  assert.match(source, /show_wind_forecast !== false/);
  assert.match(source, /config\.autoscroll/);
  assert.match(source, /config\.forecast\.precipitation_type === 'probability'/);
  assert.match(source, /SMARTIFY_WEATHER_CARD_VERSION = '1\.1\.1'/);
});
