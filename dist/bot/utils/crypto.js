"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signPayload = signPayload;
exports.verifyPayload = verifyPayload;
const crypto_1 = __importDefault(require("crypto"));
const config_1 = require("../config");
function signPayload(messageId, expiresAt) {
    const data = `${messageId}_${expiresAt}`;
    const hmac = crypto_1.default.createHmac('sha256', config_1.config.botToken).update(data).digest('hex').substring(0, 10);
    return `${data}_${hmac}`;
}
function verifyPayload(payload) {
    const parts = payload.split('_');
    if (parts.length !== 3)
        return { messageId: 0, isValid: false, isExpired: true };
    const [msgIdStr, expStr, signature] = parts;
    const expectedHmac = crypto_1.default.createHmac('sha256', config_1.config.botToken).update(`${msgIdStr}_${expStr}`).digest('hex').substring(0, 10);
    if (expectedHmac !== signature)
        return { messageId: 0, isValid: false, isExpired: true };
    const expiresAt = parseInt(expStr, 10);
    const isExpired = Date.now() > expiresAt;
    return { messageId: parseInt(msgIdStr, 10), isValid: true, isExpired };
}
