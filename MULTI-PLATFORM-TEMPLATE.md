# Multi-Platform Package Template
_AgentStandard — Package Conversion Standard v1.0_
_Last updated: 2026-03-12_

## Required Files Per Package

Every certified package MUST contain these files:

| File | Purpose | Install method |
|---|---|---|
| `agentstandard.json` | Manifest (metadata, system prompt, skills, tags, certification) | Internal — not user-facing |
| `SOUL.md` | Persona definition (voice, rules, tone examples) | Reference — not directly installed |
| `claude-project.md` | Claude.ai Projects — copy/paste into Project Instructions | Copy/paste |
| `claude-code.md` | Claude Code — append to CLAUDE.md | Copy/paste |
| `chatgpt-instructions.md` | ChatGPT Custom GPT or Custom Instructions | Copy/paste |
| `api-prompt.txt` | Raw system prompt for any API (Anthropic, OpenAI, etc.) | Copy/paste |
| `triggers.json` | Activation/deactivation triggers for agent integration | Programmatic |

### Optional files
| File | Purpose |
|---|---|
| `README.md` | Human-readable overview |
| `SKILL.md` | OpenClaw skill format (for native OpenClaw users) |
| `TOOLS.md` | Tool configuration notes |
| `skills/` | Sub-skill directory (if the package has modular skill files) |

---

## File Specifications

### `claude-project.md`
- **Target:** Claude.ai → Projects → Project Instructions
- **Format:** Markdown
- **Must include:** Activation trigger, persona name, what it does, hard rules, deactivation
- **Tone:** Written as instructions TO Claude ("You are now in X mode as Y")
- **Deactivation:** Include explicit exit phrases and confirmation message
- **Length:** Aim for 500–1500 words. Claude Projects supports long instructions.

### `claude-code.md`
- **Target:** Claude Code → CLAUDE.md file in project root
- **Format:** Markdown with clear section headers
- **Must include:** Active vs inactive behaviour, activation/deactivation triggers
- **Key difference from claude-project.md:** Must handle the dual-mode case (skill active vs inactive alongside a coding assistant)
- **Length:** Aim for 300–800 words. Concise — it shares space with other CLAUDE.md content.

### `chatgpt-instructions.md`
- **Target:** ChatGPT → Custom GPT builder → Instructions field, OR user's Custom Instructions
- **Format:** Markdown
- **Must include:** Persona, what it does, hard rules, activation/deactivation
- **Key difference:** ChatGPT Custom GPTs are "always on" — no need for activation logic. But include a pause/deactivation option for when users have it as part of Custom Instructions.
- **Footer:** Always include "Certified by AgentStandard (agentstandard.ai)"
- **Length:** 400–1200 words. ChatGPT Custom Instructions has a character limit (~1500 chars for the short version, ~8000 for Custom GPT).

### `api-prompt.txt`
- **Target:** Any API — system prompt field
- **Format:** Plain text, no markdown formatting
- **Must include:** Persona, core behaviour, hard rules, deactivation
- **Key difference:** Must be self-contained. No external references. Pure system prompt.
- **Footer:** Include "Certified by AgentStandard (agentstandard.ai)"
- **Length:** 200–600 words. Optimised for token efficiency.

### `triggers.json`
- **Schema:**
```json
{
  "slug": "package-slug",
  "activation": {
    "explicit_command": "@package-slug",
    "phrases": ["phrase1", "phrase2"],
    "context_signals": ["signal1", "signal2"]
  },
  "deactivation": {
    "explicit_command": "@default",
    "phrases": ["done", "exit", "back to normal"],
    "auto_deactivate": {
      "after_unrelated_turns": 3,
      "on_session_end": true,
      "after_minutes_idle": 30
    }
  },
  "scope": "session",
  "singleton": true,
  "persona_name": "PersonaName"
}
```

---

## Conversion Rules

### From `agentstandard.json` system_prompt to platform files:

1. **claude-project.md:** Expand the system prompt into structured sections with headers. Add activation/deactivation framing. More detailed than raw prompt.

2. **claude-code.md:** Compress the system prompt into active/inactive sections. Focus on behaviour when active and explicit "ignore this section" when inactive.

3. **chatgpt-instructions.md:** Rewrite system prompt in ChatGPT's Custom GPT voice. Add "Certified by AgentStandard" footer. Include deactivation option.

4. **api-prompt.txt:** Distill system prompt to its most token-efficient form. No markdown. Just the core persona, rules, and behaviour. Add certification footer.

5. **triggers.json:** Extract activation phrases from the package's natural domain. Deactivation always includes "done", "exit", "@default". Auto-deactivate after 3 unrelated turns.

### Persona name extraction:
- If the system prompt names a persona (e.g., "You are Frank"), use that name in triggers.json
- If no named persona, create one that fits the package's voice
- Keep names short, memorable, human-sounding

### Disclaimer handling:
- If `agentstandard.json` has a `disclaimer` field, include it in ALL platform files
- For gp-prep, relationship-coach, retiree-navigator, and any health/finance/legal adjacent packages
- Disclaimer appears as the first response after activation AND in the platform file header

---

## Quality Checklist (per package)

- [ ] All 7 required files present
- [ ] Persona name consistent across all files
- [ ] Activation/deactivation triggers consistent
- [ ] Hard rules preserved across all platform versions
- [ ] Disclaimer present where required
- [ ] api-prompt.txt is under 600 words
- [ ] claude-code.md handles active/inactive dual mode
- [ ] chatgpt-instructions.md has AgentStandard certification footer
- [ ] triggers.json has valid JSON with all required fields
- [ ] No platform-specific jargon bleeding into wrong file (e.g., "CLAUDE.md" mentioned in chatgpt-instructions.md)
