import * as path from 'path';
import * as os from 'os';
import * as inquirer from 'inquirer';

import { MfaTokenCache } from './mfa-token-cache';
import { PrecedenceProfileMapper } from './profile-mapper';

const tokenCache = new MfaTokenCache();

export const tokenCodeFn = async (
  mfaSerial: string,
  callback: (err?: unknown, token?: string) => void,
): Promise<void> => {
  try {
    const { token } = await inquirer.prompt({
      name: 'token',
      type: 'input',
      default: '',
      message: `MFA token for ${mfaSerial}:`,
      validate: async (input) => {
        if (tokenCache.has(mfaSerial, input)) {
          return `Token ${input} has already been used in this run`;
        }

        tokenCache.set(mfaSerial, input);

        return true;
      },
    });
    return callback(undefined, token);
  } catch (e) {
    console.error('error:', e);
    return callback(e, undefined);
  }
};

export const readProfiles = (): Record<string, string> => {
  const profileMapper = new PrecedenceProfileMapper();
  return profileMapper.resolve();
};

export const getSharedCredentialsFilename = (): string =>
  process.env.AWS_SHARED_CREDENTIALS_FILE ??
  path.join(os.homedir(), '.aws', 'credentials');

export const getConfigFilename = (): string =>
  process.env.AWS_CONFIG_FILE ?? path.join(os.homedir(), '.aws', 'config');

export const getSSOCachePath = (): string =>
  path.join(os.homedir(), '.aws', 'sso', 'cache');
