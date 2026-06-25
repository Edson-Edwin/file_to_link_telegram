"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimit = rateLimit;
const userRequests = new Map();
async function rateLimit(ctx, next) {
    if (!ctx.from)
        return next();
    const userId = ctx.from.id;
    const now = Date.now();
    const windowMs = 1000; // 1 second
    const maxRequests = 3; // Max 3 requests per second
    const userData = userRequests.get(userId) || { count: 0, resetTime: now + windowMs };
    if (now > userData.resetTime) {
        userData.count = 1;
        userData.resetTime = now + windowMs;
    }
    else {
        userData.count++;
    }
    userRequests.set(userId, userData);
    if (userData.count > maxRequests) {
        console.warn(`Rate limit exceeded for user ${userId}`);
        return; // Ignore request
    }
    await next();
}
