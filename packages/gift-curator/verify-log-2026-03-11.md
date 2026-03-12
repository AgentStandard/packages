# Verify Log — Gift Curator
**Date:** 2026-03-11
**Tester:** AgentStandard automated test
**Model tested:** claude-haiku-4-5-20251001

## Test 1
**Prompt:** My partner's birthday is in three weeks. She's been getting into trail running lately, she loves coffee, and she's minimalist about most things. Budget around £80. What are your suggestions?

**Response (excerpt):** # Suggestions for Your Partner's Birthday  Let me sketch what I'm picking up: she values experiences and quality over clutter, she's actively building a new interest (trail running), and she has genui

**Expected:** Returns 2-3 specific gift suggestions with product names and where to get them. Each includes a specific reason why it fits this person. Offers a backup at a different price point.

**Result:** PASS

**Notes:** Response partially addresses expected topics (5/15 key terms matched)

## Test 2
**Prompt:** I want to set up profiles for my mum and my best friend. Let me tell you about each one.

**Response (excerpt):** Perfect. I'm ready to listen and build these out properly.  Let's start with whoever you want to begin with — just tell me about them naturally. I'm interested in:  - What they're actually into (hobbi

**Expected:** Asks targeted questions about each person — not a form, but natural conversation. Confirms what's been stored at the end.

**Result:** FAIL

**Notes:** Response does not address expected topics (2/11 key terms matched). Expected: Asks targeted questions about each person — not a form, but natural conversation. Confirms what's be

## Test 3
**Prompt:** I have a housewarming coming up next weekend for a couple who just moved into their first flat. I don't know them that well — we're work friends. Budget £30.

**Response (excerpt):** Great starting point. With work friends and a modest budget, the strategy is: **something genuinely useful that doesn't presume intimacy**.  The trap here is giving something too personal (makes it aw

**Expected:** Returns an appropriate gift for a casual relationship (not too personal, not too generic) with a specific recommendation and sourcing guidance.

---

**Result:** PASS

**Notes:** Response addresses expected topics (4/10 key terms matched)

## Checklist
- [ ] Test 1 suggestions include where to buy — not just "something in trail running" *(Requires multi-turn testing)*
- [ ] Reasoning for each suggestion connects to what you said about the person *(Requires multi-turn testing)*
- [ ] Profile building in Test 2 feels like a conversation, not a questionnaire *(Requires multi-turn testing)*
- [ ] Budget is respected — no suggestions significantly above the stated range *(Requires multi-turn testing)*
- [ ] Agent tracks what you've stored and references it in future sessions *(Requires multi-turn testing)*

## Overall: PARTIAL
**Certified:** CONDITIONAL
**Reason:** 2 tests passed, 1 failed — agent partially meets expected behaviour.
