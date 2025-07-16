import { supabase } from '../supabase/supabaseClient';
import { User } from './User';
export async function syncUserWithDatabase(authUser) {
    const user = User.fromSupabase(authUser);
    // Check if user exists
    const { data, error } = await supabase
        .from('players')
        .select('*')
        .eq('id', user.id)
        .single();
    if (error && error.code !== 'PGRST116')
        throw error; // PGRST116: No rows found
    if (!data) {
        // User does not exist, create
        await user.saveToDatabase(supabase);
    }
    else {
        // User exists, update lastSeen
        user.lastSeen = new Date().toISOString();
        user.score = data.score ?? 0;
        await user.saveToDatabase(supabase);
    }
    return user;
}
//# sourceMappingURL=userDbSync.js.map