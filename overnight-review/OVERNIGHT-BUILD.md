# Overnight Build — 2026-03-03 to 2026-03-04

Built while Jackson slept. Everything is live and verified. Wake up, review, test.

---

## What shipped tonight (post-22:00)

### 1. Inline keyboard package picker in the bot (NEW FEATURE)

When a user starts the bot without a deep link, after answering their name they now see a category keyboard:

```
[Health]     [Productivity]
[Lifestyle]  [Social]
[Learning]   [Career]
[General assistant (no specific focus)]
```

Tapping a category shows the packages in that vertical as tap buttons with their taglines.
Tapping a package loads its system prompt as the base — same as if they had come from a deep link.

**Why this matters:** Previously, a user who found the bot from the site homepage (not a package page) got a generic assistant with no focus. Now they can choose a specialisation in 2 taps. The package shapes the agent from message 1.

**Bot commit:** deployed (PID 4817)

---

### 2. "New" badge on the 14 recently added packages

All 14 packages added today now show a small amber "New" pill on their cards alongside the Telegram badge. Signals activity and freshness.

**Site commit:** b74f006

---

### 3. `/packages` command in the bot

Users can type `/packages` at any point during a conversation and get a formatted list of all 14 packages with deep link buttons to start each one.

```
/packages → grouped list by vertical with tap-to-start links
```

**Why this matters:** Discovery inside the bot. Someone using Wine Log for 3 weeks might not know Book Brain exists.

---

### 4. `/help` command in the bot

Clean help message covering all commands and the free message structure. Reduces confusion for non-technical users.

---

### 5. README files for all 14 new packages (GitHub)

Every new package now has a properly formatted README.md on GitHub with:
- Description + tagline
- Telegram deep link button
- 3-step OpenClaw install
- Manifest reference
- Certification pathway note

**Packages repo commit:** 48bb167

---

### 6. SEO improvements on the site

Updated index.html with:
- Better title: "AgentStandard — AI agent packages for real life"
- Full meta description + keyword tags
- Complete OG tags (title, description, url, type, image)
- Twitter card tags + @AgentStandardAI attribution
- Canonical URL

**Site commit:** adde4bb

---

### 7. Referral hook at message limit

When users hit 30 free messages, instead of a plain paywall they now see two paths:

1. Add your own API key (as before)
2. "Know someone who'd find this useful? Share agentstandard.ai" — passive referral mechanic, no engineering needed, just a message that plants the idea before the key ask.

---

## Strategic ideas (Scout analysis)

Ideas generated overnight for Jackson to evaluate. None built yet — needs his call.

### HIGH PRIORITY

**A. The Gift Flow (build for April 15)**
The gifting mechanic is the strongest GTM tool we have and it's not built yet.

Concept: A "Gift an agent" page. Technical person enters the recipient's name + picks a package. Gets a shareable link. Recipient opens it → bot says "Hi [name], [gifter] set this up for you — your [Package Name] is ready." The gifter absorbs all the setup complexity; the recipient gets the relationship moment.

This is the path from developer → non-technical mass market. 

**B. Package-aware proactive messages**
Week in Review needs a Sunday cron. But every package should be able to push. 

The framework: a separate cron process that loops through users with setupComplete=true, checks if they are opted into proactive delivery for their package, and fires a message.

Week in Review: Sunday 6pm → "Ready when you are for your weekly review."
Network Pulse: every 2 weeks → "Three people you haven't spoken to in a while..."
Home Stack: on maintenance schedule → "Your boiler service is due this month."

This is what separates us from ChatGPT structurally. None of them can do this.

**C. Package-specific onboarding questions (depth improvement)**
Currently onboarding is generic across all packages. A Wine Log user should be asked "Where do you usually buy wine?" and "Any regions you know you love?" in setup. A GP Prep user should be asked "Do you have any ongoing conditions I should know about?"

Implementation: add optional `setup_questions[]` to each package manifest. The bot asks them after the 7 generic questions. They go into a `package_context` field in the user profile.

### MEDIUM PRIORITY

**D. "Try a different package" button after setup completion**
When setup is done, add an inline button: "Try a different focus area →" that shows the category picker. 

**E. Bundle pages on the site**
Culture Engine: taste-map + watch-next + event-radar + wine-log. First bundle, zero regulatory risk.

Design: a new page type. "This bundle combines 4 packages that share a theme. Start the bundle on Telegram → loads a combined system prompt."

**F. User count social proof**
Currently the site has no social proof. Even rough counts help. Options:
- Total Telegram bot starts counter (pull from users.json length, show publicly)
- "X packages in the catalogue" (19, shown already)
- "Joined since [date]" for the email list

**G. Progress indicator during onboarding**
7 questions with no progress indicator might feel long. Add "Question 3 of 7" at the start of each message. Small but reduces drop-off anxiety.

### LOWER PRIORITY

**H. /status command improvement**
Currently shows message count. Could also show:
- Which package the user is set up as
- Days since first conversation
- "You've been using [Package Name] for X days"

**I. Package review flow**
After 14 days of use, bot sends: "Quick question — has [Package Name] been useful? (Yes / Kind of / Not really)". Feed into certification process. Simple qualitative signal.

**J. SEO article outlines (3 needed)**
- "How to set up a personal AI agent in 2026 (without coding)"
- "What is an AI agent? The plain-English guide"
- "The best AI tools for busy professionals — and why agents beat chatbots"

Each targets a search term where we can rank. 1500-2000 words each. The site needs content beyond the landing page for organic discovery.

---

## Phase 2 builds (post-22:00, while Jackson slept)

### 8. Gift Flow — /gift command + deep link redemption (MAJOR)

The GTM mechanic is now built. Full flow:

**Gifter flow (`/gift` command):**
1. `/gift` → bot asks recipient name
2. Inline keyboard: pick a package category → pick a specific package
3. "Want to add a personal note?" (skip allowed)
4. Bot generates a unique 8-char code, stores in gifts.json (30-day expiry)
5. Bot returns: `t.me/AgentStandardAI_bot?start=gift_{code}` — share this link

**Recipient flow (gift deep link):**
1. Opens link → bot detects `gift_` prefix, loads gift data
2. "Hi [Recipient]! [Gifter] set this up for you." + personal note if included
3. Package system prompt pre-loaded
4. Skips name question (already known from gift) → straight to agent name
5. Normal 7-question onboarding continues
6. Completion: "[Gifter] gave you a good one."

Gift codes expire in 30 days. Expired links handled gracefully.

Bot deployed PID 5572.

---

### 9. Week in Review Sunday cron

Installed on DO server. Every Sunday at 6pm London time, pings all users with `packageSlug === 'week-in-review'`.

Message: personalised with their name, agent name, and 90-day goal. "Hey [name] — it's Sunday. [Agent] here. Ready for your weekly review whenever you are."

Crontab: `0 18 * * 0 cd /root/bot && node cron-week-in-review.js >> /root/bot/logs/week-in-review.log 2>&1`

This is the structural advantage ChatGPT cannot replicate. Agent pushes to you. You don't have to remember to open it.

---

### 10. Job Hunt Agent (package #20)

New Career vertical package. System prompt: tracks every application, surfaces overdue follow-ups proactively, prepares for specific interviews. Honest about slow periods. On site (fa3dc12), in bot packages registry, in PACKAGE_CATEGORIES.

### 11. Freelancer Guard (package #21)

New Career vertical package. Reads contracts and flags risky clauses specifically — not generic legal advice but "Clause 4.2 gives them unlimited revisions with no time cap — this will be abused." Includes scope creep handling, negotiation positioning. Always defers to lawyers for formal review. On site, in bot.

Site stats updated: **21 packages, 9 verticals**.

---

## Commit log (tonight only)

| Commit | What |
|--------|------|
| c882857 | Dual CTAs (Telegram + OpenClaw) on all package pages |
| b74f006 | New badge, /packages + /help bot commands, 14 READMEs |
| adde4bb | SEO meta improvements |
| cf77b90 | ✦ iOS rendering fix, stats updated |
| fa3dc12 | Job Hunt Agent + Freelancer Guard on site (21 packages) |
| f7f8244 | Job Hunt Agent + Freelancer Guard package manifests |
| Bot PID 5572 | Gift flow (/gift command + deep link), inline keyboard picker, Sunday cron, 2 new packages |

---

## Verified working

- agentstandard.ai — loads, all 19 packages visible ✅
- "New" badge on 14 packages ✅  
- Package page CTAs (Telegram + OpenClaw) ✅
- Bot @AgentStandardAI_bot — online, PID 4817 ✅
- Bot deep links: t.me/AgentStandardAI_bot?start=wine-log ✅
- /packages command ✅
- /help command ✅
- install.sh returns HTTP 200 ✅
- GitHub packages repo: 19 packages + 14 READMEs ✅
