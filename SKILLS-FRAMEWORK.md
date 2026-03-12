# AgentStandard — Universal Skills Framework
*Architecture document · March 2026*

---

## The Problem We're Solving

Right now every AgentStandard package = a Telegram bot. One delivery mode, one audience.

The new model: every package ships in 5 formats, works on any platform, with clean activation and deactivation so skills don't bleed into each other.

---

## Universal Package Structure

Each package ships as a folder:

```
packages/[slug]/
├── manifest.json          # metadata, version, capabilities, cost estimate
├── SKILL.md               # OpenClaw native (current format)
├── claude-project.md      # Claude.ai Project instructions
├── claude-code.md         # CLAUDE.md for Claude Code workspaces
├── chatgpt-instructions.md # Custom GPT system prompt
├── api-prompt.txt         # Raw system prompt for API/developer use
└── triggers.json          # Activation + deactivation config
```

---

## Platform Delivery Guide

### OpenClaw (native)
Drop `SKILL.md` into `~/.openclaw/workspace/skills/[package]/SKILL.md`
Skills activate automatically when task matches description.
Explicit activation: `@[skill-name]` or skill trigger phrase.

### Claude.ai
1. Open Claude.ai → Projects → New Project (or existing)
2. Click "Set project instructions"
3. Paste contents of `claude-project.md`
4. Start chatting — skill is active for that project
Deactivation: Switch project, or tell Claude "exit [skill name] mode"

### Claude Code
1. Copy `claude-code.md` contents
2. Paste into `CLAUDE.md` in your workspace root (or append with `## [SKILL NAME]` header)
3. Claude Code reads CLAUDE.md on every session start
Deactivation: Remove or comment out the skill section in CLAUDE.md

### ChatGPT Custom GPT
1. ChatGPT → Explore GPTs → Create
2. In "Instructions" field, paste `chatgpt-instructions.md`
3. Name it "[Your Name]'s [Skill Name]"
4. Save and start chatting
Deactivation: Switch to a different GPT, or tell it "exit [skill] mode"

### API / Developers
Inject `api-prompt.txt` as the `system` message in your API call.
Can be dynamically loaded/unloaded per session.
See `triggers.json` for activation signal patterns.

---

## The Skill Router Pattern (Cross-Platform Activation/Deactivation)

The core problem: once a skill is loaded, how do you turn it off without manually editing files?

**Solution: Every skill includes activation/deactivation triggers baked in.**

Each skill's system prompt contains:

```
## ACTIVATION
You are in [SKILL NAME] mode. Stay in this mode until the user:
- Says "done", "exit", "back to normal", "stop [skill name]", or "@default"
- Asks about something clearly unrelated for 3+ consecutive turns
- Starts a new session (session-scoped by default)

When deactivated: acknowledge briefly ("Got it, exiting wine log mode") 
and return to base assistant behaviour.
```

For OpenClaw specifically, a **Skill Router** meta-prompt manages this:

```
## INSTALLED SKILLS
[list of installed skills with trigger phrases]

RULES:
- Skills are INACTIVE by default
- Activate when trigger phrase detected
- Only one skill active at a time
- On deactivation, return to base persona immediately
```

---

## Activation/Deactivation Triggers Schema (triggers.json)

```json
{
  "slug": "wine-log",
  "activation": {
    "phrases": ["wine time", "log a wine", "sommelier mode", "tell me about this wine"],
    "context_signals": ["mentions a wine name", "mentions a vineyard", "mentions a vintage"],
    "explicit_command": "@wine-log"
  },
  "deactivation": {
    "phrases": ["done", "exit", "back to normal", "stop wine log", "@default"],
    "auto_deactivate": {
      "after_minutes_idle": 30,
      "after_unrelated_turns": 3,
      "on_session_end": true
    }
  },
  "scope": "session",
  "singleton": true
}
```

---

## Updated Manifest Schema (manifest.json)

```json
{
  "slug": "wine-log",
  "name": "Wine Log",
  "tagline": "Your personal sommelier and wine memory",
  "version": "1.1.0",
  "certified_by": "agentstandard.ai",
  "certified_at": "2026-03-12",
  "platform_compatibility": {
    "openclaw": "full",
    "claude_ai": "full",
    "claude_code": "full",
    "chatgpt": "full",
    "api": "full"
  },
  "requires_tools": [],
  "token_cost_estimate": "800-1500 per session",
  "capabilities": ["wine_identification", "tasting_notes", "pairing_suggestions", "cellar_tracking"],
  "category": "lifestyle",
  "scope": "session",
  "price_tier": "personal"
}
```

`platform_compatibility` values: `"full"` | `"partial"` | `"tools_required"` | `"not_supported"`

A skill that needs web_search = `"partial"` on ChatGPT (no browsing in basic plan).
A skill that needs calendar = `"tools_required"` on Claude.ai.

---

## Site UX — Package Page Redesign

Each package page gets a **Platform Selector**:

```
[OpenClaw ▼] [Claude.ai] [Claude Code] [ChatGPT] [API]
```

Selecting a platform shows:
1. **What you get** — which features work on this platform
2. **Install instructions** — 3 steps, platform-specific
3. **Copy prompt** button — one click, right format
4. **Activation triggers** — "say any of these to activate"
5. **Deactivation triggers** — "say any of these to exit"
6. **Compatibility badge** — Full / Partial / Tools Required

---

## Skill Scope Types

| Scope | Behaviour |
|-------|-----------|
| `session` | Active for one conversation. Default. |
| `persistent` | Stays active across sessions until explicitly removed |
| `on-demand` | Must be explicitly invoked each time |
| `background` | Passive — enriches responses without being "active" |

Most lifestyle skills (wine-log, book-brain, taste-map) = `session`
Most utility skills (memory-architect, network-pulse) = `persistent`
Most advisor skills (bid-auditor, salary-scout) = `on-demand`

---

## Full Package List (30+ to convert)

### Lifestyle
- wine-log
- taste-map
- book-brain
- gift-curator
- supplement-stack
- home-stack
- read-it-later

### Professional
- salary-scout
- job-hunt-agent
- freelancer-guard
- bid-auditor
- network-pulse
- skill-tracker

### Productivity
- memory-architect
- week-in-review
- relationship-graph

### Health & Wellness
- *(check current list)*

### Onboarding
- first-conversation

### Advisor (Channel 3 — Counterparty)
- *(adversarial/external packages)*

---

## Implementation Plan

### Phase 1 — Framework (this session)
- [x] Design universal package structure
- [x] Define triggers.json schema
- [x] Define updated manifest.json schema
- [ ] Build reference implementation (wine-log as template)
- [ ] Write platform delivery guide (user-facing)

### Phase 2 — Package Conversion (coding agent job)
- [ ] Convert all 30+ manifests to new format
- [ ] Write SKILL.md, claude-project.md, claude-code.md, chatgpt-instructions.md, api-prompt.txt for each
- [ ] Write triggers.json for each

### Phase 3 — Site Redesign
- [ ] Platform selector component on package pages
- [ ] Platform-specific install flow
- [ ] Copy-prompt button
- [ ] Compatibility badges
- [ ] Filter packages by platform compatibility

### Phase 4 — Skill Router (OpenClaw)
- [ ] Meta-prompt that manages skill activation/deactivation
- [ ] `@skill-name` syntax for explicit activation
- [ ] `@default` / "done" for deactivation
- [ ] Visual indicator of active skill (in bot responses)
