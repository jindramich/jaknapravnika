// ============================================================
//  SUPABASE CONFIGURATION — JakNaPravnika.cz
//  Follow SETUP.md to get your own keys from supabase.com
// ============================================================

const SUPABASE_URL  = 'https://wtswekfelqwrrukahvuy.supabase.co';
const SUPABASE_ANON = 'PASTE_ANON_KEY_HERE';  // ← copy from Supabase → Settings → API Keys → Legacy → anon → Copy

// Initialise the Supabase client (loaded via CDN in every HTML page)
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON);

// Owner e-mail that receives every new lead
const OWNER_EMAIL = 'highachieversdream@gmail.com';
