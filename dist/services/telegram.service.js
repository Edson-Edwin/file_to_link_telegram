"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramService = void 0;
class TelegramService {
    static async sendFile(ctx, fileId, options = {}) {
        try {
            await ctx.replyWithDocument(fileId, options);
        }
        catch (e) {
            try {
                await ctx.replyWithVideo(fileId, options);
            }
            catch (innerE) {
                console.error('Failed to send file:', innerE);
                await ctx.reply('Failed to send file.');
            }
        }
    }
    static async broadcast(api, users, text) {
        let success = 0;
        let failed = 0;
        for (const user of users) {
            try {
                await api.sendMessage(user.telegram_id, text);
                success++;
                await new Promise((resolve) => setTimeout(resolve, 50)); // rate limit 20 per sec
            }
            catch (e) {
                failed++;
            }
        }
        return { success, failed };
    }
}
exports.TelegramService = TelegramService;
