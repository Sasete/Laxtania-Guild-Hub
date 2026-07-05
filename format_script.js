// Number formatting logic
document.addEventListener('input', e => {
  if (e.target.classList.contains('silver-input')) {
    let raw = e.target.value.replace(/[^\d-]/g, '');
    if (raw === '' || raw === '-') { e.target.value = raw; return; }
    e.target.value = parseInt(raw, 10).toLocaleString('tr-TR');
  }
});
window.parseAmt = function(val) {
  if (!val) return 0;
  return parseInt(val.toString().replace(/[^\d-]/g, ''), 10) || 0;
};
