import { config } from '../bot/config';

export class AuthService {
  static isAdmin(userId: number): boolean {
    return userId === config.adminId;
  }
}
