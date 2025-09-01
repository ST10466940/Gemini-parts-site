// Minimal client-side JS
(function() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const form = document.querySelector('.site-search');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const q = (document.getElementById('q') as HTMLInputElement)?.value || '';
    alert('Search would query catalog for: ' + q);
  });
})();