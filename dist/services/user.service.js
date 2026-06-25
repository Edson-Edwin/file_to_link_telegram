"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const supabase_1 = require("../bot/database/supabase");
class UserService {
    static async upsertUser(telegramId, username, firstName) {
        const { error } = await supabase_1.supabase.from('users').upsert({ telegram_id: telegramId, username: username || null, first_name: firstName || null }, { onConflict: 'telegram_id' });
        if (error)
            console.error('Error upserting user:', error);
    }
    static async getAllUsers() {
        const { data, error } = await supabase_1.supabase.from('users').select('telegram_id');
        if (error) {
            console.error('Error getting all users:', error);
            return [];
        }
        return data;
    }
    static async getTotalUsersCount() {
        const { count } = await supabase_1.supabase.from('users').select('*', { count: 'exact', head: true });
        return count || 0;
    }
}
exports.UserService = UserService;
