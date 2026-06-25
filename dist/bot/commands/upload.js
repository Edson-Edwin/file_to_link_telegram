"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupUploadListener = setupUploadListener;
const link_service_1 = require("../../services/link.service");
const config_1 = require("../config");
const admin_1 = require("../middleware/admin");
function setupUploadListener(bot) {
    bot.on(['message:document', 'message:video', 'message:photo'], admin_1.requireAdmin, async (ctx) => {
        const file = ctx.message.document || ctx.message.video || ctx.message.photo;
        if (!file)
            return;
        if (!config_1.config.dbChannelId) {
            return ctx.reply('DB_CHANNEL_ID is not configured in .env');
        }
        try {
            const copiedMsg = await ctx.api.copyMessage(config_1.config.dbChannelId, ctx.chat.id, ctx.msg.message_id);
            const payload = link_service_1.LinkService.createSignedPayload(copiedMsg.message_id);
            const botUrl = `https://t.me/${config_1.config.botUsername}?start=${payload}`;
            const webUrl = config_1.config.appDomain ? `${config_1.config.appDomain}/api/l?data=${payload}` : null;
            let reply = `File saved successfully!\n\nBot Link:\n${botUrl}`;
            if (webUrl)
                reply += `\n\nWeb Link:\n${webUrl}`;
            reply += `\n\nExpires in 30 minutes.`;
            await ctx.reply(reply);
        }
        catch (e) {
            console.error(e);
            await ctx.reply('Error saving file. Ensure the bot is an admin in the DB Channel.');
        }
    });
}
