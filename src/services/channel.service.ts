import { Api } from 'grammy';
import { config } from '../bot/config';

export class ChannelService {
  static async verifyMembership(api: Api, userId: number): Promise<boolean> {
    if (!config.channelId) return true; // Channel not configured, pass check

    try {
      const chatMember = await api.getChatMember(config.channelId, userId);
      return chatMember.status !== 'left' && chatMember.status !== 'kicked';
    } catch (err) {
      console.error('Error checking channel membership:', err);
      return false; // Assume false if the bot can't check
    }
  }

  static getJoinUrl(): string {
    return config.channelUrl || 'https://t.me/telegram';
  }
}
