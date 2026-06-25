"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const config_1 = require("../bot/config");
class AuthService {
    static isAdmin(userId) {
        return userId === config_1.config.adminId;
    }
}
exports.AuthService = AuthService;
