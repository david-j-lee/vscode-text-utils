import * as crypto from 'crypto';

export function hashString(
  input: string | undefined,
  algorithm: 'md5' | 'sha1' | 'sha256',
): string {
  if (!input) {
    throw new Error('No text selected');
  }

  return crypto.createHash(algorithm).update(input).digest('hex');
}
