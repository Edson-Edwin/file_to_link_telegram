"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupStart = setupStart;
const grammy_1 = require("grammy");
const link_service_1 = require("../../services/link.service");
const channel_service_1 = require("../../services/channel.service");
function setupStart(bot) {
    bot.command('start', async (ctx) => {
        const payload = ctx.match;
        if (!payload) {
            return ctx.reply('Welcome to the File Link Bot.');
        }
        const { messageId, isValid, isExpired } = link_service_1.LinkService.verifyAndDecodePayload(payload);
        if (!isValid) {
            return ctx.reply('This link is invalid or corrupted.');
        }
        if (isExpired) {
            return ctx.reply('This download link has expired.');
        }
        const isMember = await channel_service_1.ChannelService.verifyMembership(ctx.api, ctx.from.id);
        if (!isMember) {
            const keyboard = new grammy_1.InlineKeyboard()
                .url('Join Channel', channel_service_1.ChannelService.getJoinUrl())
                .row()
                .text("I've Joined", `verify:${payload}`);
            return ctx.reply('Join channel first', { reply_markup: keyboard });
        }
        const confirmKeyboard = new grammy_1.InlineKeyboard()
            .text('Download', `dl:${payload}`);
        await ctx.reply('Your file is ready:', { reply_markup: confirmKeyboard });
    });
}
