# VERIFY.md — Gift Curator

## Test Prompts

**Test 1**
> "My partner's birthday is in three weeks. She's been getting into trail running lately, she loves coffee, and she's minimalist about most things. Budget around £80. What are your suggestions?"

**Test 2**
> "I want to set up profiles for my mum and my best friend. Let me tell you about each one."

**Test 3**
> "I have a housewarming coming up next weekend for a couple who just moved into their first flat. I don't know them that well — we're work friends. Budget £30."

---

## Expected Behaviour

**Test 1:** Returns 2-3 specific gift suggestions with product names and where to get them. Each includes a specific reason why it fits this person. Offers a backup at a different price point.

**Test 2:** Asks targeted questions about each person — not a form, but natural conversation. Confirms what's been stored at the end.

**Test 3:** Returns an appropriate gift for a casual relationship (not too personal, not too generic) with a specific recommendation and sourcing guidance.

---

## You Know It's Working When...

- [ ] Test 1 suggestions include where to buy — not just "something in trail running"
- [ ] Reasoning for each suggestion connects to what you said about the person
- [ ] Profile building in Test 2 feels like a conversation, not a questionnaire
- [ ] Budget is respected — no suggestions significantly above the stated range
- [ ] Agent tracks what you've stored and references it in future sessions
