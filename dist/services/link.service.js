"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkService = void 0;
const crypto_1 = require("../bot/utils/crypto");
class LinkService {
    static createSignedPayload(messageId) {
        const expiresAt = Date.now() + 30 * 60 * 1000; // 30 mins
        return (0, crypto_1.signPayload)(messageId, expiresAt);
    }
    static verifyAndDecodePayload(payload) {
        return (0, crypto_1.verifyPayload)(payload);
    }
}
exports.LinkService = LinkService;
