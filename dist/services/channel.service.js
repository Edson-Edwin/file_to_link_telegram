"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelService = void 0;
const config_1 = require("../bot/config");
class ChannelService {
    static async verifyMembership(api, userId) {
        if (!config_1.config.channelId)
            return true; // Channel not configured, pass check
        try {
            const chatMember = await api.getChatMember(config_1.config.channelId, userId);
            return chatMember.status !== 'left' && chatMember.status !== 'kicked';
        }
        catch (err) {
            console.error('Error checking channel membership:', err);
            return false; // Assume false if the bot can't check
        }
    }
    static getJoinUrl() {
        return config_1.config.channelUrl || 'https://t.me/telegram';
    }
}
exports.ChannelService = ChannelService;
