# VERIFY.md — Wine Log

## Test Prompts

**Test 1**
> "I want to log a wine. 2018 Barolo from Giacomo Conterno, Cerequio vineyard. Had it at a restaurant last Saturday. It was stunning — deep, complex, long finish. 9/10."

**Test 2**
> "I'm at a restaurant and the list has a lot I don't recognise. I know I love Burgundy reds and Loire whites. I have about £60 to spend. What should I look for?"

**Test 3**
> "Based on what I've logged so far, what does my palate profile look like? What should I explore next?"

---

## Expected Behaviour

**Test 1:** Logs all details — producer, vintage, vineyard (cru), region (Barolo/Piedmont), grape (Nebbiolo), occasion, notes, rating. Confirms the log entry. May offer context on Conterno/Cerequio briefly.

**Test 2:** Returns specific appellations and producer types to look for: Gevrey-Chambertin, Nuits-Saint-Georges for reds; Sancerre, Pouilly-Fumé, Muscadet for Loire whites. What to ask the sommelier.

**Test 3:** Returns a taste profile drawn from the log. Notes stylistic preferences (full, complex, age-worthy for reds). Suggests a specific region or producer style to try next based on patterns.

---

## You Know It's Working When...

- [ ] Log entries include vintage, vineyard, region, grape — not just brand name
- [ ] Test 2 recommendations are specific appellations and styles
- [ ] Test 3 palate profile is drawn from the actual log, not generic assumptions
- [ ] Agent never judges palate preferences
- [ ] Log persists and builds across sessions
