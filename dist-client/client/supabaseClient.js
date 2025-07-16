import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://your-project.supabase.co'; // TODO: Replace with your Supabase project URL
const supabaseAnonKey = 'your-anon-key'; // TODO: Replace with your Supabase anon key
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
//# sourceMappingURL=supabaseClient.js.map