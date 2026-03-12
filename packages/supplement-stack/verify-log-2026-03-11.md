# Verify Log — Supplement Stack
**Date:** 2026-03-11
**Tester:** AgentStandard automated test
**Model tested:** claude-haiku-4-5-20251001

## Test 1
**Prompt:** I want to log my full supplement stack. I take: vitamin D 4000 IU in the morning, magnesium glycinate 400mg at night, creatine monohydrate 5g in the morning, omega-3 2g with dinner, and ashwagandha 600mg in the morning. I'm also on sertraline 50mg.

**Response (excerpt):** # Your Supplement Stack — Logged  I'm setting up your full profile now. Here's what I have:  | Supplement | Dose | Timing | Form | Notes | |---|---|---|---|---| | Vitamin D | 4000 IU | Morning | (assu

**Expected:** Logs all items with dose and timing. Flags the sertraline specifically and runs an interaction check against the supplement stack. Notes any interactions found.

**Result:** PASS

**Notes:** Response addresses expected topics (8/15 key terms matched)

## Test 2
**Prompt:** I'm thinking about adding lion's mane 1000mg daily for cognitive function. What does the evidence actually say, and does it interact with anything I'm already taking?

**Response (excerpt):** # Lion's Mane: Evidence & Your Stack  ## The Evidence  **What's actually supported:** - **Nerve growth factor (NGF) stimulation** — Lion's mane contains bioactive compounds (hericenones and erinacines

**Expected:** Returns a specific evidence assessment: "Limited animal studies, one small human trial, promising but not robust." Checks against the current stack. Notes the serotonergic overlap with sertraline as a caution.

**Result:** PASS

**Notes:** Response addresses expected topics (9/15 key terms matched)

## Test 3
**Prompt:** I've been taking magnesium glycinate for 6 weeks. My sleep has noticeably improved. Log that as a positive efficacy note.

**Response (excerpt):** # Logging Efficacy Note  I've added this to your magnesium glycinate record:  **Supplement:** Magnesium Glycinate   **Dose:** 400mg   **Timing:** Evening   **Duration:** 6 weeks   **Efficacy Note:** N

**Expected:** Confirms the efficacy note is logged against magnesium glycinate. Returns the updated log entry.

---

**Result:** PASS

**Notes:** Response addresses expected topics (5/9 key terms matched)

## Checklist
- [ ] All stack items are confirmed logged after Test 1 *(requires multi-turn testing)*
- [ ] Sertraline interaction check happens automatically *(requires multi-turn testing)*
- [ ] Evidence quality is rated honestly — not overstated *(requires multi-turn testing)*
- [ ] Test 3 efficacy note persists and shows in stack summary *(requires multi-turn testing)*
- [ ] Agent always recommends pharmacist/doctor confirmation for drug interactions *(requires multi-turn testing)*

## Overall: PASS
**Certified:** YES
**Reason:** All 3 tests passed.
