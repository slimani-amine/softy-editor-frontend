import { SHA256 } from 'crypto-js';

export function generateUniqueCode(hashCode: string): string | undefined {
  if (!hashCode) {
    return;
  }
  const sha256Hash = SHA256(hashCode).toString();

  const formattedHash =
    sha256Hash
      .substring(0, 16)
      .match(/.{1,4}/g)
      ?.join('-') || '';

  const uniqueCode = formattedHash.toUpperCase();

  return uniqueCode;
}
