import crypto from 'crypto';
import { config } from '../config';

export function signPayload(messageId: number, expiresAt: number): string {
  const data = `${messageId}_${expiresAt}`;
  const hmac = crypto.createHmac('sha256', config.botToken).update(data).digest('hex').substring(0, 10);
  return `${data}_${hmac}`;
}

export function verifyPayload(payload: string): { messageId: number; isValid: boolean; isExpired: boolean } {
  const parts = payload.split('_');
  if (parts.length !== 3) return { messageId: 0, isValid: false, isExpired: true };
  const [msgIdStr, expStr, signature] = parts;
  
  const expectedHmac = crypto.createHmac('sha256', config.botToken).update(`${msgIdStr}_${expStr}`).digest('hex').substring(0, 10);
  if (expectedHmac !== signature) return { messageId: 0, isValid: false, isExpired: true };
  
  const expiresAt = parseInt(expStr, 10);
  const isExpired = Date.now() > expiresAt;
  
  return { messageId: parseInt(msgIdStr, 10), isValid: true, isExpired };
}
