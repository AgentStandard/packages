# Onboarding Spec v2 — Post-Onboarding Package Proposals
_AgentStandard Bot — Updated 2026-03-12_

## Problem Being Solved
New users complete the 7-question onboarding flow and then face a blank message box with no idea what to say next. This is **writer's block** — and it's the #1 onboarding failure. The fix: after the final onboarding answer, the bot proposes 3 relevant packages immediately based on what the user just shared.

---

## The 7-Question Onboarding Flow (existing, unchanged)
1. What's your name?
2. What should I call you? (casual name or nickname)
3. Tell me a bit about yourself — what do you do?
4. What's your biggest challenge right now?
5. How do you prefer to communicate? (detail level, tone)
6. What are your most important values or principles?
7. What's one thing you want to be better at this year?

---

## Post-Onboarding Proposal Flow (NEW)

### Trigger
After the user answers question 7 (or the final question in the flow), the bot:

1. Acknowledges completion warmly but briefly
2. Uses answers from questions 3, 4, and 7 to run matching logic
3. Proposes exactly 3 packages with brief explanations

### Matching Logic (pseudocode)

```
profession = extract_profession(answers[question_3])
challenge = answers[question_4]
goal = answers[question_7]

# Step 1: Try career match from profession-package-map.json
career_match = match_profession(profession)

# Step 2: Check for life stage overrides
life_stage = detect_life_stage(answers[question_3], answers[question_4])
if life_stage:
  override applies to primary slot

# Step 3: Try to contextually match from challenge + goal text
context_match = semantic_match(challenge + goal, package_descriptions)

# Step 4: Build the 3-pack
if career_match:
  proposal[0] = career_match.primary[0]           # best career match
  proposal[1] = context_match OR career_match.secondary[0]  # challenge/goal match
  proposal[2] = lifestyle_fallback[0]             # universal fallback
else:
  proposal[0] = lifestyle_fallbacks[0]  # pantry-chef / dream-decoder / relationship-coach
  proposal[1] = context_match OR lifestyle_fallbacks[1]
  proposal[2] = lifestyle_fallbacks[2]

# Deduplicate
remove any duplicate package from proposal array
fill empty slots from next available in lifecycle_fallbacks
```

### Message Format (after onboarding complete)

```
Great — I've got a good picture of you now. Before we dive in, here are three things I can help with based on what you've shared:

1. **[Package Name]** — [one line reason tied to what they said]
   → [deep link button]

2. **[Package Name]** — [one line reason tied to what they said]
   → [deep link button]

3. **[Package Name]** — [one line reason tied to what they said]
   → [deep link button]

These activate instantly. Or just talk to me — I'm useful without any of them.
```

### Personalisation rules
- The one-line reason MUST reference something they actually said. Not a generic description.
  - ✅ "You mentioned your biggest challenge is staying on top of admin — this is built for that."
  - ❌ "This package helps you stay organised and get more done."
- If no career match: anchor the proposal on the universal lifestyle packages and frame them accessibly
- "Or just talk to me" line is intentional — removes pressure, keeps the general agent open

---

## General Agent Entry Point (NEW)

Before or instead of choosing a package, users can simply talk to the bot as a general agent. The general agent:
- Uses context from onboarding to respond appropriately
- Surfaces package recommendations organically when the conversation reaches a use case a package covers
- Does NOT force every conversation toward a package

### General agent first message (for users who skip the deep link)
```
Hi [name], I'm your AgentStandard agent. You can ask me anything — I know a lot.

If you want me to go deeper on something specific (career coaching, interview prep, your cooking, your sleep, your relationships — there are 47 packages for that), just ask me what I can do and I'll show you.

What's on your mind?
```

---

## 48-Hour Re-Engagement (NEW)

### Trigger
User has not sent any message in 48 hours since last activity (onboarding or conversation).

### Message
```
Hey [name] — just checking in. It's been a couple of days.

Here's one thing we could work on based on what you told me: [one specific, contextually relevant prompt based on onboarding answers — their challenge or goal].

Or if something else has come up, I'm here.
```

### Rules
- Send once per 48-hour window, maximum 3 times total before stopping
- After 3 unanswered re-engagements: go silent unless user returns
- Timing: do not send between 22:00–08:00 local time if timezone is known
- The specific prompt must be genuinely tied to what they said — not a generic "how can I help?"

---

## Judgment-Free Tone Guide (applies to all packages)

This is baked into the system prompt framework for every package. The principle:

> No one should feel judged, stupid, or inadequate for what they ask. Use plain language. Never assume expertise. If someone asks something basic, treat it as the most normal question in the world.

### Applies particularly to:
- Relationship Coach (emotional vulnerability)
- Retiree Navigator (navigating a confusing system at a sensitive life stage)
- GP Prep (medical anxiety)
- Manager Coach (professional vulnerability — asking for help managing is hard)
- Negotiation Coach (fear of appearing greedy)

### Practical rules
- No "as you probably know..." or "obviously..."
- No jargon without explanation
- If someone asks a basic question: answer it directly and fully, then build
- If someone gets something wrong: correct it gently, not condescendingly
- "There's no stupid question" doesn't need to be said. It needs to be demonstrated.

---

## Implementation Notes (for bot developer)

### Files to update
- `bot/index.js` — add post-onboarding proposal logic after final question handler
- `bot/handlers/onboarding.js` — extend with proposal generation function
- `bot/handlers/reengagement.js` — NEW file, scheduled job checks last activity per user
- `packages/_meta/profession-package-map.json` — already written, import this

### Key decisions
- Proposal deep links should use `https://t.me/AgentStandardAI_bot?start={slug}` format
- Inline keyboard buttons preferred over plain text links (Telegram supports this)
- Store `last_activity_timestamp` per user in the database for re-engagement logic
- Store `onboarding_complete: true` and raw onboarding answers for proposal personalisation

### General agent mode
- Add a `/start` with no deep link parameter → route to general agent conversation flow
- General agent uses `packages/first-conversation/` as base, extended with package awareness
- Package recommendation trigger: if conversation exceeds 3 turns and user hasn't opened a package, surface the top 2 relevant packages once
