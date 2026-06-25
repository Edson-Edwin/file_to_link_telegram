import { Bot, InlineKeyboard } from 'grammy';
import { LinkService } from '../../services/link.service';
import { ChannelService } from '../../services/channel.service';
import { config } from '../config';

export function setupStart(bot: Bot) {
  bot.command('start', async (ctx) => {
    const payload = ctx.match;
    if (!payload) {
      return ctx.reply('Welcome to the File Link Bot.');
    }

    const { messageId, isValid, isExpired } = LinkService.verifyAndDecodePayload(payload);

    if (!isValid) {
      return ctx.reply('This link is invalid or corrupted.');
    }

    if (isExpired) {
      return ctx.reply('This download link has expired.');
    }

    const isMember = await ChannelService.verifyMembership(ctx.api, ctx.from!.id);
    if (!isMember) {
      const keyboard = new InlineKeyboard()
        .url('Join Channel', ChannelService.getJoinUrl())
        .row()
        .text("I've Joined", `verify:${payload}`);
      return ctx.reply('Join channel first', { reply_markup: keyboard });
    }

    const confirmKeyboard = new InlineKeyboard()
      .text('Download', `dl:${payload}`);

    await ctx.reply('Your file is ready:', { reply_markup: confirmKeyboard });
  });
}
