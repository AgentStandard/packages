/**
 * AgentStandard Embed Widget — Frank
 * One script tag. No dependencies. Floating chat bubble.
 *
 * Usage — paste this ONE line into your site's <head> or before </body>:
 *   <script src="https://64.227.34.11:3001/widget.js" data-key="david-001"></script>
 *
 * Or host this file yourself and point src= at it.
 */
(function () {
  'use strict';

  const script  = document.currentScript;
  const API_KEY = script?.getAttribute('data-key') || 'david-001';
  const API_URL = 'https://api.agentstandard.ai/v1/chat';
  function getUserId() {
    let id = localStorage.getItem('frank_uid');
    if (!id) { id = 'v-' + Math.random().toString(36).slice(2, 10); localStorage.setItem('frank_uid', id); }
    return id;
  }
  const USER_ID = getUserId();

  // ── Inject styles ────────────────────────────────────────────────────────
  const css = `
    #__frank_btn {
      position:fixed; bottom:24px; right:24px; width:52px; height:52px;
      border-radius:50%; background:#111; border:none; cursor:pointer;
      display:flex; align-items:center; justify-content:center;
      box-shadow:0 4px 20px rgba(0,0,0,.3); z-index:9998;
    }
    #__frank_btn svg { width:22px; height:22px; fill:none; stroke:#fff; stroke-width:2; stroke-linecap:round; }
    #__frank_panel {
      position:fixed; bottom:88px; right:24px; width:340px; height:480px;
      background:#fff; border-radius:14px; box-shadow:0 8px 40px rgba(0,0,0,.2);
      display:none; flex-direction:column; overflow:hidden; z-index:9999;
      font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
      border:1px solid #e0e0e0;
    }
    #__frank_panel.open { display:flex; }
    #__frank_head {
      padding:13px 16px; background:#111; color:#fff;
      font-size:12px; font-weight:700; letter-spacing:0.06em;
      display:flex; justify-content:space-between; align-items:center;
    }
    #__frank_close { background:none; border:none; color:#fff; cursor:pointer; font-size:16px; }
    #__frank_msgs { flex:1; overflow-y:auto; padding:14px; display:flex; flex-direction:column; gap:10px; background:#fafafa; }
    .fmsg { max-width:84%; padding:9px 13px; border-radius:10px; font-size:13px; line-height:1.5; }
    .fmsg.u { align-self:flex-end; background:#111; color:#fff; }
    .fmsg.a { align-self:flex-start; background:#fff; color:#111; border:1px solid #e0e0e0; }
    #__frank_foot { border-top:1px solid #e0e0e0; display:flex; background:#fff; }
    #__frank_inp { flex:1; border:none; padding:12px 14px; font-size:13px; outline:none; font-family:inherit; background:transparent; }
    #__frank_snd { border:none; padding:12px 16px; background:#111; color:#fff; cursor:pointer; font-size:12px; font-weight:700; }
    #__frank_snd:disabled { opacity:.35; cursor:default; }
  `;
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ── Inject HTML ──────────────────────────────────────────────────────────
  document.body.insertAdjacentHTML('beforeend', `
    <button id="__frank_btn" title="Talk to Frank">
      <svg viewBox="0 0 24 24"><path stroke-linejoin="round"
        d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
    </button>
    <div id="__frank_panel">
      <div id="__frank_head">
        <span>FRANK — CREATIVE CRITIC</span>
        <button id="__frank_close">✕</button>
      </div>
      <div id="__frank_msgs"></div>
      <div id="__frank_foot">
        <input id="__frank_inp" type="text" placeholder="What are you working on?" />
        <button id="__frank_snd">Send</button>
      </div>
    </div>
  `);

  // ── Logic ────────────────────────────────────────────────────────────────
  const panel = document.getElementById('__frank_panel');
  const msgs  = document.getElementById('__frank_msgs');
  const inp   = document.getElementById('__frank_inp');
  const snd   = document.getElementById('__frank_snd');

  document.getElementById('__frank_btn').onclick   = () => panel.classList.toggle('open');
  document.getElementById('__frank_close').onclick = () => panel.classList.remove('open');

  function addMsg(role, text) {
    const el = document.createElement('div');
    el.className = `fmsg ${role === 'user' ? 'u' : 'a'}`;
    el.textContent = text;
    msgs.appendChild(el);
    msgs.scrollTop = msgs.scrollHeight;
    return el;
  }

  async function send() {
    const message = inp.value.trim();
    if (!message) return;
    inp.value = '';
    snd.disabled = true;
    addMsg('user', message);
    const placeholder = addMsg('agent', '...');

    try {
      const res  = await fetch(API_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', 'X-API-Key': API_KEY },
        body:    JSON.stringify({ user_id: USER_ID, message }),
      });
      const data = await res.json();
      placeholder.textContent = data.response || data.error || 'No response.';
    } catch {
      placeholder.textContent = 'Something went wrong. Try again.';
    }

    snd.disabled = false;
    inp.focus();
  }

  snd.onclick = send;
  inp.addEventListener('keydown', e => { if (e.key === 'Enter') send(); });

  // Greet on first open
  let greeted = false;
  document.getElementById('__frank_btn').addEventListener('click', () => {
    if (!greeted && panel.classList.contains('open')) {
      greeted = true;
      addMsg('agent', "What are you working on? Don't soften it.");
    }
  });

})();
