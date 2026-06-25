import { Bot } from 'grammy';
import { requireAdmin } from '../middleware/admin';

export function setupAdmin(bot: Bot) {
  bot.command('stats', requireAdmin, async (ctx) => {
    const msg = `📊 *Bot Statistics*\n\nDatabase-less mode active.\nLinks are stored directly via Telegram Private Storage Channel.`;
    await ctx.reply(msg, { parse_mode: 'Markdown' });
  });

  bot.command('broadcast', requireAdmin, async (ctx) => {
    await ctx.reply('Broadcast is disabled in database-less mode since users are not stored.');
  });
}
