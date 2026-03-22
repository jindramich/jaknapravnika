// ============================================================
//  Cookie Consent — JakNaPravnika.cz
//  Shows a one-time banner. Remembers choice in localStorage.
//  Grants / keeps-denied Google Analytics accordingly.
// ============================================================

(function () {
  const KEY = 'jaknapravnika_consent';
  const saved = localStorage.getItem(KEY);

  // Already decided — update GA and exit, no banner needed
  if (saved === 'granted') {
    gtag('consent', 'update', { analytics_storage: 'granted' });
    return;
  }
  if (saved === 'denied') return;

  // First visit — show banner after DOM is ready
  document.addEventListener('DOMContentLoaded', function () {
    const banner = document.createElement('div');
    banner.id = 'consent-banner';
    banner.style.cssText = [
      'position:fixed', 'bottom:0', 'left:0', 'right:0', 'z-index:9999',
      'padding:1rem 1.5rem',
      'background:#1c1608',
      'border-top:1px solid #2e2610',
      'box-shadow:0 -4px 24px rgba(0,0,0,0.3)',
    ].join(';');

    banner.innerHTML = `
      <div style="max-width:56rem;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;gap:1rem;">
        <div style="flex:1;min-width:220px;">
          <p style="margin:0 0 0.2rem;font-size:0.85rem;font-weight:700;color:#c9ea8e;font-family:'Plus Jakarta Sans',sans-serif;">
            Cookies a soukromí
          </p>
          <p style="margin:0;font-size:0.8rem;color:#b0a882;line-height:1.5;font-family:'Inter',sans-serif;">
            Používáme Google Analytics ke sledování návštěvnosti. Žádné osobní údaje neprodáváme ani nesdílíme s třetími stranami.
          </p>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:0.5rem;flex-shrink:0;">
          <button id="consent-accept"
            style="padding:0.6rem 1.8rem;border-radius:9999px;border:none;background:#1f4209;color:#c9ea8e;font-size:0.875rem;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;box-shadow:0 2px 8px rgba(0,0,0,0.3);">
            Přijmout
          </button>
          <button id="consent-deny"
            style="background:none;border:none;color:#3e3b26;font-size:0.7rem;cursor:pointer;font-family:'Inter',sans-serif;text-decoration:underline;padding:0;">
            odmítnout
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(banner);

    document.getElementById('consent-accept').addEventListener('click', function () {
      localStorage.setItem(KEY, 'granted');
      gtag('consent', 'update', { analytics_storage: 'granted' });
      banner.style.transition = 'opacity 0.3s';
      banner.style.opacity = '0';
      setTimeout(() => banner.remove(), 300);
    });

    document.getElementById('consent-deny').addEventListener('click', function () {
      localStorage.setItem(KEY, 'denied');
      banner.style.transition = 'opacity 0.3s';
      banner.style.opacity = '0';
      setTimeout(() => banner.remove(), 300);
    });
  });
})();
