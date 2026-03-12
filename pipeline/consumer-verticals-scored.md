# AgentStandard — Consumer Verticals: Reframe & Score
*Scout Package Discovery Report — 2026-03-03*

---

## The Reframe

The previous 30 enterprise verticals were pitched at organisations. The right frame is **individual operators** — real people with a specific, felt pain who would install something tonight. Below, the top 10 consumer reframes are scored.

---

## Top 10 Consumer Package Scores

| # | Package Name | Consumer Use Case (reframe from enterprise) | Consumer TAM | Install Urgency | Build Complexity | Retention | Lisa Test |
|---|---|---|---|---|---|---|---|
| 1 | **Job Hunt Agent** | Job seeker managing applications, follow-ups, tailoring CVs, and tracking responses — replacing endless spreadsheets | Mass market | Urgent | Existing ClawHub skills (web search + file ops) | High stickiness | Yes |
| 2 | **Personal Finance Watcher** | Individual investor tracking their own portfolio, screening stocks/ETFs, getting plain-English summaries without paying for Bloomberg | Large | High | Existing ClawHub skills (financial-data skill + web search) | High stickiness | Maybe |
| 3 | **Freelancer Contract Guard** | Freelancer or gig worker who needs to review contracts, SOWs, and NDAs before signing — flags gotchas in plain English | Large | Urgent | System prompt + web search (PDF read via MCP ideal but not required) | Moderate | Yes |
| 4 | **Travel Planner Pro** | Individual planning a trip who wants itineraries, accommodation options, visa requirements, and real-time price checks in one place | Mass market | High | Existing ClawHub skills (web search + browser) | Moderate | Yes |
| 5 | **Health Symptom Navigator** | Person trying to understand a diagnosis, medication side-effects, or test results before/after a GP appointment — not a doctor, a research partner | Mass market | Urgent | System prompt + web search | Moderate | Yes |
| 6 | **Creator Revenue Tracker** | YouTuber, Substacker, or podcaster who wants to track sponsorship deals, invoice status, audience growth, and upcoming deadlines | Medium | High | Existing ClawHub skills (web search + file ops) | High stickiness | Yes |
| 7 | **Rental & Landlord Watchdog** | Tenant (or small landlord) who wants help understanding lease terms, tenant rights by jurisdiction, maintenance request tracking, and dispute templates | Large | High | System prompt + web search (jurisdiction lookup) | Moderate | Yes |
| 8 | **Side Hustle Ops** | Solo operator running a side business (Etsy, eBay, Shopify) who wants an agent to monitor listings, draft customer replies, track margins, and flag restocking needs | Medium | High | Existing ClawHub skills + browser automation | High stickiness | Maybe |
| 9 | **Academic Research Buddy** | Student or self-directed learner who wants an agent to find papers, summarise literature, track citations, and help structure arguments | Large | High | System prompt + web search + web fetch | High stickiness | Yes |
| 10 | **Event & Life Admin Agent** | Person managing a major life event (wedding, relocation, home purchase) who needs checklists, vendor tracking, deadline reminders, and budget monitoring | Large | Medium | System prompt + web search + calendar MCP | High stickiness | Yes |

---

## Package Detail Cards

### 1. Job Hunt Agent
**What it does for the individual:** Manages the full job search loop — tracks applications in a structured log, tailors CVs and cover letters to specific JDs, drafts follow-up emails, and surfaces new relevant postings daily.
**Skills/tools needed:** Web search (job boards), file read/write (CV storage), email draft generation.
**Build now or needs code?** Buildable now — system prompt + web search + file ops. A lightweight job-tracker MCP would elevate it but isn't required for v1.

---

### 2. Personal Finance Watcher
**What it does for the individual:** Pulls live prices, portfolio performance, and macro headlines, then delivers a plain-English morning summary — the Bloomberg terminal experience for someone who doesn't have one.
**Skills/tools needed:** financial-data ClawHub skill (FRED, Yahoo Finance), web search for news.
**Build now or needs code?** Buildable now with existing financial-data skill. Bank account integration would need new MCP.

---

### 3. Freelancer Contract Guard
**What it does for the individual:** Reads a contract or SOW, identifies risky clauses (IP assignment, non-compete, payment terms, liability caps), and gives the freelancer a clear "sign / negotiate / walk" verdict with suggested redlines.
**Skills/tools needed:** System prompt (legal reasoning layer), web fetch for jurisdiction context, PDF read (MCP ideal).
**Build now or needs code?** Buildable now via system prompt + text paste flow. PDF MCP would make the UX seamless.

---

### 4. Travel Planner Pro
**What it does for the individual:** Takes a destination, dates, and budget and returns a full itinerary with accommodation options, visa requirements, packing list, local tips, and real-time price checks — all in one thread.
**Skills/tools needed:** Web search, browser (price lookups), web fetch.
**Build now or needs code?** Buildable now — system prompt + web search + browser. Flight booking API integration optional for v2.

---

### 5. Health Symptom Navigator
**What it does for the individual:** Acts as a research partner before or after a GP visit — explains diagnoses in plain English, summarises medication interactions, pulls relevant clinical guidelines, and helps the user prepare questions for their doctor.
**Skills/tools needed:** Web search, web fetch (NHS/Mayo/PubMed), system prompt with clear "not a doctor" guardrails.
**Build now or needs code?** Buildable now. Requires careful prompt engineering for safety rails but no new code.

---

### 6. Creator Revenue Tracker
**What it does for the individual:** Tracks sponsorship deals and invoice status, monitors subscriber/view growth across platforms, flags upcoming content deadlines, and drafts sponsor outreach emails.
**Skills/tools needed:** Web search, file ops (deal log), email draft, browser (platform stats).
**Build now or needs code?** Mostly buildable now. Platform API integrations (YouTube Analytics, Substack) would require MCP for v2.

---

### 7. Rental & Landlord Watchdog
**What it does for the individual:** Reads lease agreements, explains tenant rights for their specific jurisdiction, tracks maintenance requests with timestamps, and generates formal complaint letters or deposit dispute templates.
**Skills/tools needed:** Web search (jurisdiction-specific law), web fetch, system prompt (legal reasoning), file ops.
**Build now or needs code?** Buildable now — system prompt + web search covers 90% of value. Jurisdiction auto-detection from IP is a nice v2 add.

---

### 8. Side Hustle Ops
**What it does for the individual:** Monitors marketplace listings (pricing, views, conversions), drafts customer reply templates, tracks margins and costs, and flags when inventory needs restocking or a listing needs refreshing.
**Skills/tools needed:** Browser automation (marketplace scraping), file ops, web search.
**Build now or needs code?** Needs browser automation for full value. System prompt + manual data paste works for v1; marketplace API MCPs needed for v2.

---

### 9. Academic Research Buddy
**What it does for the individual:** Given a research question or essay topic, finds relevant papers, summarises key arguments and methodology, tracks citation chains, and helps the user structure their own argument or literature review.
**Skills/tools needed:** Web search, web fetch (PubMed, Google Scholar, arXiv), file ops (reading list), system prompt.
**Build now or needs code?** Buildable now — system prompt + web search + web fetch. Zotero/Notion integration optional for power users.

---

### 10. Event & Life Admin Agent
**What it does for the individual:** Given a major life event (wedding, house move, new baby), generates a master checklist, tracks vendor contacts and bookings, monitors budget vs actuals, and sends deadline reminders.
**Skills/tools needed:** System prompt (event-specific templates), file ops (tracker), calendar MCP (reminders), web search (vendor research).
**Build now or needs code?** Core is buildable now. Calendar integration needs MCP; worth prioritising for stickiness.

---

## Build-First Recommendation

**Build these three first: Job Hunt Agent (#1), Freelancer Contract Guard (#3), and Personal Finance Watcher (#2).**

The reasoning is simple: all three have *urgent* or *high* install urgency, pass the Lisa test, and address problems people feel acutely right now — not someday. The Job Hunt Agent has the broadest mass-market appeal (anyone between jobs, and there are always millions of them), requires no new code to ship v1, and has high natural stickiness because users return daily as their search evolves. The Freelancer Contract Guard solves a genuinely stressful, high-stakes problem for a fast-growing segment (150M+ gig workers globally) and is buildable today with a system prompt — low complexity, high perceived value, and a clear "I wish I had this before I signed that client" moment. The Personal Finance Watcher rounds out the trio because the financial-data ClawHub skill already exists, making it near-zero build cost, and the TAM is enormous — anyone with a brokerage account who isn't paying $2,500/year for a Bloomberg terminal. Together, these three cover the three most universal individual operator anxieties: **career, money, and legal** — and each can go from system prompt to shipped package in a week or less.
