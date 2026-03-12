---
name: weather
description: Get current weather conditions and forecasts for any location. Use when a user asks about weather, temperature, precipitation, or forecasts. No API key required — uses wttr.in or Open-Meteo.
---

# Weather Skill

## When to Use
- User asks about current weather in any city or location
- User wants a forecast (today, tomorrow, this week)
- Testing that your OpenClaw setup is working (this is the recommended first-use test)
- Any conversation where weather context is relevant

## How It Works
The weather skill queries public weather APIs (wttr.in and/or Open-Meteo) — no API key required. It returns current conditions and short-term forecasts for any location worldwide.

## Configuration

### Install
```bash
openclaw skills install weather
```

No API keys or environment variables needed. Works immediately after installation.

## Usage Patterns

### Current Conditions
> "What's the weather like in London right now?"
> "Is it raining in Tokyo?"
> "What's the temperature in New York?"

### Forecasts
> "What's the weather going to be like in Barcelona this week?"
> "Will it rain in Edinburgh tomorrow?"
> "What's the forecast for Paris for the next 3 days?"

### First-Use Test
If you've just set up OpenClaw and want to confirm your agent is working:
> "What's the weather in London today?"

If your agent responds with current conditions, your setup is working correctly.

## Output Format
Responses include:
- Current temperature (°C and °F)
- Conditions (sunny, cloudy, rain, etc.)
- Wind speed and direction
- Humidity
- Forecast for next 1-3 days when requested

## Limitations
- Forecast accuracy decreases beyond 7 days
- Hyperlocal conditions (specific neighbourhoods) may differ from city-level data
- Historical weather data is not available via this skill — use a dedicated historical weather API for past conditions
- Severe weather alerts are not included — check your local meteorological service for safety-critical information

## Data Sources
- **wttr.in**: Simple weather service, worldwide coverage
- **Open-Meteo**: More detailed forecasts, free and open-source
