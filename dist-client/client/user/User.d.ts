export interface UserData {
    id: string;
    email: string;
    username: string;
    lastSeen: string;
    score: number;
}
export declare class User implements UserData {
    id: string;
    email: string;
    username: string;
    lastSeen: string;
    score: number;
    constructor({ id, email, username, lastSeen, score }: UserData);
    static fromSupabase(user: any): User;
    saveToDatabase(supabase: any): Promise<any>;
}
