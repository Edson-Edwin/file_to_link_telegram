"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = logger;
async function logger(ctx, next) {
    const start = Date.now();
    console.log(`[${new Date().toISOString()}] Received update ${ctx.update.update_id}`);
    await next();
    const ms = Date.now() - start;
    console.log(`[${new Date().toISOString()}] Processed update ${ctx.update.update_id} in ${ms}ms`);
}
