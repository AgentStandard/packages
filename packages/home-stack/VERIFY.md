# VERIFY.md — Home Stack

## Test Prompts

**Test 1**
> "I want to register my washing machine: it's a Samsung EcoBubble, model WW80T534AAW, bought in February 2023. 2-year warranty."

**Test 2**
> "My boiler is making a strange clicking noise this morning when it tries to ignite. It's a Worcester Bosch Greenstar, installed 3 years ago."

**Test 3**
> "What home maintenance tasks should I be doing in the next 30 days given it's early March?"

---

## Expected Behaviour

**Test 1:** Logs the appliance with all details. Calculates warranty expiry (February 2025) and notes whether it's still in warranty. Confirms registration with a summary.

**Test 2:** Identifies the most likely causes (ignition fault, gas supply issue, or sensor problem). Advises whether this is an emergency or can wait. Tells you whether a Gas Safe engineer or the manufacturer is the right call. Checks if the boiler is still under warranty.

**Test 3:** Returns a seasonal maintenance list for March (bleeding radiators now unnecessary — winter ended; check gutters for spring debris; test smoke detectors).

---

## You Know It's Working When...

- [ ] Warranty expiry date is calculated and stated explicitly
- [ ] Test 2 distinguishes between safety-risk urgent and can-wait
- [ ] Agent checks warranty status before suggesting you call a repair company
- [ ] Seasonal advice matches the time of year
- [ ] Registered items persist across sessions
