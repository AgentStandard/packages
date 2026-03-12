# Forge Certification Report — first-conversation
Date: 2026-03-12
Reviewer: Forge (Claude)
Persona: Ember

## Verdict: CONDITIONAL
Score: 44/100

---

## Layer 1: Identity & Scope (8/25)
CRITICAL: No system_prompt or telegram_system_prompt. MCP-format only. first-conversation is actually a meta-package (the onboarding setup guide) so the absence of a conversational persona is partially by design — but it still needs some agent instructions.

Score: 8/25

---

## Layer 2: Safety Gates — PASS (vacuous)

---

## Layer 3: Output Quality (18/40)
first-conversation serves a specific purpose: onboarding a new user to AgentStandard. The setup_steps (20 min, PowerShell) suggest this predates the shift away from terminal installs. Needs significant update to reflect the new no-terminal, Telegram-first direction.

"From PowerShell to dialogue in 20 minutes" is now the wrong tagline entirely.

Score: 18/40

---

## Layer 4: Technical Quality (3/10)
- Platform files ✅ (fallback)
- No system_prompt ❌
- Tagline outdated ❌ ("PowerShell" — now Telegram-first)
- Setup steps reference terminal installation ❌
- SOUL.md missing ❌

Score: 3/10

---

## Discretionary (15/25)
The concept of a first-conversation/onboarding package is valuable. But this one needs a full rebuild to match the current product direction.

Score: 15/25

---

## Issues Found
1. No system_prompt
2. Tagline and setup steps reference outdated installation method (PowerShell terminal)
3. No SOUL.md
4. Entire package needs updating for Telegram-first, no-terminal product direction

## Recommendations
1. Rebuild completely: first-conversation is now "the general agent entry point" per the new onboarding spec
2. New tagline: "Start here. Everything else flows from this."
3. New setup step: one Telegram link, no terminal
4. Write system_prompt for Ember: warm, curious general agent who seeds the relationship and surfaces packages based on what the user shares

**30-day conditional — but this is a product-direction rebuild, not a minor fix.**
