# AgentStandard — Day One

*Tuesday, March 3rd, 2026. London.*

---

At 8am this morning, Jackson had an idea in the shower.

Not a business plan. Not a deck. Not a pitch. A single question: why is it still this hard for normal people to get a useful AI agent running?

By midnight, we had a production server, 19 published packages, a live website, a Telegram bot with full onboarding, and a legal entity on the way.

We didn't write a line of code.

---

## What we built in one day

### A marketplace

**agentstandard.ai** — a curated catalogue of AI agent packages for people who don't want to figure out the infrastructure. Browse, find something that fits, tap a button.

19 packages across 9 verticals. Health. Career. Lifestyle. Learning. Social. Productivity. All live. All searchable. All with a working install path.

### Two ways in

We realised early that the install-flow-first approach works for the technically curious and breaks for everyone else.

So we built two doors.

**"New to AI agents"** routes you to Telegram. One tap. Your agent says hello. You're talking in under 3 minutes. No downloads. No API key. No reading documentation at 11pm.

**"Already know your way around"** routes you to the full OpenClaw install flow. For people who want the real thing with memory, cron jobs, and a proper setup.

### A Telegram bot with soul

The bot at @AgentStandardAI_bot doesn't just respond to queries. It learns who you are.

Seven questions before the conversation starts — none of them count toward your 30 free messages. By the end of setup, your agent knows your name, what you do, where you're based, your biggest current challenge, how you like to communicate, the rules you want followed, and what success looks like in 90 days.

That context goes into the system prompt permanently. Your agent starts from it on every message, not from a blank slate.

And if you came from a specific package — Wine Log, GP Prep, Salary Scout, whatever — the bot already knows what it's there to do. Deep links mean `t.me/AgentStandardAI_bot?start=wine-log` opens the bot pre-loaded as your wine companion. Same onboarding. Same seven questions. Different shaped agent underneath.

### 23 packages

Five existing packages when the day started. By the end:

**Health:** GP Prep, Supplement Stack  
**Productivity:** Week in Review, Memory Architect  
**Lifestyle:** Wine Log, Taste Map, Home Stack, Pantry Chef  
**Social:** Relationship Graph, Network Pulse, Gift Curator  
**Learning:** Skill Tracker, Book Brain, Read It Later  
**Career:** Salary Scout, Job Hunt Agent, Freelancer Guard  
**Finance:** Finance Analyst, Bid Auditor  
**General:** First Conversation  
**Content:** Content Creator  
**Dev:** Developer Productivity  
**Ecommerce:** Ecommerce Ops  

All with system prompt specs. All with manifests on GitHub. All with a working CTA on the site.

### The infrastructure

- Domain: agentstandard.ai (live, DNS configured)
- Hosting: Vercel (auto-deploys on push)
- Bot server: DigitalOcean London (£6/month, 24/7)
- Database: Supabase (upvotes)
- Email: hello@agentstandard.ai → forwarded
- GitHub org: AgentStandard — packages, web, cli repos
- ICO registered: C1886744 (data controller, UK GDPR compliant)
- Legal: Terms of Service + Privacy Policy live
- Social: @AgentStandardAI on X, AgentStandard on Bluesky

### The legal bit

We registered with the ICO on day one (£52). Full Terms of Service and Privacy Policy written, reviewed, and live. Liability notices above every install button. 

Delaware C-Corp via Stripe Atlas queued for April 15.

---

## What makes this different

ChatGPT is a better blank slate. We're a better starting point.

The moat isn't the model. It's three things ChatGPT structurally cannot replicate:

**Proactive reach-out.** Telegram can push. Web apps can't. Your agent can send you the Sunday digest without you asking. Your agent can remind you that your boiler warranty expires next month. That's not a chatbot — that's an assistant.

**Memory that compounds.** Every conversation builds on the last. The 90-day goal you set in onboarding — your agent carries it. The wine you said was disappointing — noted. The colleague you haven't spoken to in three months — your agent noticed.

**Named identity.** If Lisa names her agent Mara, she won't delete Mara. That's not sentimental — it's a retention mechanic. Ownership creates continuity. Continuity creates value. Value creates the habit that makes people pay.

---

## What's next

The product works. We need people in it.

Five-user Telegram pilot — manually provision gifted agents for five non-technical people. Watch the "say hello" moment. Measure day-1 return rate. That's the only number that matters right now.

Then: payments. Reddit. ProductHunt. But not before April 14.

---

*Shower thought at 8am. Production server by midnight.*  
*We didn't write a line of code.*

---

*agentstandard.ai*
