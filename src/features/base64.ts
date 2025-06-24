export function encodeBase64(input?: string): string {
  if (!input) {
    throw new Error('No text selected');
  }

  return Buffer.from(input, 'utf8').toString('base64');
}

export function decodeBase64(base64String?: string): string {
  if (!base64String) {
    throw new Error('No text selected');
  }

  return Buffer.from(base64String, 'base64').toString('utf8');
}
