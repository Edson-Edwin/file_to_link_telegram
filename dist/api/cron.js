"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handle;
const link_service_1 = require("../services/link.service");
async function handle(req, res) {
    if (req.method === 'GET' || req.method === 'POST') {
        const authHeader = req.headers.authorization;
        const cronSecret = process.env.CRON_SECRET;
        if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
            return res.status(401).send('Unauthorized');
        }
        try {
            await link_service_1.LinkService.deleteExpiredLinks();
            return res.status(200).send('Expired links cleaned up successfully');
        }
        catch (e) {
            console.error('Cron error:', e);
            return res.status(500).send('Internal Server Error');
        }
    }
    else {
        return res.status(405).send('Method not allowed');
    }
}
