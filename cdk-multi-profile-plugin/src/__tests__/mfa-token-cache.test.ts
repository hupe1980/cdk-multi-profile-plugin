import { MfaTokenCache } from '../mfa-token-cache';

it('should return false if cache is empty', async () => {
  const tokenCache = new MfaTokenCache();
  expect(tokenCache.has('mfaSerial', '4711')).toBe(false);
});

it('should return false if token is not cached', async () => {
  const tokenCache = new MfaTokenCache();
  tokenCache.set('mfaSerial', '4711');
  expect(tokenCache.has('mfaSerial', '0815')).toBe(false);
});

it('should return true if token is cached', async () => {
  const tokenCache = new MfaTokenCache();
  tokenCache.set('mfaSerial', '4711');
  expect(tokenCache.has('mfaSerial', '4711')).toBe(true);
});

it('should return true if token is listed in cache', async () => {
  const tokenCache = new MfaTokenCache();
  tokenCache.set('mfaSerial', '4711');
  tokenCache.set('mfaSerial', '0815');
  expect(tokenCache.has('mfaSerial', '4711')).toBe(true);
});
