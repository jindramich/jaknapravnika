// ============================================================
//  LEAD MODAL — JakNaPravnika.cz
//  Shared contact modal + Supabase lead saving + EmailJS notify
// ============================================================

// Inject the modal HTML once into the page
function initLeadModal() {
  if (document.getElementById('leadModal')) return;
  const modal = document.createElement('div');
  modal.id = 'leadModal';
  modal.className = 'fixed inset-0 z-[999] flex items-center justify-center p-4 bg-[#191c18]/40 backdrop-blur-sm hidden';
  modal.innerHTML = `
    <div id="leadModalBox" class="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all scale-95 opacity-0">
      <!-- Header -->
      <div class="bg-gradient-to-br from-[#154212] to-[#2d5a27] px-8 py-6">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-[#bcf0ae] text-xs font-bold uppercase tracking-widest mb-1">Nezávazná poptávka</p>
            <h2 class="text-white text-2xl font-extrabold font-['Plus_Jakarta_Sans'] leading-tight" id="modalAttorneyName">Kontaktovat advokáta</h2>
            <p class="text-white/70 text-sm mt-1" id="modalFirmName"></p>
          </div>
          <button onclick="closeLeadModal()" class="text-white/60 hover:text-white transition-colors mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
      </div>

      <!-- Body -->
      <div class="px-8 py-6" id="modalFormWrapper">
        <p class="text-[#42493e] text-sm mb-6 leading-relaxed">Vyplňte kontaktní údaje. <strong>Advokáta přímo neoslovíme</strong> — váš dotaz nejprve zpracujeme a do 24 hodin vás propojíme s tím pravým odborníkem.</p>

        <form id="leadForm" class="space-y-4" novalidate>
          <input type="hidden" id="modalAttorneyId" value="">
          <input type="hidden" id="modalQuizResponseId" value="">

          <div>
            <label class="block text-xs font-bold text-[#72796e] uppercase tracking-wider mb-1.5">Vaše jméno *</label>
            <input type="text" id="leadName" required placeholder="Jan Novák"
              class="w-full bg-[#f3f4ed] border-none rounded-xl px-4 py-3 text-[#191c18] placeholder:text-[#72796e] focus:ring-2 focus:ring-[#154212]/20 focus:bg-white transition-all outline-none text-sm">
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-[#72796e] uppercase tracking-wider mb-1.5">Telefon</label>
              <input type="tel" id="leadPhone" placeholder="+420 123 456 789"
                class="w-full bg-[#f3f4ed] border-none rounded-xl px-4 py-3 text-[#191c18] placeholder:text-[#72796e] focus:ring-2 focus:ring-[#154212]/20 focus:bg-white transition-all outline-none text-sm">
            </div>
            <div>
              <label class="block text-xs font-bold text-[#72796e] uppercase tracking-wider mb-1.5">E-mail *</label>
              <input type="email" id="leadEmail" required placeholder="jan@email.cz"
                class="w-full bg-[#f3f4ed] border-none rounded-xl px-4 py-3 text-[#191c18] placeholder:text-[#72796e] focus:ring-2 focus:ring-[#154212]/20 focus:bg-white transition-all outline-none text-sm">
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-[#72796e] uppercase tracking-wider mb-1.5">Stručný popis situace</label>
            <textarea id="leadMessage" rows="3" placeholder="Napište nám krátce, co potřebujete řešit..."
              class="w-full bg-[#f3f4ed] border-none rounded-xl px-4 py-3 text-[#191c18] placeholder:text-[#72796e] focus:ring-2 focus:ring-[#154212]/20 focus:bg-white transition-all outline-none text-sm resize-none"></textarea>
          </div>

          <p id="leadError" class="hidden text-[#ba1a1a] text-xs font-medium bg-[#ffdad6] px-3 py-2 rounded-lg"></p>

          <button type="submit" id="leadSubmitBtn"
            class="w-full bg-gradient-to-br from-[#154212] to-[#2d5a27] text-white font-bold py-4 rounded-full text-base active:scale-95 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
            <span id="leadBtnText">Odeslat poptávku</span>
            <svg id="leadSpinner" class="hidden w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
            </svg>
          </button>

          <p class="text-center text-[#72796e] text-xs">
            <span class="inline-flex items-center gap-1">
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/></svg>
              Vaše údaje jsou v bezpečí. Nepředáváme je třetím stranám.
            </span>
          </p>
        </form>
      </div>

      <!-- Success state (hidden by default) -->
      <div id="modalSuccess" class="hidden px-8 py-12 text-center">
        <div class="w-16 h-16 bg-[#bcf0ae] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-8 h-8 text-[#154212]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <h3 class="text-2xl font-extrabold text-[#154212] font-['Plus_Jakarta_Sans'] mb-3">Poptávka přijata!</h3>
        <p class="text-[#42493e] leading-relaxed mb-6">Vaši žádost jsme přijali a do <strong>24 hodin</strong> vás propojíme s tím pravým advokátem. Zkontrolujte svůj e-mail.</p>
        <button onclick="closeLeadModal()" class="px-8 py-3 bg-[#f3f4ed] text-[#154212] font-bold rounded-full hover:bg-[#e7e9e1] transition-colors">
          Zavřít
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  // Animate in when shown
  modal.addEventListener('click', (e) => { if (e.target === modal) closeLeadModal(); });

  // Form submit
  document.getElementById('leadForm').addEventListener('submit', handleLeadSubmit);
}

// Open modal pre-filled with attorney info
function openLeadModal(attorneyId, attorneyName, firmName, quizResponseId = '') {
  initLeadModal();
  document.getElementById('modalAttorneyId').value = attorneyId;
  document.getElementById('modalAttorneyName').textContent = 'Kontaktovat: ' + attorneyName;
  document.getElementById('modalFirmName').textContent = firmName || '';
  document.getElementById('modalQuizResponseId').value = quizResponseId || '';
  // Reset form state
  document.getElementById('leadForm').reset();
  document.getElementById('leadForm').classList.remove('hidden');
  document.getElementById('modalFormWrapper').classList.remove('hidden');
  document.getElementById('modalSuccess').classList.add('hidden');
  document.getElementById('leadError').classList.add('hidden');
  document.getElementById('leadBtnText').textContent = 'Odeslat poptávku';
  document.getElementById('leadSpinner').classList.add('hidden');
  document.getElementById('leadSubmitBtn').disabled = false;
  // Show modal
  const modal = document.getElementById('leadModal');
  modal.classList.remove('hidden');
  setTimeout(() => {
    document.getElementById('leadModalBox').classList.remove('scale-95', 'opacity-0');
    document.getElementById('leadModalBox').classList.add('scale-100', 'opacity-100');
  }, 10);
  document.body.style.overflow = 'hidden';
}

function closeLeadModal() {
  const modal = document.getElementById('leadModal');
  const box = document.getElementById('leadModalBox');
  box.classList.add('scale-95', 'opacity-0');
  box.classList.remove('scale-100', 'opacity-100');
  setTimeout(() => { modal.classList.add('hidden'); }, 200);
  document.body.style.overflow = '';
}

async function handleLeadSubmit(e) {
  e.preventDefault();
  const name    = document.getElementById('leadName').value.trim();
  const email   = document.getElementById('leadEmail').value.trim();
  const phone   = document.getElementById('leadPhone').value.trim();
  const message = document.getElementById('leadMessage').value.trim();
  const attorneyId   = document.getElementById('modalAttorneyId').value;
  const quizRespId   = document.getElementById('modalQuizResponseId').value;
  const attorneyName = document.getElementById('modalAttorneyName').textContent.replace('Kontaktovat: ', '');

  // Basic validation
  const errorEl = document.getElementById('leadError');
  if (!name) { showLeadError('Prosím vyplňte své jméno.'); return; }
  if (!email && !phone) { showLeadError('Vyplňte prosím alespoň e-mail nebo telefon.'); return; }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showLeadError('Zadejte platnou e-mailovou adresu.'); return; }
  errorEl.classList.add('hidden');

  // Loading state
  document.getElementById('leadBtnText').textContent = 'Odesílám…';
  document.getElementById('leadSpinner').classList.remove('hidden');
  document.getElementById('leadSubmitBtn').disabled = true;

  try {
    // 1. Save lead to Supabase
    const leadData = {
      attorney_id:      parseInt(attorneyId) || null,
      attorney_name:    attorneyName,
      quiz_response_id: quizRespId || null,
      contact_name:     name,
      contact_email:    email || null,
      contact_phone:    phone || null,
      message:          message || null,
      status:           'nova'
    };

    try {
      const { error } = await supabase.from('leads').insert([leadData]);
      if (error) console.warn('Supabase insert error:', error.message);
    } catch (err) {
      console.warn('Supabase not configured yet, skipping DB save:', err.message);
    }

    // 2. Send e-mail notification to owner via Web3Forms
    try {
      const w3fResponse = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key:  '379cea1f-d59f-4179-9e4c-6d780240ee34',
          subject:     'Nová poptávka – JakNaPravnika.cz',
          from_name:   'JakNaPravnika.cz',
          name:        name,
          email:       email || 'nezadán',
          phone:       phone || '—',
          attorney:    attorneyName,
          message:     message || '—',
          submitted_at: new Date().toLocaleString('cs-CZ'),
          botcheck:    false
        })
      });
      const w3fResult = await w3fResponse.json();
      if (!w3fResult.success) console.warn('Web3Forms error:', w3fResult.message);
    } catch (emailErr) {
      console.warn('Web3Forms email failed:', emailErr.message);
    }

    // 3. Show success (even if backend not yet configured — for demo purposes)
    document.getElementById('modalFormWrapper').classList.add('hidden');
    document.getElementById('modalSuccess').classList.remove('hidden');

  } catch (err) {
    showLeadError('Nepodařilo se odeslat poptávku. Zkuste to prosím znovu.');
    document.getElementById('leadBtnText').textContent = 'Odeslat poptávku';
    document.getElementById('leadSpinner').classList.add('hidden');
    document.getElementById('leadSubmitBtn').disabled = false;
  }
}

function showLeadError(msg) {
  const el = document.getElementById('leadError');
  el.textContent = msg;
  el.classList.remove('hidden');
  document.getElementById('leadBtnText').textContent = 'Odeslat poptávku';
  document.getElementById('leadSpinner').classList.add('hidden');
  document.getElementById('leadSubmitBtn').disabled = false;
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLeadModal();
});
