# Agent Transparency

**Your agent has a system prompt. Find out what's in it.**

Agent Transparency is your dedicated audit agent for understanding, verifying, and controlling your AI setup — in plain English.

## What it does

Most users have no idea what their agent has been instructed to do, what skills are installed, or whether those skills contain concerning patterns. Agent Transparency fixes that.

### Commands

- `/audit skills` — Analyse your installed skills. Plain-English summary of what each one instructs the agent to do. Flags red patterns, marks clean ones.
- `/explain` — Paste any system prompt. Get a plain-English translation of what the agent has been told — including any "gag clauses" or hidden restrictions.
- `/check-clawhub-criteria` — Apply the ClawHub malware checklist to any skill. Pass / Fail / Borderline with evidence.
- `/diff` — Compare two versions of a skill or system prompt. See exactly what changed and whether it matters.
- `/audit memory` — Review your agent's memory files. See every belief it holds about you, tagged as user-stated vs inferred.
- `/health` — Full OpenClaw setup health check. Green / Amber / Red with specific findings.

## Who it's for

- Non-technical users who installed an agent but aren't sure what it's actually doing
- Anyone who received a recommended setup and wants a second opinion
- Users who want to audit skills before trusting them
- Anyone who wants to understand a system prompt without reading code

## ClawHub Malware Criteria

A skill FAILS if it:
1. Exfiltrates user data to external endpoints without consent
2. Injects instructions from remote URLs at runtime
3. Overrides the host agent's safety rules or identity
4. Claims to be a different agent than it is
5. Modifies workspace files outside its stated scope
6. Runs shell/exec commands not related to its core function
7. Installs other skills without user confirmation

## Install (OpenClaw)

```
openclaw skill install agent-transparency
```

Or manually: copy the `system_prompt` from `agentstandard.json` into your agent config.

## Certification

✦ AgentStandard Certified — reviewed against transparency, minimal-scope, and safety criteria.

---

*Part of [AgentStandard](https://agentstandard.ai) — the certified AI agent package marketplace.*
