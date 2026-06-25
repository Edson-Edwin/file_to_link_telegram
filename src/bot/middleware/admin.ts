import { NextFunction, Context } from 'grammy';
import { AuthService } from '../../services/auth.service';

export async function requireAdmin(ctx: Context, next: NextFunction) {
  if (ctx.from && AuthService.isAdmin(ctx.from.id)) {
    await next();
  }
}
