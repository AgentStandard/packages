# Windows — Manual Install Steps

Windows doesn't support `curl | bash` the same way Macs do, so the one-liner won't work here. These are the equivalent manual steps.

---

## Requirements

- **Windows 10 or 11**
- **Node.js** (LTS version) — download from [https://nodejs.org](https://nodejs.org)
- **PowerShell** or **Windows Terminal** (both work)

---

## Steps

### 1. Install Node.js

1. Go to [https://nodejs.org](https://nodejs.org)
2. Download the **LTS** installer (the one labelled "Recommended For Most Users")
3. Run the installer — accept all defaults
4. When it's done, open a new PowerShell window and confirm it worked:
   ```
   node --version
   ```
   You should see something like `v20.11.0`.

---

### 2. Install OpenClaw

In PowerShell (run as Administrator if you hit permission errors):

```powershell
npm install -g openclaw
```

> **If you get a permissions error:** Right-click PowerShell in the Start Menu and choose "Run as Administrator", then try again.

Confirm it worked:
```powershell
openclaw --version
```

---

### 3. Install the First Conversation package

```powershell
clawhub install first-conversation
```

---

### 4. Start your agent

Open a new terminal window and run:

```powershell
openclaw start
```

Your agent is ready.

---

## Notes for the future Windows installer

When we build a proper Windows installer, options to consider:

| Option | Pros | Cons |
|---|---|---|
| `.exe` installer (NSIS/Inno Setup) | Familiar UX, handles Node install | Complex to build and sign |
| PowerShell script (`.ps1`) | Native, no dependencies | Execution policy warnings |
| `winget` package | Clean, modern | Requires package submission |
| Batch `.bat` wrapper | Simple | No error handling, ugly |

**Recommended MVP path:** A PowerShell script that mirrors the Mac `install.sh` logic, with a note to right-click → "Run with PowerShell". Sign the script eventually to avoid SmartScreen warnings.

**One-liner equivalent for Windows (future):**
```powershell
irm https://agentstandard.ai/install.ps1 | iex
```
(`irm` = `Invoke-RestMethod`, `iex` = `Invoke-Expression` — the PowerShell equivalent of `curl | bash`)

> ⚠️ Note: `irm | iex` has the same security considerations as `curl | bash` — it executes remote code directly. Fine for trusted installs, but document it clearly.
