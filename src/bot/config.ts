import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
  botToken: process.env.BOT_TOKEN || '',
  botUsername: process.env.BOT_USERNAME || '',
  adminId: Number(process.env.ADMIN_ID) || 0,
  channelId: process.env.CHANNEL_ID || '',
  channelUrl: process.env.CHANNEL_URL || '',
  dbChannelId: process.env.DB_CHANNEL_ID || '',
  appDomain: process.env.APP_DOMAIN || '',
};
