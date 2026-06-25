"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handle;
const bot_1 = require("../bot");
async function handle(req, res) {
    try {
        if (req.method === 'POST') {
            await bot_1.bot.handleUpdate(req.body);
        }
        else {
            return res.status(200).send('Telegram File Link Bot is running!');
        }
        return res.status(200).send('OK');
    }
    catch (e) {
        console.error('Webhook error:', e);
        return res.status(500).send('Internal Server Error');
    }
}
