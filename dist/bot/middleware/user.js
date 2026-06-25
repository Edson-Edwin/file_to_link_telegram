"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRegister = userRegister;
const user_service_1 = require("../../services/user.service");
async function userRegister(ctx, next) {
    if (ctx.from) {
        await user_service_1.UserService.upsertUser(ctx.from.id, ctx.from.username, ctx.from.first_name);
    }
    await next();
}
