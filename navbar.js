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
    gap: 8px;
    align-items: center;
    overflow-x: auto;
    flex-wrap: nowrap;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
    min-width: 0;
    flex: 1;
  }
  .nav-links::-webkit-scrollbar { display: none; }
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
<nav id="guildNav" class="guild-nav" style="display:none">
  <div class="nav-links">
    <a href="${prefix}" class="nav-item ${page === 'hall' ? 'active' : ''}">🏰 Hall</a>
    <a href="${prefix}prestige/" class="nav-item ${page === 'members' ? 'active' : ''}">👥 Members</a>
    <a href="${prefix}quest-board/" class="nav-item ${page === 'quests' ? 'active' : ''}">📜 Quests</a>
    <a href="${prefix}events/" class="nav-item ${page === 'events' ? 'active' : ''}">🗡️ Events</a>
    <a href="${prefix}council/" id="councilNavLink" class="nav-item ${page === 'council' ? 'active' : ''}">⚜ Council <span id="councilTaskBadge" style="display:none;background:#8c2424;color:#fff;border-radius:10px;font-size:10px;padding:1px 6px;margin-left:2px;vertical-align:middle"></span></a>
  </div>
  <div class="nav-user-container">
    <div class="nav-sep"></div>
    <div class="nav-user" id="userBar" style="display:none">
      <div class="nav-user-info">
        <span class="user-bar-name" id="userBarName">—</span>
        <div class="user-bar-roles" id="userBarRoles"></div>
      </div>
      <button id="prestigeTransferBtn" onclick="openPrestigeTransfer()" style="display:none;flex-direction:column;align-items:center;gap:1px;background:none;border:none;cursor:pointer;padding:4px 8px;border-radius:3px;transition:background 0.15s" title="Prestige & Transfer" onmouseover="this.style.background='rgba(200,160,74,0.1)'" onmouseout="this.style.background='none'">
        <span style="font-size:10px;font-variant:small-caps;letter-spacing:1px;color:rgba(230,200,120,0.6)">Prestige</span>
        <span id="myPrestigeCount" style="font-family:Georgia,serif;font-size:15px;color:var(--gold-bright);font-weight:bold;line-height:1">—</span>
        <span style="font-size:9px;color:rgba(200,160,74,0.5);letter-spacing:0.5px">⇄ transfer</span>
      </button>
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

  // Prestige Transfer Modal
  const transferModalHtml = `
<div id="prestigeTransferModal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:2000;align-items:center;justify-content:center">
  <div style="background:#f1e4c4;border-radius:6px;padding:24px;min-width:320px;max-width:420px;width:90%;font-family:Georgia,serif;box-shadow:0 8px 32px rgba(0,0,0,.4)">
    <h3 style="color:#2e2014;margin-bottom:4px;font-size:16px">⇄ Prestige Transfer</h3>
    <p id="ptMyBalance" style="font-size:12px;color:#5a4632;margin-bottom:16px"></p>
    <div style="margin-bottom:12px">
      <label style="font-size:11px;font-variant:small-caps;letter-spacing:1px;color:#5a4632;display:block;margin-bottom:4px">Recipient</label>
      <select id="ptRecipient" style="width:100%;padding:8px;border:1px solid #ddc69a;border-radius:3px;font-family:Georgia,serif;font-size:13px;background:white">
        <option value="">— Select member —</option>
      </select>
    </div>
    <div style="margin-bottom:12px">
      <label style="font-size:11px;font-variant:small-caps;letter-spacing:1px;color:#5a4632;display:block;margin-bottom:4px">Amount (pts)</label>
      <input id="ptAmount" type="number" min="1" placeholder="0" style="width:100%;padding:8px;border:1px solid #ddc69a;border-radius:3px;font-family:Georgia,serif;font-size:13px">
    </div>
    <div style="margin-bottom:16px">
      <label style="font-size:11px;font-variant:small-caps;letter-spacing:1px;color:#5a4632;display:block;margin-bottom:4px">Note (optional)</label>
      <input id="ptNote" type="text" placeholder="Reason for transfer..." style="width:100%;padding:8px;border:1px solid #ddc69a;border-radius:3px;font-family:Georgia,serif;font-size:13px">
    </div>
    <div id="ptTransferLog" style="margin-bottom:16px;max-height:140px;overflow-y:auto;display:none">
      <div style="font-size:10px;font-variant:small-caps;letter-spacing:1px;color:#5a4632;margin-bottom:6px">Recent Transfers</div>
      <div id="ptLogList"></div>
    </div>
    <div style="display:flex;gap:8px">
      <button id="ptSendBtn" onclick="doPrestigeTransfer()" style="flex:1;padding:9px;background:#1c2a40;color:#f1e4c4;border:none;border-radius:3px;cursor:pointer;font-family:Georgia,serif;font-size:13px;font-variant:small-caps;letter-spacing:1px">Send</button>
      <button onclick="closePrestigeTransfer()" style="padding:9px 18px;background:#5a4632;color:#f1e4c4;border:none;border-radius:3px;cursor:pointer;font-family:Georgia,serif;font-size:13px">Close</button>
    </div>
    <p id="ptError" style="color:#8c2424;font-size:12px;margin-top:8px;display:none"></p>
  </div>
</div>`;
  document.body.insertAdjacentHTML('beforeend', transferModalHtml);

  // Task badge — listen on all pages
  import('https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js').then(({getApps})=>{
    import('https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js').then(({getAuth,onAuthStateChanged})=>{
      import('https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js').then(({getDatabase,ref,onValue,update,push,query,orderByChild,limitToLast})=>{
        const app=getApps()[0];if(!app)return;
        const auth=getAuth(app);
        const db=getDatabase(app);
        let _navMyMid=null, _navAllMembers={}, _navMyPoints=0;

        onAuthStateChanged(auth,user=>{
          if(!user)return;

          onValue(ref(db,'tasks'),snap=>{
            const tasks=snap.val()||{};
            const count=Object.values(tasks).filter(t=>t.status==='pending').length;
            const badge=document.getElementById('councilTaskBadge');
            if(!badge)return;
            if(count>0){badge.textContent=count;badge.style.display='inline';}
            else{badge.style.display='none';}
          });

          // Get user's name first, then match prestige member
          let _navUserName='';
          import('https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js').then(({ref:r2,get})=>{
            get(r2(db,'users/'+user.uid)).then(usnap=>{
              const ud=usnap.val();
              _navUserName=(ud?.name||'').toLowerCase();
              onValue(ref(db,'prestige/members'),snap=>{
                _navAllMembers=snap.val()||{};
                const name=_navUserName||document.getElementById('userBarName')?.textContent?.toLowerCase()||'';
                const entry=name?Object.entries(_navAllMembers).find(([,m])=>m.name?.toLowerCase()===name):null;
                if(entry){_navMyMid=entry[0];_navMyPoints=entry[1].points||0;}
                const el=document.getElementById('myPrestigeCount');
                const btn=document.getElementById('prestigeTransferBtn');
                if(el) el.textContent=_navMyPoints;
                if(btn) btn.style.display='flex';
              });
            });
          });
        });

        window.openPrestigeTransfer=function(){
          const modal=document.getElementById('prestigeTransferModal');
          if(!modal)return;
          modal.style.display='flex';
          document.getElementById('ptError').style.display='none';
          document.getElementById('ptAmount').value='';
          document.getElementById('ptNote').value='';
          document.getElementById('ptMyBalance').textContent='Your balance: '+_navMyPoints+' pts';
          // Fill recipient dropdown
          const sel=document.getElementById('ptRecipient');
          sel.innerHTML='<option value="">— Select member —</option>';
          Object.entries(_navAllMembers).filter(([mid])=>mid!==_navMyMid).forEach(([mid,m])=>{
            const opt=document.createElement('option');
            opt.value=mid;opt.textContent=m.name||mid;
            sel.appendChild(opt);
          });
          // Load transfer log
          onValue(query(ref(db,'prestige/transfers'),orderByChild('at'),limitToLast(10)),logSnap=>{
            const logs=logSnap.val();
            const logList=document.getElementById('ptLogList');
            const logWrap=document.getElementById('ptTransferLog');
            if(!logList||!logWrap)return;
            if(!logs){logWrap.style.display='none';return;}
            const entries=Object.values(logs).reverse();
            logWrap.style.display='block';
            logList.innerHTML=entries.map(l=>`
              <div style="font-size:11px;padding:4px 0;border-bottom:1px solid rgba(120,90,50,0.12);color:#5a4632">
                <strong>${l.fromName||'?'}</strong> → <strong>${l.toName||'?'}</strong>: ${l.amount} pts
                ${l.note?`<span style="font-style:italic"> — ${l.note}</span>`:''}
              </div>`).join('');
          });
        };

        window.closePrestigeTransfer=function(){
          const modal=document.getElementById('prestigeTransferModal');
          if(modal)modal.style.display='none';
        };

        window.doPrestigeTransfer=async function(){
          const errEl=document.getElementById('ptError');
          errEl.style.display='none';
          const toMid=document.getElementById('ptRecipient').value;
          const amount=parseInt(document.getElementById('ptAmount').value,10);
          const note=document.getElementById('ptNote').value.trim();
          if(!toMid){errEl.textContent='Please select a recipient.';errEl.style.display='block';return;}
          if(!amount||amount<=0){errEl.textContent='Enter a valid amount.';errEl.style.display='block';return;}
          if(amount>_navMyPoints){errEl.textContent='Not enough prestige points.';errEl.style.display='block';return;}
          if(!_navMyMid){errEl.textContent='Could not identify your member record.';errEl.style.display='block';return;}
          const btn=document.getElementById('ptSendBtn');
          btn.disabled=true;btn.textContent='Sending…';
          try{
            const fromEntry=_navAllMembers[_navMyMid];
            const toEntry=_navAllMembers[toMid];
            const upd={};
            upd['prestige/members/'+_navMyMid+'/points']=_navMyPoints-amount;
            upd['prestige/members/'+toMid+'/points']=(toEntry?.points||0)+amount;
            await update(ref(db),upd);
            await push(ref(db,'prestige/transfers'),{
              fromMid:_navMyMid,fromName:fromEntry?.name||'?',
              toMid,toName:toEntry?.name||'?',
              amount,note,at:Date.now()
            });
            document.getElementById('ptAmount').value='';
            document.getElementById('ptNote').value='';
            document.getElementById('ptMyBalance').textContent='Your balance: '+(_navMyPoints-amount)+' pts';
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
