import * as path from 'path';
import * as os from 'os';
import * as inquirer from 'inquirer';

import {
  AssumeRolePluginConfig,
  PrecedenceProfileMapper,
} from './profile-mapper';

export const tokenCodeFn = async (
  mfaSerial: string,
  callback: (err?: Error, token?: string) => void,
): Promise<void> => {
  try {
    const { token } = await inquirer.prompt({
      name: 'token',
      type: 'input',
      default: '',
      message: `MFA token for ${mfaSerial}:`,
      // validate: async (input: string) => {
      //   return true;
      // }
    });
    return callback(undefined, token);
  } catch (e) {
    console.error('error:', e);
    return callback(e, undefined);
  }
};

export const readProfiles = (): AssumeRolePluginConfig => {
  return new PrecedenceProfileMapper().resolve();
};

export const getSharedCredentialsFilename = (): string =>
  process.env.AWS_SHARED_CREDENTIALS_FILE ||
  path.join(os.homedir(), '.aws', 'credentials');
