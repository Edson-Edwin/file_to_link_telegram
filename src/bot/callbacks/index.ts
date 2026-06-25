import { Bot, InlineKeyboard } from 'grammy';
import { LinkService } from '../../services/link.service';
import { ChannelService } from '../../services/channel.service';
import { config } from '../config';

export function setupCallbacks(bot: Bot) {
  bot.callbackQuery(/^verify:(.+)$/, async (ctx) => {
    const payload = ctx.match[1];

    const isMember = await ChannelService.verifyMembership(ctx.api, ctx.from.id);
    if (!isMember) {
      return ctx.answerCallbackQuery({
        text: "You haven't joined the channel yet!",
        show_alert: true,
      });
    }

    await ctx.answerCallbackQuery('Verified!');

    const { isValid, isExpired } = LinkService.verifyAndDecodePayload(payload);

    if (!isValid) {
      return ctx.reply('This link is invalid.');
    }

    if (isExpired) {
      return ctx.reply('This download link has expired.');
    }

    const keyboard = new InlineKeyboard().text('Download', `dl:${payload}`);
    await ctx.reply('Your file is ready:', { reply_markup: keyboard });
  });

  bot.callbackQuery(/^dl:(.+)$/, async (ctx) => {
    const payload = ctx.match[1];
    
    const { messageId, isValid, isExpired } = LinkService.verifyAndDecodePayload(payload);

    if (!isValid) {
      return ctx.answerCallbackQuery({ text: 'This link is invalid.', show_alert: true });
    }

    if (isExpired) {
      return ctx.answerCallbackQuery({ text: 'This download link has expired.', show_alert: true });
    }

    await ctx.answerCallbackQuery();
    
    try {
      await ctx.api.copyMessage(ctx.chat!.id, config.dbChannelId, messageId);
    } catch (e) {
      console.error('Failed to copy message:', e);
      await ctx.reply('Failed to fetch the file. It might have been deleted.');
    }
  });
}
