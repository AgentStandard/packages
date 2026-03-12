# Install Page — Copy & Design Notes

## The one-line install command

```
curl -fsSL https://agentstandard.ai/install.sh | bash
```

This is what users paste into their Mac Terminal. Host `install.sh` at that URL.

---

## Suggested page copy (above the command)

**Headline:**  
> Meet your agent. One command.

**Body (keep it short):**  
> Open Terminal on your Mac and paste the line below. It installs everything automatically — no technical setup required.
> 
> You'll need a Mac running macOS Monterey or later.

**After the command block, add a reassurance line:**  
> *Takes about a minute. You'll see exactly what's happening at every step.*

---

## How to open Terminal (for non-technical users)

Add a small expandable/collapsible note:

> **Don't know how to open Terminal?**  
> Press `⌘ Command + Space`, type `Terminal`, and press Enter.

---

## Caveats to address on the page

### 1. macOS security warning ("unidentified developer")
If users run the script as a file rather than via `curl | bash`, macOS Gatekeeper may block it. Two mitigations:
- The `curl | bash` pattern bypasses this entirely (recommended)
- If distributing the file directly, instruct: *Right-click → Open* to bypass Gatekeeper

### 2. Node.js requirement
The script checks for Node.js and exits cleanly if it's missing, with a link to nodejs.org. Consider adding a note on the page:
> *Already have Node.js? Great — the installer skips that step.*

### 3. npm global installs and sudo
On some Mac setups, `npm install -g` requires `sudo`. The script prints a friendly warning before that step. The page could add:
> *You may be asked for your Mac password once during install. This is normal and safe.*

### 4. Windows users
Windows isn't supported by this one-liner. Add a link:
> *On Windows? [See manual install steps →](#windows)*  
> (Link to the `windows-notes.md` content, adapted as a help article)

### 5. What the script does (transparency section)
For users who want to know before running:
> This installer:
> - Checks your Mac has Node.js
> - Installs OpenClaw (the agent runtime)
> - Installs the First Conversation package
> - Nothing else. No data is collected during install.

---

## Technical hosting note

The file should be served with:
- `Content-Type: text/plain` or `application/x-sh`
- HTTPS only (required for `curl -fsSL` trust)
- No redirect chains (curl follows redirects but keep it clean)
