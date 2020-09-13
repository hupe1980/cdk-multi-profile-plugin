import { Credentials } from 'aws-sdk';
import { ProfileCredentialsCache } from '../profile-credentials-cache';

const credentails = new Credentials({
  accessKeyId: 'dummy',
  secretAccessKey: 'dummy',
});

it('should return false if cache is empty', async () => {
  const profileCredentialsCache = new ProfileCredentialsCache();
  expect(profileCredentialsCache.has('profile')).toBe(false);
  expect(profileCredentialsCache.get('profile')).toBe(undefined);
});

it('should return false if credentails are not cached', async () => {
  const profileCredentialsCache = new ProfileCredentialsCache();
  profileCredentialsCache.set('anotherProfile', credentails);
  expect(profileCredentialsCache.has('profile')).toBe(false);
  expect(profileCredentialsCache.get('profile')).toBe(undefined);
});

it('should return true if credentails are cached', async () => {
  const profileCredentialsCache = new ProfileCredentialsCache();
  profileCredentialsCache.set('profile', credentails);
  expect(profileCredentialsCache.has('profile')).toBe(true);
  expect(profileCredentialsCache.get('profile')).toBe(credentails);
});

it('should return true if credentails are listed in cache', async () => {
  const profileCredentialsCache = new ProfileCredentialsCache();
  profileCredentialsCache.set('profile', credentails);
  profileCredentialsCache.set('anotherProfile', credentails);
  expect(profileCredentialsCache.has('profile')).toBe(true);
  expect(profileCredentialsCache.get('profile')).toBe(credentails);
});
