(function() {
  // Inject CSS
  const css = `
  .guild-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 980px;
    margin: 0 auto 24px;
    background: rgba(28, 42, 64, 0.95);
    border: 1px solid var(--gold);
    padding: 8px 16px;
    border-radius: 4px;
    flex-wrap: wrap;
    gap: 12px;
  }
  .nav-links {
    display: flex;
    gap: 12px;
    align-items: center;
  }
  .nav-item {
    font-family: Georgia, serif;
    font-variant: small-caps;
    font-size: 13px;
    letter-spacing: 1.5px;
    color: rgba(230, 200, 120, 0.75);
    text-decoration: none;
    padding: 5px 16px;
    border: 1px solid rgba(200, 160, 74, 0.4);
    border-radius: 2px;
    transition: all 0.15s;
    display: flex;
    align-items: center;
    gap: 6px;
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
  @media(max-width: 600px) {
    .nav-sep {
      display: none;
    }
    .nav-user-container {
      margin-left: 0;
      width: 100%;
      border-top: 1px solid rgba(200, 160, 74, 0.2);
      padding-top: 8px;
    }
  }
  .nav-user {
    display: flex;
    align-items: center;
    gap: 16px;
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
  .admin-toggle{display:flex;align-items:center;gap:7px;cursor:pointer;padding:5px 12px;border:1px solid rgba(140,36,36,0.5);background:rgba(140,36,36,0.1);transition:all 0.15s;user-select:none;font-variant:small-caps;font-size:12px;letter-spacing:1.5px;color:var(--seal-red);}
  .admin-toggle:hover{background:rgba(140,36,36,0.2);}
  .admin-toggle.active{background:rgba(140,36,36,0.22);border-color:var(--seal-red);}
  .admin-toggle-dot{width:7px;height:7px;border-radius:50%;background:rgba(140,36,36,0.35);transition:background 0.2s;}
  .admin-toggle.active .admin-toggle-dot{background:var(--seal-red);box-shadow:0 0 5px rgba(140,36,36,0.6);}
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
<nav id="guildNav" class="guild-nav" style="display:none">
  <div class="nav-links">
    <a href="${prefix}" class="nav-item ${page === 'hall' ? 'active' : ''}">🏰 Hall</a>
    <a href="${prefix}prestige/" class="nav-item ${page === 'members' ? 'active' : ''}">👥 Members</a>
    <a href="${prefix}quest-board/" class="nav-item ${page === 'quests' ? 'active' : ''}">📜 Quests</a>
  </div>
  <div class="nav-user-container">
    <div class="nav-sep"></div>
    <div class="nav-user" id="userBar" style="display:none">
      <div class="nav-user-info">
        <span class="user-bar-name" id="userBarName">—</span>
        <div class="user-bar-roles" id="userBarRoles"></div>
      </div>
      <div class="admin-toggle" id="adminToggle" style="display:none" onclick="toggleAdminMode()">
        <div class="admin-toggle-dot"></div>
        Admin Mode
      </div>
      <button class="user-bar-btn" onclick="doSignOut()">Sign Out</button>
    </div>
  </div>
</nav>
  `;
  
  placeholder.outerHTML = navHtml;
})();
