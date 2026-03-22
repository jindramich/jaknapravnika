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
      'position:fixed', 'bottom:1.5rem', 'left:50%', 'transform:translateX(-50%)',
      'z-index:9999',
      'width:min(420px,calc(100vw - 2rem))',
      'padding:1.2rem 1.4rem',
      'background:#1c1608',
      'border:1px solid #2e2610',
      'border-radius:1.25rem',
      'box-shadow:0 8px 32px rgba(0,0,0,0.35)',
    ].join(';');

    banner.innerHTML = `
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:1rem;">
        <div style="flex:1;min-width:180px;">
          <p style="margin:0 0 0.25rem;font-size:0.85rem;font-weight:700;color:#c9ea8e;font-family:'Plus Jakarta Sans',sans-serif;">
            Cookies a soukromí
          </p>
          <p style="margin:0;font-size:0.78rem;color:#b0a882;line-height:1.5;font-family:'Inter',sans-serif;">
            Používáme Google Analytics ke sledování návštěvnosti.
          </p>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:0.4rem;flex-shrink:0;">
          <button id="consent-accept"
            style="padding:0.55rem 1.5rem;border-radius:9999px;border:none;background:#1f4209;color:#c9ea8e;font-size:0.85rem;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;white-space:nowrap;">
            Přijmout
          </button>
          <button id="consent-deny"
            style="background:none;border:none;color:#6b8c4a;font-size:0.68rem;cursor:pointer;font-family:'Inter',sans-serif;text-decoration:underline;padding:0;">
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
