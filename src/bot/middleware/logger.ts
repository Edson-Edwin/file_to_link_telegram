import { NextFunction, Context } from 'grammy';

export async function logger(ctx: Context, next: NextFunction) {
  const start = Date.now();
  console.log(`[${new Date().toISOString()}] Received update ${ctx.update.update_id}`);
  
  await next();
  
  const ms = Date.now() - start;
  console.log(`[${new Date().toISOString()}] Processed update ${ctx.update.update_id} in ${ms}ms`);
}
