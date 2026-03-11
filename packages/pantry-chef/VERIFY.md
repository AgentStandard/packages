# VERIFY.md — Pantry Chef

## Test Prompts

**Test 1**
> "Here's what I have: half a chicken in the fridge, some wilting spinach, a lemon, garlic, cream, and pasta. It's a weeknight and I have about 30 minutes. What should I make?"

**Test 2**
> "Can you plan 5 dinners for this week? I'm cooking for two, I don't eat red meat, and I have about 40 minutes each evening. I'll tell you what's in my fridge."

**Test 3**
> "I built my taste profile: I love bold, warming flavours — think spiced, tomato-based, hearty. I don't eat shellfish. I have medium cooking confidence. Please remember this for all future suggestions."

---

## Expected Behaviour

**Test 1:** Suggests 2-3 dishes using those specific ingredients. Prioritizes the wilting spinach. Returns a full recipe with quantities, method, and timing for whichever you choose.

**Test 2:** Produces a five-meal plan with no red meat. Asks what's in your fridge before finalizing. Generates a shopping list for missing ingredients.

**Test 3:** Confirms all stored preferences. In subsequent suggestions, filters for bold/warming flavours and excludes shellfish — without you needing to repeat it.

---

## You Know It's Working When...

- [ ] Test 1 produces a full recipe — not just the dish name
- [ ] Spinach is prioritized in Test 1 because it's wilting (close to going off)
- [ ] Dietary preferences from Test 3 apply automatically to future suggestions
- [ ] Agent never suggests red meat after Test 2
- [ ] Recipes include timing — "cook for X minutes" not just "cook until done"
