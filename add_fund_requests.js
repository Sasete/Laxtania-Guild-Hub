
// ── FUND REQUESTS ──
let _fundRequests = {};

window.openFundRequest = function(key) {
  document.getElementById('reqAmt-' + key).value = '';
  document.getElementById('reqReason-' + key).value = '';
  document.getElementById('fundRequestPanel-' + key).style.display = 'block';
};

window.closeFundRequest = function(key) {
  document.getElementById('fundRequestPanel-' + key).style.display = 'none';
};

window.submitFundRequest = async function(key) {
  const amtInput = document.getElementById('reqAmt-' + key);
  const reasonInput = document.getElementById('reqReason-' + key);
  const amt = parseAmt(amtInput.value);
  const reason = reasonInput.value.trim();

  if (!amt || amt <= 0) { toast('Please enter a valid amount.'); return; }
  if (!reason) { toast('Please enter a reason for the request.'); return; }

  const btn = event.target;
  btn.disabled = true;
  btn.textContent = 'Submitting...';

  try {
    const reqRef = push(ref(db, 'treasury/fundRequests'));
    const reqId = reqRef.key;
    const reqData = {
      id: reqId,
      fundKey: key,
      amount: amt,
      reason: reason,
      requestedBy: currentUserData?.name || currentUserId,
      timestamp: Date.now(),
      status: 'pending'
    };
    await set(reqRef, reqData);
    toast('Fund request submitted.');
    closeFundRequest(key);
  } catch (e) {
    toast('Error: ' + e.message);
  } finally {
    btn.disabled = false;
    btn.textContent = 'Submit Request';
  }
};

window.approveFundRequest = async function(id) {
  const req = _fundRequests[id];
  if (!req || req.status !== 'pending') return;
  if (!confirm(`Approve request for ${fmtS(req.amount)} to ${req.fundKey.toUpperCase()}?`)) return;

  try {
    const fundName = req.fundKey.toUpperCase();
    const ts = Date.now();
    const by = currentUserData?.name || currentUserId;
    
    // Create treasury expense entry
    const tRef = push(ref(db, 'treasury/entries'));
    const tEntry = {
      amount: -req.amount,
      note: `Fund Request Approved: To ${fundName} - ${req.reason}`,
      timestamp: ts,
      by: by
    };
    
    // Create fund income entry
    const fRef = push(ref(db, `funds/${req.fundKey}/entries`));
    const fEntry = {
      amount: req.amount,
      note: `Fund Request Approved: ${req.reason} (by ${by})`,
      timestamp: ts,
      by: by
    };

    const updates = {};
    updates[`treasury/entries/${tRef.key}`] = tEntry;
    updates[`funds/${req.fundKey}/entries/${fRef.key}`] = fEntry;
    updates[`treasury/fundRequests/${id}/status`] = 'approved';
    updates[`treasury/fundRequests/${id}/resolvedAt`] = ts;
    updates[`treasury/fundRequests/${id}/resolvedBy`] = by;

    await update(ref(db), updates);
    toast('Fund request approved.');
  } catch (e) {
    toast('Error: ' + e.message);
  }
};

window.rejectFundRequest = async function(id) {
  const req = _fundRequests[id];
  if (!req || req.status !== 'pending') return;
  if (!confirm(`Reject request for ${fmtS(req.amount)} to ${req.fundKey.toUpperCase()}?`)) return;

  try {
    const ts = Date.now();
    const by = currentUserData?.name || currentUserId;
    const updates = {};
    updates[`treasury/fundRequests/${id}/status`] = 'rejected';
    updates[`treasury/fundRequests/${id}/resolvedAt`] = ts;
    updates[`treasury/fundRequests/${id}/resolvedBy`] = by;
    await update(ref(db), updates);
    toast('Fund request rejected.');
  } catch (e) {
    toast('Error: ' + e.message);
  }
};

window.renderFundRequests = function() {
  const container = document.getElementById('fundRequestsOverview');
  const listEl = document.getElementById('fundRequestsList');
  const badge = document.getElementById('fundRequestsBadge');
  const navBadge = document.getElementById('overviewTabBadge');
  
  if (!container || !listEl) return;

  const admin = isAdmin(currentUserData);
  if (!admin) {
    container.style.display = 'none';
    if(navBadge) navBadge.style.display = 'none';
    return;
  }

  const pending = Object.values(_fundRequests).filter(r => r.status === 'pending').sort((a,b) => b.timestamp - a.timestamp);
  
  if (pending.length > 0) {
    container.style.display = 'block';
    if(badge) badge.textContent = pending.length;
    if(navBadge) { navBadge.textContent = pending.length; navBadge.style.display = 'inline-block'; }
    
    listEl.innerHTML = pending.map(req => {
      const dateStr = new Date(req.timestamp).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
      return `
        <div style="background:rgba(28,42,64,.04);border:1px solid rgba(46,32,20,.15);border-radius:4px;padding:12px;margin-bottom:8px">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:8px">
            <div>
              <div style="font-size:11px;font-variant:small-caps;letter-spacing:1px;color:var(--ink-soft)">${dateStr} &nbsp;·&nbsp; from <strong>${req.requestedBy}</strong></div>
              <div style="margin-top:4px;font-family:Georgia,serif;font-size:14px;color:var(--ink)">
                Requested <strong style="color:var(--navy)">${fmtS(req.amount)}</strong> for <strong style="text-transform:uppercase">${req.fundKey}</strong>
              </div>
              <div style="margin-top:4px;font-size:12px;color:var(--ink-soft);font-style:italic">"${req.reason}"</div>
            </div>
            <div style="display:flex;gap:6px">
              <button class="green-btn" style="padding:4px 10px;font-size:11px" onclick="approveFundRequest('${req.id}')">✓ Approve</button>
              <button class="red-btn" style="padding:4px 10px;font-size:11px" onclick="rejectFundRequest('${req.id}')">✕ Reject</button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  } else {
    container.style.display = 'none';
    if(navBadge) navBadge.style.display = 'none';
  }
};
