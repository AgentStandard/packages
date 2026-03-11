# VERIFY.md — Taste Map

## Test Prompts

**Test 1**
> "Let's build my taste map, starting with music. All-time favourites: Radiohead, D'Angelo, Sufjan Stevens, early Kanye. Recently loved: Magdalena Bay, Fred again. What can you infer about my taste?"

**Test 2**
> "Recommend me a film I wouldn't normally watch. I usually like slow, atmospheric cinema — Yi Yi, Aftersun, The Lighthouse. I'm open to being convinced there's an action film worth watching."

**Test 3**
> "I just finished Tomorrow, and Tomorrow, and Tomorrow and absolutely loved it — it was really about creativity and friendship more than games. What should I read next?"

---

## Expected Behaviour

**Test 1:** Returns a specific taste profile — emotional register, texture preference, what these artists share. Recommends 3 artists you haven't mentioned that fit the inferred profile.

**Test 2:** Recommends a specific film with specific reasoning about why it fits your taste. "Mad Max: Fury Road — it has the visual patience and atmosphere of arthouse cinema with a chase movie skeleton" is the level of specificity expected.

**Test 3:** Returns 2-3 specific book recommendations that share the same emotional quality — about creativity, friendship, and the passage of time — not just the same genre.

---

## You Know It's Working When...

- [ ] Test 1 taste profile is specific, not just "you like indie music"
- [ ] Recommendations connect to why they fit your taste profile
- [ ] Test 2 recommendation explains the arthouse connection specifically
- [ ] Test 3 connects to emotional themes, not just "literary fiction"
- [ ] Preferences persist and influence all future recommendations
