// ============================================================
//  DARK MODE — JakNaPravnika.cz  (warm palette)
//  Uses JS class inspection to reliably override Tailwind's
//  arbitrary-value classes like bg-[#f2e8d5].
//  MutationObserver handles dynamically rendered lawyer cards.
// ============================================================

// ── 1. Run IMMEDIATELY to avoid flash of wrong theme ────────
(function () {
  const saved       = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (saved === 'dark' || (!saved && prefersDark)) {
    document.documentElement.classList.add('dark');
  }
})();

// ── 2. Color maps (light class → dark value) ─────────────────
// Light mode uses warm cream/olive palette; dark mode uses
// warm dark amber/brown instead of cold dark greens.

const _DM_BG = [
  // Warm creams / parchments → warm dark browns
  ['bg-[#faf6ed]',  '#140f05'],   // main bg
  ['bg-[#f2e8d5]',  '#1a1408'],   // surface-low (sidebar, cards)
  ['bg-[#e9e0c8]',  '#1a1408'],   // surface (footer, sections)
  ['bg-[#e2d9c0]',  '#211a0a'],   // surface-high
  ['bg-[#d4c9a4]',  '#211a0a'],   // surface-dim
  ['bg-[#c9ea8e]',  '#1e3406'],   // light green accent
  ['bg-[#ffdbcd]',  '#2a1a10'],   // orange badge
  ['bg-[#ffdad6]',  '#2a1010'],   // error bg
  ['bg-[#c6e7ff]',  '#012033'],   // blue tag
  ['bg-[#fff9e6]',  '#1e1800'],   // yellow awards card
  ['bg-[#ffffff]',  '#1c1608'],   // literal #ffffff (e.g. registrace form card)
  ['bg-white',      '#1c1608'],   // card white → warm dark
];

const _DM_TEXT = [
  ['text-[#1a1810]', '#ede8d4'],  // primary text
  ['text-[#1f4209]', '#c9ea8e'],  // brand green
  ['text-[#3e3b26]', '#b0a882'],  // secondary text
  ['text-[#6b6140]', '#8a8060'],  // muted text
  ['text-[#360f00]', '#ffb597'],  // orange badge text
  ['text-[#002201]', '#c9ea8e'],  // green badge text
  ['text-[#003d57]', '#99cdf0'],  // blue tag text
  ['text-[#001e2d]', '#c6e7ff'],  // blue tag text variant
  // Legacy neutrals (still appear in some generated HTML)
  ['text-[#191c18]', '#ede8d4'],
  ['text-[#154212]', '#c9ea8e'],
  ['text-[#42493e]', '#b0a882'],
  ['text-[#72796e]', '#8a8060'],
];

const _DM_BORDER = [
  ['border-[#dccfac]', '#2e2610'],  // warm border → dark warm border
  ['border-[#bdb08e]', '#2e2610'],  // outline → dark warm
  ['border-[#1f4209]', '#c9ea8e'],  // green border
  // Legacy
  ['border-[#e2e3dc]', '#2e2610'],
  ['border-[#c2c9bb]', '#2e2610'],
  ['border-[#154212]', '#c9ea8e'],
];

// ── 3. Apply / remove dark overrides on a single element ─────
function _dmApply(el) {
  const cls = (typeof el.className === 'string') ? el.className : '';
  for (const [pat, val] of _DM_BG)     { if (cls.includes(pat)) { el.style.setProperty('background-color', val, 'important'); break; } }
  for (const [pat, val] of _DM_TEXT)   { if (cls.includes(pat)) { el.style.setProperty('color', val, 'important'); break; } }
  for (const [pat, val] of _DM_BORDER) { if (cls.includes(pat)) { el.style.setProperty('border-color', val, 'important'); break; } }
}

function _dmRemove(el) {
  el.style.removeProperty('background-color');
  el.style.removeProperty('color');
  el.style.removeProperty('border-color');
}

// ── 4. Walk the full DOM ──────────────────────────────────────
function _applyAll()  { document.querySelectorAll('*').forEach(_dmApply);  }
function _removeAll() { document.querySelectorAll('*').forEach(_dmRemove); }

// ── 5. MutationObserver — handles dynamically added cards ─────
let _observer = null;

function _startObserver() {
  if (_observer) return;
  _observer = new MutationObserver(mutations => {
    for (const m of mutations) {
      m.addedNodes.forEach(node => {
        if (node.nodeType !== 1) return;
        _dmApply(node);
        node.querySelectorAll && node.querySelectorAll('*').forEach(_dmApply);
      });
    }
  });
  _observer.observe(document.body, { childList: true, subtree: true });
}

function _stopObserver() {
  if (_observer) { _observer.disconnect(); _observer = null; }
}

// ── 6. Toggle icon ────────────────────────────────────────────
function _updateIcon(isDark) {
  document.querySelectorAll('.dark-toggle-icon').forEach(el => {
    el.textContent = isDark ? 'light_mode' : 'dark_mode';
  });
}

// ── 7. Public API ─────────────────────────────────────────────
function toggleDarkMode() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  _updateIcon(isDark);
  if (isDark) { _applyAll(); _startObserver(); }
  else        { _stopObserver(); _removeAll(); }
}

// ── 8. On DOM ready ───────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  const isDark = document.documentElement.classList.contains('dark');
  _updateIcon(isDark);
  if (isDark) { _applyAll(); _startObserver(); }
});
