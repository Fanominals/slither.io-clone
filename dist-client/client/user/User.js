export class User {
    constructor({ id, email, username, lastSeen, score }) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.lastSeen = lastSeen;
        this.score = score;
    }
    static fromSupabase(user) {
        return new User({
            id: user.id,
            email: user.email,
            username: user.user_metadata?.full_name || user.email,
            lastSeen: new Date().toISOString(),
            score: 0,
        });
    }
    async saveToDatabase(supabase) {
        const { data, error } = await supabase
            .from('players')
            .upsert({
            id: this.id,
            email: this.email,
            username: this.username,
            last_seen: this.lastSeen,
            score: this.score,
        }, { onConflict: ['id'] });
        if (error)
            throw error;
        return data;
    }
}
//# sourceMappingURL=User.js.map