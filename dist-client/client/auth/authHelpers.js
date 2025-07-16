import { supabase } from '../supabase/supabaseClient';
export async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({ provider: 'google' });
}
export async function signOut() {
    await supabase.auth.signOut();
}
export function subscribeToAuthChanges(callback) {
    return supabase.auth.onAuthStateChange((_event, session) => {
        callback(session);
    });
}
//# sourceMappingURL=authHelpers.js.map