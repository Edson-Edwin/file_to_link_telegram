"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupCallbacks = setupCallbacks;
const grammy_1 = require("grammy");
const link_service_1 = require("../../services/link.service");
const channel_service_1 = require("../../services/channel.service");
const config_1 = require("../config");
function setupCallbacks(bot) {
    bot.callbackQuery(/^verify:(.+)$/, async (ctx) => {
        const payload = ctx.match[1];
        const isMember = await channel_service_1.ChannelService.verifyMembership(ctx.api, ctx.from.id);
        if (!isMember) {
            return ctx.answerCallbackQuery({
                text: "You haven't joined the channel yet!",
                show_alert: true,
            });
        }
        await ctx.answerCallbackQuery('Verified!');
        const { isValid, isExpired } = link_service_1.LinkService.verifyAndDecodePayload(payload);
        if (!isValid) {
            return ctx.reply('This link is invalid.');
        }
        if (isExpired) {
            return ctx.reply('This download link has expired.');
        }
        const keyboard = new grammy_1.InlineKeyboard().text('Download', `dl:${payload}`);
        await ctx.reply('Your file is ready:', { reply_markup: keyboard });
    });
    bot.callbackQuery(/^dl:(.+)$/, async (ctx) => {
        const payload = ctx.match[1];
        const { messageId, isValid, isExpired } = link_service_1.LinkService.verifyAndDecodePayload(payload);
        if (!isValid) {
            return ctx.answerCallbackQuery({ text: 'This link is invalid.', show_alert: true });
        }
        if (isExpired) {
            return ctx.answerCallbackQuery({ text: 'This download link has expired.', show_alert: true });
        }
        await ctx.answerCallbackQuery();
        try {
            await ctx.api.copyMessage(ctx.chat.id, config_1.config.dbChannelId, messageId);
        }
        catch (e) {
            console.error('Failed to copy message:', e);
            await ctx.reply('Failed to fetch the file. It might have been deleted.');
        }
    });
}
