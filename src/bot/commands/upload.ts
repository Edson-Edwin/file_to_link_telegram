import { Bot } from 'grammy';
import { LinkService } from '../../services/link.service';
import { config } from '../config';
import { requireAdmin } from '../middleware/admin';

export function setupUploadListener(bot: Bot) {
  bot.on(['message:document', 'message:video', 'message:photo'], requireAdmin, async (ctx) => {
    const file = ctx.message.document || ctx.message.video || ctx.message.photo;
    if (!file) return;

    if (!config.dbChannelId) {
      return ctx.reply('DB_CHANNEL_ID is not configured in .env');
    }

    try {
      const copiedMsg = await ctx.api.copyMessage(config.dbChannelId, ctx.chat.id, ctx.msg.message_id);
      const payload = LinkService.createSignedPayload(copiedMsg.message_id);

      const botUrl = `https://t.me/${config.botUsername}?start=${payload}`;
      const webUrl = config.appDomain ? `${config.appDomain}/api/l?data=${payload}` : null;
      
      let reply = `File saved successfully!\n\nBot Link:\n${botUrl}`;
      if (webUrl) reply += `\n\nWeb Link:\n${webUrl}`;
      reply += `\n\nExpires in 30 minutes.`;

      await ctx.reply(reply);
    } catch (e) {
      console.error(e);
      await ctx.reply('Error saving file. Ensure the bot is an admin in the DB Channel.');
    }
  });
}
