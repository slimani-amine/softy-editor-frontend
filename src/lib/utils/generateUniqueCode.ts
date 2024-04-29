import { SHA256 } from 'crypto-js';

export function generateUniqueCode(hashCode: string): string | undefined {
  if (!hashCode) {
    return;
  }
  // Generate SHA-256 hash
  const sha256Hash = SHA256(hashCode).toString();

  // Take the first 16 characters of the hash and format them into groups of 4
  const formattedHash =
    sha256Hash
      .substring(0, 16)
      .match(/.{1,4}/g)
      ?.join('-') || '';

  // Convert the formatted hash to uppercase
  const uniqueCode = formattedHash.toUpperCase();

  return uniqueCode;
}
