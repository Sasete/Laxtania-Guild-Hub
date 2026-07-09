(function() {
  // Inject CSS
  const css = `
  .guild-nav-sticky-wrap {
    position: sticky;
    top: 0;
    z-index: 200;
    padding: 10px 20px 0;
    margin-bottom: 12px;
    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.5));
  }
  .guild-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 980px;
    margin: 0 auto 12px;
    background: rgba(22, 34, 52, 0.97);
    border: 1px solid var(--gold);
    padding: 7px 14px;
    border-radius: 4px;
    gap: 10px;
  }
  .nav-links {
    display: flex;
    gap: 4px;
    align-items: stretch;
    overflow-x: auto;
    flex-wrap: nowrap;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
    min-width: 0;
    flex: 1;
  }
  .nav-links::-webkit-scrollbar { display: none; }
  .nav-group {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex-shrink: 0;
  }
  .nav-grp-label {
    font-size: 8px;
    font-variant: small-caps;
    letter-spacing: 2px;
    color: rgba(200,160,74,0.38);
    line-height: 1;
    padding-left: 3px;
    white-space: nowrap;
  }
  .nav-group-items {
    display: flex;
    gap: 3px;
    align-items: center;
    border: 1px solid rgba(200,160,74,0.12);
    border-radius: 3px;
    padding: 2px 3px;
    background: rgba(0,0,0,0.12);
  }
  .nav-grp-divider {
    width: 1px;
    align-self: stretch;
    background: rgba(200,160,74,0.15);
    margin: 0 2px;
    flex-shrink: 0;
  }
  @media(max-width:600px) { .nav-grp-label { display: none; } .nav-group-items { border: none; background: none; padding: 0; } }
  .nav-item {
    font-family: Georgia, serif;
    font-variant: small-caps;
    font-size: 11px;
    letter-spacing: 0.8px;
    color: rgba(230, 200, 120, 0.75);
    text-decoration: none;
    padding: 5px 8px;
    border: 1px solid rgba(200, 160, 74, 0.4);
    border-radius: 2px;
    transition: all 0.15s;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
    white-space: nowrap;
  }
  .nav-item span.nav-icon {
    font-size: 14px;
    line-height: 1;
  }
  .nav-item span.nav-text {
    line-height: 1;
  }
  .nav-item:hover {
    border-color: var(--gold);
    color: var(--gold-bright);
    background: rgba(255,255,255,0.05);
  }
  .nav-item.active {
    color: var(--gold-bright);
    border-color: var(--gold-bright);
    background: rgba(200, 160, 74, 0.2);
    font-weight: bold;
  }
  .nav-user-container {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-left: auto;
  }
  .nav-sep {
    width: 1px;
    height: 24px;
    background: rgba(200, 160, 74, 0.4);
  }
  @media(max-width: 700px) {
    .guild-nav { flex-wrap: wrap; overflow: visible; }
    .nav-sep { display: none; }
    .nav-user-container { margin-left: 0; flex-shrink: 0; }
  }
  .nav-user {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }
  .nav-user-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .user-bar-name {
    font-family: Georgia, serif;
    font-variant: small-caps;
    letter-spacing: 2px;
    font-size: 13px;
    color: var(--gold-bright);
    font-weight: bold;
  }
  .user-bar-roles {
    display: flex;
    gap: 4px;
    margin-top: 2px;
    flex-wrap: wrap;
  }
  .role-tag {
    font-size: 9px;
    font-variant: small-caps;
    letter-spacing: 1px;
    color: var(--parchment);
    background: rgba(200, 160, 74, 0.2);
    border: 1px solid rgba(200, 160, 74, 0.5);
    padding: 1px 5px;
    border-radius: 2px;
  }
  .user-bar-btn {
    font-family: Georgia, serif; font-variant: small-caps; letter-spacing: 1.5px;
    font-size: 12px; background: transparent; border: 1px solid rgba(200,160,74,0.4);
    color: rgba(230,200,120,0.75); padding: 5px 12px; cursor: pointer;
    transition: all 0.15s; text-decoration: none; display: inline-block;
  }
  .user-bar-btn:hover { border-color: var(--gold); color: var(--gold-bright); }
  .admin-toggle{display:flex;align-items:center;justify-content:center;width:30px;height:30px;cursor:pointer;border:1px solid rgba(140,36,36,0.4);background:rgba(140,36,36,0.08);border-radius:3px;transition:all 0.15s;user-select:none;position:relative;}
  .admin-toggle:hover{background:rgba(140,36,36,0.18);}
  .admin-toggle.active{background:rgba(140,36,36,0.2);border-color:var(--seal-red);}
  .admin-toggle-dot{width:8px;height:8px;border-radius:50%;background:rgba(140,36,36,0.35);transition:all 0.2s;}
  .admin-toggle.active .admin-toggle-dot{background:var(--seal-red);box-shadow:0 0 6px rgba(140,36,36,0.7);}
  .nav-icon-btn{display:flex;align-items:center;justify-content:center;width:30px;height:30px;cursor:pointer;border:1px solid rgba(200,160,74,0.3);background:transparent;border-radius:3px;color:rgba(230,200,120,0.65);font-size:14px;transition:all 0.15s;text-decoration:none;}
  .nav-icon-btn:hover{border-color:var(--gold);color:var(--gold-bright);background:rgba(200,160,74,0.08);}
  .nav-action-group{display:flex;gap:5px;align-items:center;}
  #councilNavLink{display:none !important;}
  #councilNavLink.council-visible{display:flex !important;}
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // Inject HTML
  const placeholder = document.getElementById('navbar-placeholder');
  if (!placeholder) return;
  const page = placeholder.getAttribute('data-page');
  const prefix = placeholder.getAttribute('data-path-prefix') || './';
  
  const navHtml = `
<div class="guild-nav-sticky-wrap">
<nav id="guildNav" class="guild-nav" style="display:none">
  <div class="nav-links">
    <div class="nav-group" id="adminNavGroup" style="display:none">
      <span class="nav-grp-label">Admin</span>
      <div class="nav-group-items">
        <a href="${prefix}council/" id="councilNavLink" class="nav-item ${page === 'council' ? 'active' : ''}">
          <span class="nav-icon">⚜</span><span class="nav-text">Council <span id="councilTaskBadge" style="display:none;background:#8c2424;color:#fff;border-radius:10px;font-size:10px;padding:1px 6px;margin-left:2px;vertical-align:middle"></span><span id="councilFundBadge" style="display:none;background:#2e7d32;color:#fff;border-radius:10px;font-size:10px;padding:1px 6px;margin-left:2px;vertical-align:middle"></span></span>
        </a>
      </div>
    </div>
    <div class="nav-grp-divider" id="adminNavDivider" style="display:none"></div>
    <div class="nav-group">
      <span class="nav-grp-label">Guild</span>
      <div class="nav-group-items">
        <a href="${prefix}" class="nav-item ${page === 'hall' ? 'active' : ''}">
          <span class="nav-icon">🏰</span><span class="nav-text">Hall</span>
        </a>
        <a href="${prefix}prestige/" class="nav-item ${page === 'members' ? 'active' : ''}">
          <span class="nav-icon">👥</span><span class="nav-text">Members</span>
        </a>
        <a href="${prefix}events/" class="nav-item ${page === 'events' ? 'active' : ''}">
          <span class="nav-icon">🗡️</span><span class="nav-text">Events</span>
        </a>
      </div>
    </div>
    <div class="nav-grp-divider"></div>
    <div class="nav-group">
      <span class="nav-grp-label">Economy</span>
      <div class="nav-group-items">
        <a href="${prefix}quest-board/" class="nav-item ${page === 'quests' ? 'active' : ''}">
          <span class="nav-icon">📜</span><span class="nav-text">Quests</span>
        </a>
        <a href="${prefix}market/" class="nav-item ${page === 'market' ? 'active' : ''}">
          <span class="nav-icon">🏪</span><span class="nav-text">Market</span>
        </a>
      </div>
    </div>
    <div class="nav-grp-divider"></div>
    <div class="nav-group">
      <span class="nav-grp-label">Knowledge</span>
      <div class="nav-group-items">
        <a href="${prefix}builds/" class="nav-item ${page === 'builds' ? 'active' : ''}">
          <span class="nav-icon">⚔️</span><span class="nav-text">Loadouts</span>
        </a>
      </div>
    </div>
  </div>
  <div class="nav-user-container">
    <div class="nav-sep"></div>
    <div class="nav-user" id="userBar" style="display:none">
      <div class="nav-user-info">
        <span class="user-bar-name" id="userBarName">—</span>
        <div class="user-bar-roles" id="userBarRoles"></div>
      </div>
      <button id="prestigeTransferBtn" onclick="openPrestigeTransfer()" style="display:none;flex-direction:column;align-items:center;gap:1px;background:none;border:none;cursor:pointer;padding:4px 8px;border-radius:3px;transition:background 0.15s" title="Prestige & Transfer" onmouseover="this.style.background='rgba(200,160,74,0.1)'" onmouseout="this.style.background='none'">
        <span style="font-size:10px;font-variant:small-caps;letter-spacing:1px;color:rgba(230,200,120,0.6)">Laxi</span>
        <span style="display:flex;align-items:baseline;gap:4px">
          <span id="myPrestigeCount" style="font-family:Georgia,serif;font-size:15px;color:var(--gold-bright);font-weight:bold;line-height:1">—</span>
          <span id="myPrestigePending" style="display:none;font-family:Georgia,serif;font-size:10px;font-weight:bold;line-height:1"></span>
        </span>
        <span style="font-size:9px;color:rgba(200,160,74,0.5);letter-spacing:0.5px">⇄ transfer</span>
      </button>
      <div class="nav-action-group">
        <div class="admin-toggle" id="adminToggle" style="display:none" title="Admin Mode" onclick="if(window.toggleAdminMode) window.toggleAdminMode(); else this.classList.toggle('active');">
          <div class="admin-toggle-dot"></div>
        </div>
        <button class="nav-icon-btn" title="Sign Out" onclick="doSignOut()">⏻</button>
      </div>
    </div>
  </div>
</nav>
</div>
  `;

  placeholder.outerHTML = navHtml;

  // Show nav links immediately — user section reveals after auth
  const _navEl = document.getElementById('guildNav');
  if (_navEl) _navEl.style.display = 'flex';

  // ── Footer ──
  const footerStyle = document.createElement('style');
  footerStyle.textContent = `
  .guild-footer{background:rgba(22,34,52,0.97);border-top:1px solid rgba(200,160,74,0.35);margin-top:60px;padding:32px 20px 20px;font-family:Georgia,'Times New Roman',serif;}
  .guild-footer-inner{max-width:980px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr 1fr;gap:32px;}
  .guild-footer-brand{display:flex;flex-direction:column;gap:6px;}
  .guild-footer-name{font-size:18px;font-variant:small-caps;letter-spacing:3px;color:var(--gold-bright,#e6c878);font-weight:bold;}
  .guild-footer-tagline{font-size:11px;font-style:italic;color:rgba(241,228,196,0.45);letter-spacing:1px;}
  .guild-footer-col h4{font-size:10px;font-variant:small-caps;letter-spacing:2.5px;color:rgba(200,160,74,0.5);margin-bottom:10px;border-bottom:1px solid rgba(200,160,74,0.15);padding-bottom:6px;}
  .guild-footer-col a{display:block;font-size:12px;color:rgba(241,228,196,0.55);text-decoration:none;margin-bottom:6px;transition:color 0.15s;letter-spacing:0.5px;}
  .guild-footer-col a:hover{color:var(--gold-bright,#e6c878);}
  .guild-footer-col p{font-size:12px;color:rgba(241,228,196,0.45);line-height:1.7;margin-bottom:4px;}
  .guild-footer-bottom{max-width:980px;margin:24px auto 0;padding-top:12px;border-top:1px solid rgba(200,160,74,0.12);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;}
  .guild-footer-bottom span{font-size:10px;color:rgba(241,228,196,0.3);letter-spacing:0.5px;font-variant:small-caps;}
  @media(max-width:600px){.guild-footer-inner{grid-template-columns:1fr;gap:20px;}.guild-footer-bottom{flex-direction:column;text-align:center;}}
  `;
  document.head.appendChild(footerStyle);

  const footerEl = document.createElement('footer');
  footerEl.className = 'guild-footer';
  footerEl.innerHTML = `
  <div class="guild-footer-inner">
    <div class="guild-footer-brand">
      <span class="guild-footer-name">Laxtania</span>
      <span class="guild-footer-tagline">Albion Online — EU Server</span>
    </div>
    <div class="guild-footer-col">
      <h4>Pages</h4>
      <a href="${prefix}">Hall</a>
      <a href="${prefix}prestige/">Members</a>
      <a href="${prefix}events/">Events</a>
      <a href="${prefix}quest-board/">Quests</a>
      <a href="${prefix}market/">Market</a>
      <a href="${prefix}builds/">Builds</a>
    </div>
    <div class="guild-footer-col">
      <h4>Info</h4>
      <p>Guild market operates on Laxi — the internal prestige currency.</p>
      <p>Builds are curated by Council members.</p>
    </div>
  </div>
  <div class="guild-footer-bottom">
    <span>Laxtania Guild Hub</span>
    <span>For guild members only</span>
  </div>
  `;
  // Prestige Modal (Transfer / Buy / Sell)
  const transferModalHtml = `
<div id="prestigeTransferModal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:2000;align-items:center;justify-content:center">
  <div style="background:#f1e4c4;border-radius:6px;padding:24px;min-width:320px;max-width:440px;width:90%;font-family:Georgia,serif;box-shadow:0 8px 32px rgba(0,0,0,.4)">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
      <h3 style="color:#2e2014;font-size:16px;margin:0">⇄ Laxi</h3>
      <span id="ptMyBalance" style="font-size:12px;color:#5a4632"></span>
    </div>
    <!-- Tabs -->
    <div style="display:flex;gap:0;margin:12px 0;border:1px solid #ddc69a;border-radius:3px;overflow:hidden">
      <button id="ptTab-transfer" onclick="switchPrestigeTab('transfer')" style="flex:1;padding:7px;background:#1c2a40;color:#f1e4c4;border:none;cursor:pointer;font-family:Georgia,serif;font-size:11px;font-variant:small-caps;letter-spacing:1px">Transfer</button>
      <button id="ptTab-buy" onclick="switchPrestigeTab('buy')" style="flex:1;padding:7px;background:transparent;color:#5a4632;border:none;border-left:1px solid #ddc69a;cursor:pointer;font-family:Georgia,serif;font-size:11px;font-variant:small-caps;letter-spacing:1px">Buy</button>
      <button id="ptTab-sell" onclick="switchPrestigeTab('sell')" style="flex:1;padding:7px;background:transparent;color:#5a4632;border:none;border-left:1px solid #ddc69a;cursor:pointer;font-family:Georgia,serif;font-size:11px;font-variant:small-caps;letter-spacing:1px">Sell</button>
    </div>
    <!-- Transfer Panel -->
    <div id="ptPanel-transfer">
      <div style="margin-bottom:12px">
        <label style="font-size:11px;font-variant:small-caps;letter-spacing:1px;color:#5a4632;display:block;margin-bottom:4px">Send To</label>
        <select id="ptRecipient" style="width:100%;padding:8px;border:1px solid #ddc69a;border-radius:3px;font-family:Georgia,serif;font-size:13px;background:white">
          <option value="">— Select —</option>
        </select>
      </div>
      <div style="margin-bottom:12px">
        <div style="margin-bottom:4px">
          <label style="font-size:11px;font-variant:small-caps;letter-spacing:1px;color:#5a4632">Amount (pts)</label>
        </div>
        <input id="ptAmount" type="number" min="1" placeholder="0" oninput="updateTransferAvailable()" style="width:100%;padding:8px;border:1px solid #ddc69a;border-radius:3px;font-family:Georgia,serif;font-size:13px;box-sizing:border-box">
      </div>
      <div style="margin-bottom:16px">
        <label style="font-size:11px;font-variant:small-caps;letter-spacing:1px;color:#5a4632;display:block;margin-bottom:4px">Note (optional)</label>
        <input id="ptNote" type="text" placeholder="Reason for transfer..." style="width:100%;padding:8px;border:1px solid #ddc69a;border-radius:3px;font-family:Georgia,serif;font-size:13px;box-sizing:border-box">
      </div>
      <div id="ptTransferLog" style="margin-bottom:16px;max-height:140px;overflow-y:auto;display:none">
        <div style="font-size:10px;font-variant:small-caps;letter-spacing:1px;color:#5a4632;margin-bottom:6px">Recent Transfers</div>
        <div id="ptLogList"></div>
      </div>
      <div style="display:flex;gap:8px">
        <button id="ptSendBtn" onclick="doPrestigeTransfer()" style="flex:1;padding:9px;background:#1c2a40;color:#f1e4c4;border:none;border-radius:3px;cursor:pointer;font-family:Georgia,serif;font-size:13px;font-variant:small-caps;letter-spacing:1px">Send</button>
        <button onclick="closePrestigeTransfer()" style="padding:9px 18px;background:#5a4632;color:#f1e4c4;border:none;border-radius:3px;cursor:pointer;font-family:Georgia,serif;font-size:13px">Close</button>
      </div>
    </div>
    <!-- Buy Panel -->
    <div id="ptPanel-buy" style="display:none">
      <p style="font-size:12px;color:#5a4632;margin-bottom:10px;line-height:1.5">Buy Laxi from the Guild Treasury at <strong>+10% margin</strong>.<br>Silver will be deducted from your in-game wallet.</p>
      <div style="background:rgba(28,42,64,0.07);border:1px solid rgba(28,42,64,0.18);border-radius:3px;padding:9px 12px;margin-bottom:14px;font-size:12px;color:#2e2014;line-height:1.55">
        ⚠ After submitting, please donate the silver in-game or hand it directly to a councillor before the request is approved.
      </div>
      <div style="margin-bottom:12px">
        <label style="font-size:11px;font-variant:small-caps;letter-spacing:1px;color:#5a4632;display:block;margin-bottom:4px">Laxi Amount</label>
        <input id="ptBuyAmount" type="number" min="1" placeholder="0" oninput="updateBuyPreview()" style="width:100%;padding:8px;border:1px solid #ddc69a;border-radius:3px;font-family:Georgia,serif;font-size:13px;box-sizing:border-box">
      </div>
      <div id="ptBuyPreview" style="background:rgba(200,160,74,.1);border:1px solid rgba(200,160,74,.4);border-radius:3px;padding:10px 12px;margin-bottom:16px;font-size:12px;color:#5a4632;display:none">
        <div style="display:flex;justify-content:space-between"><span>Rate (×1.1)</span><span id="ptBuyRate">—</span></div>
        <div style="display:flex;justify-content:space-between;font-weight:bold;margin-top:6px;font-size:13px;color:#2e2014"><span>You pay</span><span id="ptBuyCost">—</span></div>
      </div>
      <div id="ptBuyPendingWrap" style="display:none;margin-bottom:12px">
        <div style="background:rgba(200,160,74,.12);border:1px solid rgba(200,160,74,.5);border-radius:3px;padding:8px 12px;font-size:12px;color:#5a4632;display:flex;justify-content:space-between;align-items:center">
          <span id="ptBuyPendingLabel">⏳ Purchase pending…</span>
          <button onclick="cancelPendingLaxiTask('buy')" style="background:rgba(140,36,36,0.1);border:1px solid rgba(140,36,36,0.4);color:#8c2424;border-radius:3px;padding:3px 10px;font-family:Georgia,serif;font-size:11px;cursor:pointer">Cancel</button>
        </div>
      </div>
      <div style="display:flex;gap:8px">
        <button id="ptBuyBtn" onclick="doPrestigeBuy()" style="flex:1;padding:9px;background:#2a5a2a;color:#f1e4c4;border:none;border-radius:3px;cursor:pointer;font-family:Georgia,serif;font-size:13px;font-variant:small-caps;letter-spacing:1px">Request Purchase</button>
        <button onclick="closePrestigeTransfer()" style="padding:9px 18px;background:#5a4632;color:#f1e4c4;border:none;border-radius:3px;cursor:pointer;font-family:Georgia,serif;font-size:13px">Close</button>
      </div>
    </div>
    <!-- Sell Panel -->
    <div id="ptPanel-sell" style="display:none">
      <p id="ptSellMarginDesc" style="font-size:12px;color:#5a4632;margin-bottom:10px;line-height:1.5">Sell Laxi back to the Guild Treasury at <strong>-10% margin</strong>.<br>Silver will be paid to your in-game wallet.</p>
      <div id="ptCrisisWarning" style="display:none;background:rgba(140,36,36,0.08);border:1px solid rgba(140,36,36,0.35);border-radius:3px;padding:9px 12px;margin-bottom:10px;font-size:12px;color:#8c2424;line-height:1.55">
        ⚡ <strong>Crisis margin active</strong> — sell penalty temporarily increased.
      </div>
      <div style="background:rgba(28,42,64,0.07);border:1px solid rgba(28,42,64,0.18);border-radius:3px;padding:9px 12px;margin-bottom:14px;font-size:12px;color:#2e2014;line-height:1.55">
        ⚠ After the request is approved, a councillor will pay out the silver to you in-game.
      </div>
      <div style="margin-bottom:12px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
          <label style="font-size:11px;font-variant:small-caps;letter-spacing:1px;color:#5a4632">Laxi Amount</label>
          <button onclick="document.getElementById('ptSellAmount').value=Math.max(0,_navMyPoints-_navPendingSellPts);updateSellPreview();" style="font-size:10px;font-family:Georgia,serif;font-variant:small-caps;letter-spacing:1px;background:rgba(140,36,36,.1);color:#8c2424;border:1px solid rgba(140,36,36,.3);padding:2px 8px;cursor:pointer;border-radius:2px">Max</button>
        </div>
        <input id="ptSellAmount" type="number" min="1" placeholder="0" oninput="updateSellPreview()" style="width:100%;padding:8px;border:1px solid #ddc69a;border-radius:3px;font-family:Georgia,serif;font-size:13px;box-sizing:border-box">
      </div>
      <div id="ptSellPreview" style="background:rgba(200,160,74,.1);border:1px solid rgba(200,160,74,.4);border-radius:3px;padding:10px 12px;margin-bottom:16px;font-size:12px;color:#5a4632;display:none">
        <div style="display:flex;justify-content:space-between"><span id="ptSellRateLabel">Rate (×0.9)</span><span id="ptSellRate">—</span></div>
        <div style="display:flex;justify-content:space-between;font-weight:bold;margin-top:6px;font-size:13px;color:#2e2014"><span>You receive</span><span id="ptSellPayout">—</span></div>
      </div>
      <div id="ptSellPendingWrap" style="display:none;margin-bottom:12px">
        <div style="background:rgba(200,160,74,.12);border:1px solid rgba(200,160,74,.5);border-radius:3px;padding:8px 12px;font-size:12px;color:#5a4632;display:flex;justify-content:space-between;align-items:center">
          <span id="ptSellPendingLabel">⏳ Sale pending…</span>
          <button onclick="cancelPendingLaxiTask('sell')" style="background:rgba(140,36,36,0.1);border:1px solid rgba(140,36,36,0.4);color:#8c2424;border-radius:3px;padding:3px 10px;font-family:Georgia,serif;font-size:11px;cursor:pointer">Cancel</button>
        </div>
      </div>
      <div style="display:flex;gap:8px">
        <button id="ptSellBtn" onclick="doPrestigeSell()" style="flex:1;padding:9px;background:#8c2424;color:#f1e4c4;border:none;border-radius:3px;cursor:pointer;font-family:Georgia,serif;font-size:13px;font-variant:small-caps;letter-spacing:1px">Request Sale</button>
        <button onclick="closePrestigeTransfer()" style="padding:9px 18px;background:#5a4632;color:#f1e4c4;border:none;border-radius:3px;cursor:pointer;font-family:Georgia,serif;font-size:13px">Close</button>
      </div>
    </div>
    <p id="ptError" style="color:#8c2424;font-size:12px;margin-top:8px;display:none"></p>
    <p id="ptSuccess" style="color:#2a5a2a;font-size:12px;margin-top:8px;display:none"></p>
  </div>
</div>`;
  document.body.insertAdjacentHTML('beforeend', transferModalHtml);

  // Footer — deferred so it lands at the end of body after full parse
  document.addEventListener('DOMContentLoaded', () => document.body.appendChild(footerEl));

  // ── Firebase: prestige, badge, user bar ──
  // If the page already has a Firebase app (modular SDK), reuse it.
  // If not (market/builds init in ESM module which runs after this sync script),
  // initialize our own app instance.
  const NAVBAR_FB_CONFIG = {
    apiKey:"AIzaSyDtfHGjWMtCYOxU8VfqTGaqxiV0LGf4a40",
    authDomain:"laxtania-albion-quest-board.firebaseapp.com",
    databaseURL:"https://laxtania-albion-quest-board-default-rtdb.europe-west1.firebasedatabase.app",
    projectId:"laxtania-albion-quest-board",
    storageBucket:"laxtania-albion-quest-board.appspot.com",
    messagingSenderId:"688820431424",
    appId:"1:688820431424:web:c2462dd96ed6e7c4c0a7cd"
  };
  import('https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js').then(({getApps,initializeApp})=>{
    import('https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js').then(({getAuth,onAuthStateChanged})=>{
      import('https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js').then(({getDatabase,ref,onValue,get,update,push,query,orderByChild,limitToLast})=>{
        const app=getApps().length?getApps()[0]:initializeApp(NAVBAR_FB_CONFIG);
        const auth=getAuth(app);
        const db=getDatabase(app);
        let _navMyMid=null,_navAllMembers={},_navAllFamilies={},_navMyPoints=0,_navMyFid=null,_navIsAdmin=false,_navSilverRate=10000,_navUserName='';
        let _navPendingBuyTaskId=null,_navPendingBuyPts=0,_navPendingSellTaskId=null,_navPendingSellPts=0;
        let _navCrisisPenalty=0; // extra sell margin penalty from crisis (0.0–0.50)
        onValue(ref(db,'treasury/settings/silverPerLaxi'),snap=>{_navSilverRate=snap.exists()?snap.val():10000;});
        onValue(ref(db,'treasury/settings/crisis'),snap=>{
          _navCrisisPenalty=snap.exists()?(snap.val().sellMarginPenalty||0):0;
          updateSellPreview&&updateSellPreview();
        });

        onAuthStateChanged(auth,user=>{
          if(!user)return;

          // Council nav badge = pending tasks + pending bond requests
          let _navPendingTasks=0,_navPendingBondReqs=0;
          function _navUpdateBadge(){
            const total=_navPendingTasks+_navPendingBondReqs;
            const b=document.getElementById('councilTaskBadge');
            if(b){
              if(total>0){b.textContent=total;b.style.display='inline-block';}
              else{b.style.display='none';}
            }
          }
          let _navAllTasks={};
          function _navUpdatePrestigePending(){
            if(!_navUserName)return;
            let buyPts=0,sellPts=0,questPts=0,eventPts=0;
            for(const t of Object.values(_navAllTasks)){
              if(t.status!=='pending')continue;
              if(t.type==='prestige_buy'&&t.holder?.toLowerCase()===_navUserName)buyPts+=t.prestigePoints||0;
              if(t.type==='prestige_sell'&&t.holder?.toLowerCase()===_navUserName)sellPts+=t.prestigePoints||0;
              if(t.type==='prestige_quest'){
                const party=Array.isArray(t.partyMembers)?t.partyMembers:Object.values(t.partyMembers||{});
                if(party.some(n=>n?.toLowerCase()===_navUserName))questPts+=Math.floor((t.prestigePoints||0)/Math.max(1,party.length));
              }
              if(t.type==='prestige_event'&&t.awardsMap){
                const award=Object.values(t.awardsMap).find(a=>a.name?.toLowerCase()===_navUserName);
                if(award)eventPts+=award.delta||0;
              }
            }
            const pendingEl=document.getElementById('myPrestigePending');
            if(!pendingEl)return;
            const parts=[];
            if(buyPts>0)parts.push(`+${buyPts}`);
            if(sellPts>0)parts.push(`−${sellPts}`);
            const questEvent=questPts+eventPts;
            if(questEvent>0)parts.push(`+${questEvent}`);
            if(sellPts>0&&parts.length){
              pendingEl.textContent=parts.join(' ');pendingEl.style.color='#8c2424';pendingEl.style.display='inline';
              pendingEl.title=`Pending Laxi: ${parts.join(', ')}`;
            } else if(parts.length){
              pendingEl.textContent=parts.join(' ');pendingEl.style.color='#2a5a2a';pendingEl.style.display='inline';
              pendingEl.title=`Pending Laxi: ${parts.join(', ')}`;
            } else{pendingEl.style.display='none';}
          }
          onValue(ref(db,'tasks'),snap=>{
            _navAllTasks=snap.val()||{};
            _navPendingTasks=Object.values(_navAllTasks).filter(t=>t.status==='pending').length;
            _navUpdateBadge();
            _navUpdatePrestigePending();
            // Track own pending buy/sell tasks
            if(_navUserName){
              const myBuy=Object.entries(_navAllTasks).find(([,t])=>t.status==='pending'&&t.type==='prestige_buy'&&t.holder?.toLowerCase()===_navUserName);
              const mySell=Object.entries(_navAllTasks).find(([,t])=>t.status==='pending'&&t.type==='prestige_sell'&&t.holder?.toLowerCase()===_navUserName);
              _navPendingBuyTaskId=myBuy?myBuy[0]:null; _navPendingBuyPts=myBuy?myBuy[1].prestigePoints||0:0;
              _navPendingSellTaskId=mySell?mySell[0]:null; _navPendingSellPts=mySell?mySell[1].prestigePoints||0:0;
              _navRefreshPendingBanners();
            }
          });
          onValue(ref(db,'bondRequests'),snap=>{
            const reqs=snap.val()||{};
            _navPendingBondReqs=Object.values(reqs).filter(r=>r.status==='pending').length;
            _navUpdateBadge();
          });

          const ADMIN_RANKS_PT=['hand','sovereign'];
          get(ref(db,'users/'+user.uid)).then(usnap=>{
            if(!usnap.exists())return;
            const ud=usnap.val();
            _navUserName=(ud?.name||'').toLowerCase();
            _navIsAdmin=(ud?.ranks||[]).some(r=>ADMIN_RANKS_PT.includes(r)) || (ud?.roles && Object.keys(ud.roles).some(k=>k.startsWith('admin_')&&ud.roles[k]===true));
            _navUpdatePrestigePending();

            // Listen to fund requests to update global badge for Hand/Sovereign
            if (_navIsAdmin) {
              onValue(ref(db, 'treasury/fundRequests'), snap => {
                let reqCount = 0;
                if (snap.exists()) {
                  Object.values(snap.val()).forEach(req => {
                    if (req.status === 'pending') reqCount++;
                  });
                }
                const fb = document.getElementById('councilFundBadge');
                if (fb) {
                  if (reqCount > 0) { fb.textContent = reqCount; fb.style.display = 'inline-block'; }
                  else { fb.style.display = 'none'; }
                }
              });
            }

            // Show user bar (for pages whose own auth callback hasn't done it yet)
            const userBarEl=document.getElementById('userBar');
            if(userBarEl&&userBarEl.style.display==='none') userBarEl.style.display='flex';
            const userBarNameEl=document.getElementById('userBarName');
            if(userBarNameEl&&userBarNameEl.textContent==='—') userBarNameEl.textContent=ud?.name||user.email;
            const adminToggleEl=document.getElementById('adminToggle');
            if(adminToggleEl&&_navIsAdmin&&adminToggleEl.style.display==='none') adminToggleEl.style.display='flex';
            const userBarRolesEl=document.getElementById('userBarRoles');
            if(userBarRolesEl&&!userBarRolesEl.children.length){
              userBarRolesEl.innerHTML=(ud?.ranks||['serf']).map(r=>{
                const label=r.charAt(0).toUpperCase()+r.slice(1);
                return `<span class="role-tag">${label}</span>`;
              }).join('');
            }

            // Council link + Admin group — visible to councillor/hand/sovereign
            const _isCouncil=(ud?.ranks||[]).some(r=>['councillor','hand','sovereign'].includes(r))
              ||(ud?.roles&&(ud.roles.council||ud.roles.admin||ud.roles.sovereign||ud.roles.hand));
            if(_isCouncil){
              const cl=document.getElementById('councilNavLink');if(cl)cl.classList.add('council-visible');
              const ag=document.getElementById('adminNavGroup');if(ag)ag.style.display='flex';
              const ad=document.getElementById('adminNavDivider');if(ad)ad.style.display='block';
            }

            // Google Analytics: tag the signed-in user (UID is anonymous, GDPR-safe)
            if(typeof gtag==='function'){
              const topRank=(ud?.ranks||['serf']).slice(-1)[0]||'serf';
              gtag('config','G-72QH8KN6M5',{user_id:user.uid});
              gtag('set','user_properties',{guild_rank:topRank});
            }

            // Prestige families
            onValue(ref(db,'prestige/families'),fsnap=>{
              _navAllFamilies=fsnap.val()||{};
            });

            // Prestige members → update count in nav
            onValue(ref(db,'prestige/members'),snap=>{
              _navAllMembers=snap.val()||{};
              const entry=_navUserName?Object.entries(_navAllMembers).find(([,m])=>m.name?.toLowerCase()===_navUserName):null;
              if(entry){
                _navMyMid=entry[0];
                _navMyPoints=entry[1].points||0;
                _navMyFid=entry[1].familyId||null;
              }
              const el=document.getElementById('myPrestigeCount');
              const btn=document.getElementById('prestigeTransferBtn');
              if(el)el.textContent=_navMyPoints;
              if(btn)btn.style.display='flex';
              _navUpdatePrestigePending();
            });
          });
        });

        function _navFmtS(v){if(!v)return'0 S';const a=Math.abs(v);let s=a>=1000000?(a/1000000).toFixed(1)+'M':a>=1000?(a/1000).toFixed(0)+'K':a.toString();return(v<0?'-':'')+s+' S';}

        window.updateTransferAvailable=function(){
          const avail=_navMyPoints-_navPendingSellPts;
          const inp=document.getElementById('ptAmount');
          if(inp){inp.max=avail;if((parseInt(inp.value)||0)>avail)inp.value=avail;}
        };

        window.switchPrestigeTab=function(tab){
          ['transfer','buy','sell'].forEach(t=>{
            const panel=document.getElementById('ptPanel-'+t);
            const btn=document.getElementById('ptTab-'+t);
            if(panel)panel.style.display=t===tab?'block':'none';
            if(btn){btn.style.background=t===tab?'#1c2a40':'transparent';btn.style.color=t===tab?'#f1e4c4':'#5a4632';}
          });
          document.getElementById('ptError').style.display='none';
          document.getElementById('ptSuccess').style.display='none';
          if(tab==='sell'){
            const available=_navMyPoints-_navPendingSellPts;
            const inp=document.getElementById('ptSellAmount');
            if(inp)inp.max=available;
            const btn=document.getElementById('ptSellBtn');
            if(btn){btn.disabled=true;btn.style.opacity='0.45';}
            const avEl=document.getElementById('ptSellAvailable');
            if(avEl)avEl.textContent=`Available: ${available}`;
          }
          if(tab==='transfer') updateTransferAvailable();
        };

        window.updateBuyPreview=function(){
          const pts=parseInt(document.getElementById('ptBuyAmount').value)||0;
          const prev=document.getElementById('ptBuyPreview');
          if(!pts){prev.style.display='none';return;}
          const cost=Math.round(pts*_navSilverRate*1.1);
          document.getElementById('ptBuyRate').textContent=Math.round(_navSilverRate*1.1).toLocaleString()+' S/pt';
          document.getElementById('ptBuyCost').textContent=_navFmtS(cost);
          prev.style.display='block';
        };

        window.updateSellPreview=function(){
          const input=document.getElementById('ptSellAmount');
          const btn=document.getElementById('ptSellBtn');
          const prev=document.getElementById('ptSellPreview');
          const available=_navMyPoints-_navPendingSellPts;
          let pts=parseInt(input.value)||0;
          if(pts>available){pts=available;input.value=available;}
          if(!pts||pts<=0){prev.style.display='none';btn.disabled=true;btn.style.opacity='0.45';return;}
          btn.disabled=false;btn.style.opacity='1';
          const totalPenalty=0.10+(_navCrisisPenalty||0);
          const multiplier=1-totalPenalty;
          const payout=Math.round(pts*_navSilverRate*multiplier);
          const marginPct=Math.round(totalPenalty*100);
          document.getElementById('ptSellRateLabel').textContent=`Rate (×${multiplier.toFixed(2)})`;
          document.getElementById('ptSellRate').textContent=Math.round(_navSilverRate*multiplier).toLocaleString()+' S/pt';
          document.getElementById('ptSellPayout').textContent=_navFmtS(payout);
          // Crisis warning
          const warn=document.getElementById('ptCrisisWarning');
          const desc=document.getElementById('ptSellMarginDesc');
          if(_navCrisisPenalty>0){
            if(warn)warn.style.display='block';
            if(desc)desc.innerHTML=`Sell Laxi back to the Guild Treasury at <strong>-${marginPct}% margin</strong> <span style="color:#8c2424">(+${Math.round(_navCrisisPenalty*100)}% crisis)</span>.<br>Silver will be paid to your in-game wallet.`;
          } else {
            if(warn)warn.style.display='none';
            if(desc)desc.innerHTML=`Sell Laxi back to the Guild Treasury at <strong>-10% margin</strong>.<br>Silver will be paid to your in-game wallet.`;
          }
          prev.style.display='block';
        };

        window.doPrestigeBuy=async function(){
          const errEl=document.getElementById('ptError');const okEl=document.getElementById('ptSuccess');
          errEl.style.display='none';okEl.style.display='none';
          const pts=parseInt(document.getElementById('ptBuyAmount').value,10);
          if(!pts||pts<=0){errEl.textContent='Enter a valid amount.';errEl.style.display='block';return;}
          if(!_navMyMid){errEl.textContent='Could not identify your member record.';errEl.style.display='block';return;}
          const myName=_navAllMembers[_navMyMid]?.name||'?';
          const cost=Math.round(pts*_navSilverRate*1.1);
          const btn=document.getElementById('ptBuyBtn');
          btn.disabled=true;btn.textContent='Submitting…';
          try{
            await push(ref(db,'tasks'),{
              title:`Laxi Purchase — ${myName} — ${pts} laxi`,
              type:'prestige_buy',amount:cost,prestigePoints:pts,
              holder:myName,memberMid:_navMyMid,status:'pending',
              createdAt:Date.now(),createdBy:myName,
              notes:`${pts} pts × ${_navSilverRate.toLocaleString()} S + 10% = ${cost.toLocaleString()} S`
            });
            document.getElementById('ptBuyAmount').value='';
            document.getElementById('ptBuyPreview').style.display='none';
            okEl.textContent='✓ Request submitted — awaiting Council approval.';okEl.style.display='block';
            _navRefreshPendingBanners();
          }catch(e){errEl.textContent='Error: '+e.message;errEl.style.display='block';}
          btn.disabled=false;btn.textContent='Request Purchase';
        };

        window.doPrestigeSell=async function(){
          const errEl=document.getElementById('ptError');const okEl=document.getElementById('ptSuccess');
          errEl.style.display='none';okEl.style.display='none';
          const pts=parseInt(document.getElementById('ptSellAmount').value,10);
          if(!pts||pts<=0){errEl.textContent='Enter a valid amount.';errEl.style.display='block';return;}
          const availablePts=_navMyPoints-_navPendingSellPts;
          if(pts>availablePts){errEl.textContent=`Not enough Laxi (available: ${availablePts} pts).`;errEl.style.display='block';return;}
          if(!_navMyMid){errEl.textContent='Could not identify your member record.';errEl.style.display='block';return;}
          const myName=_navAllMembers[_navMyMid]?.name||'?';
          const totalPenalty=0.10+(_navCrisisPenalty||0);
          const multiplier=1-totalPenalty;
          const payout=Math.round(pts*_navSilverRate*multiplier);
          const marginPct=Math.round(totalPenalty*100);
          const btn=document.getElementById('ptSellBtn');
          btn.disabled=true;btn.textContent='Submitting…';
          try{
            await push(ref(db,'tasks'),{
              title:`Laxi Sale — ${myName} — ${pts} laxi`,
              type:'prestige_sell',amount:payout,prestigePoints:pts,
              holder:myName,memberMid:_navMyMid,status:'pending',
              createdAt:Date.now(),createdBy:myName,
              crisisPenalty:_navCrisisPenalty||0,
              notes:`${pts} pts × ${_navSilverRate.toLocaleString()} S - ${marginPct}% = ${payout.toLocaleString()} S`
            });
            document.getElementById('ptSellAmount').value='';
            document.getElementById('ptSellPreview').style.display='none';
            okEl.textContent='✓ Request submitted — awaiting Council approval.';okEl.style.display='block';
            _navRefreshPendingBanners();
          }catch(e){errEl.textContent='Error: '+e.message;errEl.style.display='block';}
          btn.disabled=false;btn.textContent='Request Sale';
        };

        window.openPrestigeTransfer=function(preselectMid){
          const modal=document.getElementById('prestigeTransferModal');
          if(!modal)return;
          modal.style.display='flex';
          switchPrestigeTab('transfer');
          _navRefreshPendingBanners();
          document.getElementById('ptAmount').value='';
          document.getElementById('ptNote').value='';
          document.getElementById('ptMyBalance').textContent=`Available: ${_navMyPoints-_navPendingSellPts}`;
          const sel=document.getElementById('ptRecipient');
          sel.innerHTML='<option value="">— Select —</option>';
          if(_navMyFid&&_navAllFamilies[_navMyFid]){
            const famBal=_navAllFamilies[_navMyFid].bonusPoints||0;
            const famName=_navAllFamilies[_navMyFid].name||'My Family';
            const o=document.createElement('option');
            o.value='family:'+_navMyFid;
            o.textContent=`🏛 ${famName} (pool — ${famBal} pts)`;
            sel.appendChild(o);
          }
          Object.entries(_navAllMembers).filter(([mid])=>mid!==_navMyMid).sort((a,b)=>(a[1].name||'').localeCompare(b[1].name||'')).forEach(([mid,m])=>{
            const o=document.createElement('option');o.value='member:'+mid;o.textContent=m.name||mid;sel.appendChild(o);
          });
          if(preselectMid) sel.value = 'member:'+preselectMid;
          onValue(query(ref(db,'prestige/transfers'),orderByChild('at'),limitToLast(12)),logSnap=>{
            const logs=logSnap.val();
            const logList=document.getElementById('ptLogList');
            const logWrap=document.getElementById('ptTransferLog');
            if(!logList||!logWrap)return;
            if(!logs){logWrap.style.display='none';return;}
            logWrap.style.display='block';
            logList.innerHTML=Object.values(logs).reverse().map(l=>{
              const arrow=l.type==='family-family'?'🏛→🏛':l.type==='family-member'?'🏛→👤':l.type==='member-family'?'👤→🏛':'👤→👤';
              return`<div style="font-size:11px;padding:4px 0;border-bottom:1px solid rgba(120,90,50,0.12);color:#5a4632">${arrow} <strong>${l.fromName||'?'}</strong> → <strong>${l.toName||'?'}</strong>: ${l.amount} pts${l.note?` <em>— ${l.note}</em>`:''}</div>`;
            }).join('');
          });
        };

        window.closePrestigeTransfer=function(){
          const modal=document.getElementById('prestigeTransferModal');
          if(modal)modal.style.display='none';
        };

        function _navRefreshPendingBanners(){
          const balEl=document.getElementById('ptMyBalance');
          if(balEl)balEl.textContent=`Available: ${_navMyPoints-_navPendingSellPts}`;
          const buyWrap=document.getElementById('ptBuyPendingWrap');
          const sellWrap=document.getElementById('ptSellPendingWrap');
          if(buyWrap){
            if(_navPendingBuyTaskId){
              document.getElementById('ptBuyPendingLabel').textContent=`⏳ Purchase pending — +${_navPendingBuyPts} Laxi`;
              buyWrap.style.display='block';
            } else { buyWrap.style.display='none'; }
          }
          if(sellWrap){
            if(_navPendingSellTaskId){
              document.getElementById('ptSellPendingLabel').textContent=`⏳ Sale pending — −${_navPendingSellPts} Laxi`;
              sellWrap.style.display='block';
            } else { sellWrap.style.display='none'; }
          }
        }

        window.cancelPendingLaxiTask=async function(type){
          const tid=type==='buy'?_navPendingBuyTaskId:_navPendingSellTaskId;
          if(!tid)return;
          if(!confirm('Cancel this pending request?'))return;
          try{
            await update(ref(db,'tasks/'+tid),{status:'cancelled',cancelledAt:Date.now(),cancelledBy:_navUserName});
            if(type==='buy'){_navPendingBuyTaskId=null;_navPendingBuyPts=0;}
            else{_navPendingSellTaskId=null;_navPendingSellPts=0;}
            _navRefreshPendingBanners();
            const okEl=document.getElementById('ptSuccess');
            if(okEl){okEl.textContent='Request cancelled.';okEl.style.display='block';}
          }catch(e){
            const errEl=document.getElementById('ptError');
            if(errEl){errEl.textContent='Cancel failed: '+e.message;errEl.style.display='block';}
          }
        };

        window.doPrestigeTransfer=async function(){
          const errEl=document.getElementById('ptError');
          errEl.style.display='none';
          const toVal=document.getElementById('ptRecipient').value;
          const amount=parseInt(document.getElementById('ptAmount').value,10);
          const note=document.getElementById('ptNote').value.trim();
          if(!toVal){errEl.textContent='Please select a recipient.';errEl.style.display='block';return;}
          const transferAvail=_navMyPoints-_navPendingSellPts;
          if(!amount||amount<=0){errEl.textContent='Enter a valid amount.';errEl.style.display='block';return;}
          if(amount>transferAvail){errEl.textContent=`Not enough available Laxi (${transferAvail} pts).`;errEl.style.display='block';return;}
          if(!_navMyMid){errEl.textContent='Could not identify your member record.';errEl.style.display='block';return;}
          const btn=document.getElementById('ptSendBtn');
          btn.disabled=true;btn.textContent='Sending…';
          try{
            const upd={};
            const myName=_navAllMembers[_navMyMid]?.name||'?';
            let toName,type;
            if(toVal.startsWith('family:')){
              const toFid=toVal.replace('family:','');
              const famBal=_navAllFamilies[toFid]?.bonusPoints||0;
              toName=(_navAllFamilies[toFid]?.name||'?')+' (pool)';
              type='member-family';
              upd['prestige/members/'+_navMyMid+'/points']=_navMyPoints-amount;
              upd['prestige/families/'+toFid+'/bonusPoints']=famBal+amount;
            }else{
              const toMid=toVal.replace('member:','');
              toName=_navAllMembers[toMid]?.name||'?';
              type='member-member';
              upd['prestige/members/'+_navMyMid+'/points']=_navMyPoints-amount;
              upd['prestige/members/'+toMid+'/points']=(_navAllMembers[toMid]?.points||0)+amount;
            }
            await update(ref(db),upd);
            await push(ref(db,'prestige/transfers'),{type,fromName:myName,toName,amount,note,at:Date.now(),by:myName});
            document.getElementById('ptAmount').value='';
            document.getElementById('ptNote').value='';
            document.getElementById('ptMyBalance').textContent=`Available: ${_navMyPoints-amount-_navPendingSellPts}`;
            btn.textContent='Sent ✓';
            setTimeout(()=>{btn.disabled=false;btn.textContent='Send';},2000);
          }catch(e){
            errEl.textContent='Transfer failed: '+e.message;errEl.style.display='block';
            btn.disabled=false;btn.textContent='Send';
          }
        };
      });
    });
  });
})();
