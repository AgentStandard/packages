---
name: web-search
description: Search the web in real time. Use when you need current information, news, prices, competitor data, research, or anything that may have changed after your training cutoff. Returns synthesised results from live web sources.
---

# Web Search Skill

## When to Use
- Any question requiring current information (news, prices, events, market data)
- Competitor research, product availability, pricing intelligence
- Fact-checking claims that require recent sources
- Research tasks where training knowledge may be outdated

## How It Works
The web-search skill wraps a real-time search API (Brave Search or Perplexity Sonar depending on configuration). It queries multiple sources and returns synthesised results with citations.

## Configuration

### OpenClaw
Web search is built into OpenClaw via the `web_search` tool. No additional configuration required if your OpenClaw instance has a search API key configured.

To install explicitly:
```bash
openclaw skills install web-search
```

### Environment Variables
```
BRAVE_API_KEY=your-brave-api-key        # Brave Search (optional, uses default if not set)
PERPLEXITY_API_KEY=your-perplexity-key  # Perplexity Sonar (alternative)
```

Get a Brave API key at: https://brave.com/search/api/

## Usage Patterns

### Simple Query
Ask your agent anything requiring current information:
> "What is the current price of [product] on [platform]?"
> "What are the latest reviews of [company/product]?"
> "Who are the main competitors to [business] and what do they charge?"

### Research Mode
For structured research tasks, the agent will:
1. Run multiple targeted queries
2. Synthesise findings across sources
3. Note conflicting information
4. Cite sources in output

### News and Market Data
> "What has happened with [topic] in the last 7 days?"
> "What are the current market trends in [industry]?"

## Limitations
- Cannot access paywalled content without login credentials
- Real-time financial data (live stock prices, order books) requires dedicated financial data skills
- Search results are synthesised — for critical decisions, verify primary sources directly
- Rate limits apply on free API tiers

## Quality Notes
- Brave Search: fast, privacy-respecting, good for general web queries
- Perplexity Sonar: better synthesis of complex research questions, slightly higher latency
- For financial data: use the `financial-data` skill instead
