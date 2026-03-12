# TOOLS.md — Week In Review

## Setup

This package runs on Telegram — no API keys or technical configuration required.

### Step 1: Open the bot
Tap this link on your phone or desktop:
**https://t.me/AgentStandardAI_bot?start=week-in-review**

### Step 2: Complete setup
Answer the 7 quick setup questions when prompted. This takes about 2 minutes and personalises every conversation.

### Step 3: Start chatting
Your agent is ready. See the Context Prompts in SOUL.md for your first messages.

---

## OpenClaw (Advanced)

If you prefer to run this agent locally in OpenClaw instead of Telegram:

### ANTHROPIC_API_KEY
- **What it does:** Powers the AI responses locally on your machine
- **Required:** Yes (for OpenClaw deployment only)
- **How to get it:** https://console.anthropic.com/api-keys
- **Where to set it:** OpenClaw Settings → API Keys → Anthropic

```
ANTHROPIC_API_KEY=sk-ant-...
```

Copy the system prompt from `agentstandard.json` into your OpenClaw agent's SOUL.md or system prompt field to replicate the Telegram experience locally.

---

## Cost

| Deployment | Cost |
|-----------|------|
| Telegram bot | Free |
| OpenClaw (self-hosted) | ~/bin/bash.04–/bin/bash.12/session (Anthropic API) |
