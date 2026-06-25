"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = requireAdmin;
const auth_service_1 = require("../../services/auth.service");
async function requireAdmin(ctx, next) {
    if (ctx.from && auth_service_1.AuthService.isAdmin(ctx.from.id)) {
        await next();
    }
}
