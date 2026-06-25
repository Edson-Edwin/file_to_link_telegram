import { signPayload, verifyPayload } from '../bot/utils/crypto';

export class LinkService {
  static createSignedPayload(messageId: number): string {
    const expiresAt = Date.now() + 30 * 60 * 1000; // 30 mins
    return signPayload(messageId, expiresAt);
  }

  static verifyAndDecodePayload(payload: string): { messageId: number; isValid: boolean; isExpired: boolean } {
    return verifyPayload(payload);
  }
}
