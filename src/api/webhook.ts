import { VercelRequest, VercelResponse } from '@vercel/node';
import { bot } from '../bot';

let isBotInitialized = false;

export default async function handle(req: VercelRequest, res: VercelResponse) {
  try {
    if (!isBotInitialized) {
      await bot.init();
      isBotInitialized = true;
    }

    if (req.method === 'POST') {
      await bot.handleUpdate(req.body);
    } else {
      return res.status(200).send('Telegram File Link Bot is running!');
    }
    return res.status(200).send('OK');
  } catch (e: any) {
    console.error('Webhook error:', e);
    return res.status(500).send(`Internal Server Error: ${e.message}\nStack: ${e.stack}`);
  }
}
