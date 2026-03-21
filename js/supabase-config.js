// ============================================================
//  SUPABASE CONFIGURATION — JakNaPravnika.cz
//  Follow SETUP.md to get your own keys from supabase.com
// ============================================================

const SUPABASE_URL  = 'https://wtswekfelqwrrukahvuy.supabase.co';
const SUPABASE_ANON = 'PASTE_ANON_KEY_HERE';  // ← copy from Supabase → Settings → API Keys → Legacy → anon → Copy

// Initialise the Supabase client (loaded via CDN in every HTML page)
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON);

// ============================================================
//  EMAILJS CONFIGURATION  (emailjs.com — free 200 mails/month)
// ============================================================
const EMAILJS_SERVICE_ID  = 'YOUR_EMAILJS_SERVICE_ID';   // e.g. service_abc123
const EMAILJS_TEMPLATE_ID = 'YOUR_EMAILJS_TEMPLATE_ID';  // e.g. template_xyz789
const EMAILJS_PUBLIC_KEY  = 'YOUR_EMAILJS_PUBLIC_KEY';   // e.g. AbCdEfGhIjKlMnOp

// Owner e-mail that receives every new lead
const OWNER_EMAIL = 'michael8jindra@gmail.com';
