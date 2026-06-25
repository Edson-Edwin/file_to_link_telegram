"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupAdmin = setupAdmin;
const admin_1 = require("../middleware/admin");
function setupAdmin(bot) {
    bot.command('stats', admin_1.requireAdmin, async (ctx) => {
        const msg = `📊 *Bot Statistics*\n\nDatabase-less mode active.\nLinks are stored directly via Telegram Private Storage Channel.`;
        await ctx.reply(msg, { parse_mode: 'Markdown' });
    });
    bot.command('broadcast', admin_1.requireAdmin, async (ctx) => {
        await ctx.reply('Broadcast is disabled in database-less mode since users are not stored.');
    });
}
