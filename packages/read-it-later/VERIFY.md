# VERIFY.md — Read It Later

## Test Prompts

**Test 1**
> "Here's an article I want to save: [paste a URL or article text]. Give me the key ideas and note anything relevant to building a B2B content strategy."

**Test 2**
> "I've been saving articles about remote work and async communication for months. What's in my queue on that topic?"

**Test 3**
> "I'm trying to think through how to price a new product. Do I have anything saved that might be relevant — pricing strategy, value-based pricing, or consumer psychology?"

---

## Expected Behaviour

**Test 1:** Fetches the URL (if accessible), extracts 3-5 key ideas as specific substantive points — not summaries of the intro. Flags if the article is padded. Notes the B2B content relevance if applicable.

**Test 2:** Returns all saved articles on remote work/async topics with their key ideas. Synthesises any patterns across them.

**Test 3:** Searches the queue for pricing-relevant content. If something stored is relevant, surfaces it. If nothing relevant, honestly says the queue doesn't have relevant material.

---

## You Know It's Working When...

- [ ] Key ideas are substantive, not rephrased topic sentences
- [ ] Agent flags padded articles ("The main idea could be expressed in one sentence")
- [ ] Test 3 resurface references specific ideas from specific saved articles
- [ ] Agent never invents content for articles it couldn't access
- [ ] Articles persist across sessions
