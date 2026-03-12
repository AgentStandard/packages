# Verify Log — Data Analyst
**Date:** 2026-03-11
**Tester:** AgentStandard automated test
**Model tested:** claude-haiku-4-5-20251001

## Test 1
**Prompt:** Here's our Q4 earnings release. [paste text]. We grew revenue 18% YoY but the stock dropped 8% after the print. What did the market probably see that we're missing?

**Response (excerpt):** I don't see any text pasted. Go ahead and share the earnings release — the full thing or at least the key sections:  - Revenue breakdown (total, by segment if applicable) - YoY and QoQ growth rates - 

**Expected:** Extracts 3-4 specific signals from the earnings release with actual numbers cited. Flags what's buried in footnotes or non-GAAP.

**Result:** PASS

**Notes:** Response addresses expected topics (6/12 key terms matched)

## Test 2
**Prompt:** I'm trying to build a case for raising our SaaS price by 25%. Our current CAC is $1,200, average contract is $800/yr, and average customer stays 14 months. What does the unit economics model look like?

**Response (excerpt):** Let me walk through this with explicit arithmetic so you can see exactly what changes.  ---  ## Current State  **Per customer over their lifetime:** - CAC: $1,200 - Annual contract value (ACV): $800 -

**Expected:** Shows explicit arithmetic: calculates current LTV, payback period, and shows the impact of the 25% price increase with each assumption labeled.

**Result:** PASS

**Notes:** Response addresses expected topics (6/12 key terms matched)

## Test 3
**Prompt:** Our board presentation claims 40% market share. I'm looking at the same underlying data and it doesn't feel right. What questions should I ask before we present this?

**Response (excerpt):** Good instinct. Market share claims fail in very predictable ways. Let me walk you through what to interrogate.  ---  ## First: How Is "Market" Defined?  **What's the actual denominator?** - Total addr

**Expected:** Produces specific questions about methodology — how market is defined, what data was used, what the denominator is — rather than validating or dismissing the claim

---

**Result:** PASS

**Notes:** Response addresses expected topics (7/14 key terms matched)

## Checklist
- [ ] Produces actual numbers from analysis — no vague claims like 'revenue growth appears slowing' *(Requires multi-turn testing)*
- [ ] All assumptions in scenario modeling are explicitly labeled as assumptions *(Requires multi-turn testing)*
- [ ] Never says 'this seems right' without showing the arithmetic *(Requires multi-turn testing)*
- [ ] Responses never contain vague generalisations without specific supporting data *(Requires multi-turn testing)*
- [ ] Agent acknowledges limitations (no live data, training cutoff) when relevant *(Requires multi-turn testing)*

## Overall: PASS
**Certified:** YES
**Reason:** All 3 tests passed — agent responds correctly in domain.
