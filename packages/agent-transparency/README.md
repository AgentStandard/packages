# Agent Transparency Dashboard

**Package ID:** `agent-transparency`  
**Version:** 1.0.0  
**Category:** Trust & Transparency  
**Setup time:** ~5 minutes  

---

## What is this?

Your agent learns things about you. Over time, it builds a mental model — your name, your preferences, your patterns, what you care about, what you don't. It uses that model to personalise every response.

But until now, that mental model has been invisible.

**Agent Transparency Dashboard** changes that. It gives you a live, structured audit of exactly what your agent knows about you — how confident it is in each fact, where each belief came from, what it's learned recently, and what gaps exist. Think of it as an X-ray of your agent's head.

This is not a data privacy tool (though it helps with that). It's a **calibration tool** — for users who want their agent to work better, and who want to trust it enough to give it more.

---

## Why it matters

Most AI agent failures aren't hallucinations. They're **stale context** — the agent operating on an outdated assumption, a misheard detail, or something it inferred once and never corrected.

Common failure modes this package surfaces:
- The agent thinks you're in a timezone you left two years ago
- It inferred you prefer brief answers, but you actually want depth
- It learned something about your job title that's no longer accurate
- It's treating a guess as a fact

Now you can see these. And fix them.

---

## Commands

| Command | What it does |
|---|---|
| `/audit` | Full mental model audit — everything the agent knows, structured by category with confidence tags |
| `/recent` | What has the agent learned or updated in the last 7 days? |
| `/gaps` | What doesn't the agent know that it probably should? |
| `/surface [topic]` | What would the agent bring up if you asked about [topic]? |
| `/forget [item]` | Delete a specific fact from the agent's memory |
| `/confidence` | All stored facts ranked by confidence — surfaces every assumption |

---

## Audit format

When you run `/audit`, you get a structured breakdown across six categories:

**1. Identity & Basics**  
Name, location, timezone, pronouns. The scaffolding. Usually High confidence because users state these directly.

**2. Professional Context**  
Role, industry, goals, constraints. Often a mix of stated and inferred — check these carefully if your situation has changed.

**3. Preferences**  
Communication style, format preferences, topics of interest. Frequently inferred from patterns. Medium confidence is common here.

**4. Patterns**  
When you're active, how you phrase requests, recurring themes. Observed, not stated. Treat as probabilistic, not definitive.

**5. Recent Context**  
What's been on your mind lately, active projects. High recency but lower permanence — expect this section to change week to week.

**6. Inferences**  
The most important section. Things the agent *believes* but wasn't told directly. Always flagged clearly. These are where calibration matters most.

Each item shows:
- The fact or belief
- **Confidence: High / Medium / Low**
- **Source: User-stated | Inferred | Observed pattern**
- **Last updated**

---

## Confidence levels explained

| Level | Meaning |
|---|---|
| **High** | You told the agent this directly. It heard it, not guessed it. |
| **Medium** | Inferred from multiple consistent signals across multiple sessions. Probably right, worth confirming. |
| **Low** | Single observation, one-time signal, or a guess. Treat as provisional. |

When you see Low confidence on something important — correct it. The agent will update immediately.

---

## Setup

**Step 1.** Open the bot:  
[t.me/AgentStandardAI_bot?start=agent-transparency](https://t.me/AgentStandardAI_bot?start=agent-transparency)

**Step 2.** Complete your baseline inventory (5 minutes).  
The agent will ask you 7–10 questions to establish a Day 1 snapshot. This snapshot becomes your reference point — so you can see exactly what changes over time as your agent learns.

**Step 3.** Run `/audit`.  
See everything. Flag anything wrong. Correct what's off.

From here, run `/recent` weekly to stay calibrated and `/audit` monthly for a full review.

---

## Privacy controls

**You own your data.** The Transparency Dashboard gives you genuine control:

- `/forget [item]` — remove specific facts. The agent confirms deletion and stops referencing that item.
- Inferences are always clearly labelled — you'll never mistake a guess for a stated fact.
- Export your profile at any time: type "export my profile" for a portable context snapshot.

> **Note:** `/forget` prevents future references within the agent's context window. Whether data persists in underlying platform storage depends on your platform's retention policy. Check that separately for full data hygiene.

---

## Who this is for

- **Power users** who give their agent access to sensitive tasks and want to verify what it knows first
- **New users** who want to onboard efficiently by seeding a clean, accurate baseline from day one
- **Privacy-conscious users** who want to understand and control what persists
- **Anyone** whose agent has started feeling slightly off — this is usually a calibration issue

---

## Example output

```
/audit — Mental Model Audit (March 5, 2026)

IDENTITY & BASICS
━━━━━━━━━━━━━━━━
• Name: Alex Chen [High | User-stated | Jan 12]
• Location: Singapore (GMT+8) [High | User-stated | Jan 12]
• Pronouns: they/them [High | User-stated | Jan 12]

PROFESSIONAL CONTEXT
━━━━━━━━━━━━━━━━━━
• Role: Product Manager, Series B fintech [High | User-stated | Feb 3]
• Current focus: Q2 roadmap planning [Medium | Inferred | Mar 1]
• Team size: ~12 [Low | Inferred from mentions — confirm?]

PREFERENCES
━━━━━━━━━━
• Format: Prefers bullet points over prose [Medium | Observed pattern | ongoing]
• Response length: Concise — flags when responses feel too long [High | User-stated | Feb 14]
• Tone: Direct, no hedging [Medium | Observed pattern | ongoing]

INFERENCES ⚠️
━━━━━━━━━━━━
• May be considering a role change [Low | One mention of "exploring options" on Feb 28 — unconfirmed]
• Works primarily evenings SGT based on message timestamps [Medium | Observed pattern | 3 weeks]

GAPS DETECTED
━━━━━━━━━━━━
• No information on personal context, goals outside work
• Communication preferences for sensitive topics unclear
• Time zone travel patterns unknown (affects scheduling)
```

---

## Changelog

**v1.0.0** (2026-03-05)  
Initial release. First transparency-native package in the AgentStandard library. Built to answer the question every power user eventually asks: *what does my agent actually think it knows about me?*

---

## Contributing

Found a way to make audits more useful? Open an issue or submit a PR at [github.com/AgentStandard/packages](https://github.com/AgentStandard/packages).

This package is MIT licensed.
