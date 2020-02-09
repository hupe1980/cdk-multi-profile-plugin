import { green } from 'colors/safe';
import isEmpty from 'lodash.isempty';
import {
  SharedIniFileCredentials,
  Credentials,
  TemporaryCredentials
} from 'aws-sdk';
import { CredentialProviderSource, Mode } from 'aws-cdk';

import { tokenCodeFn } from './utils';
import { ProfileCredentialsCache } from './profile-credentials-cache';

const profileCredentialsCache = new ProfileCredentialsCache();

export class TemporaryCredentialProviderSource
  implements CredentialProviderSource {
  constructor(
    public readonly name: string,
    private readonly profile: string,
    private readonly roles: Record<string, string>,
    private readonly filename: string
  ) {}

  public canProvideCredentials(accountId: string): Promise<boolean> {
    return Promise.resolve(
      Object.prototype.hasOwnProperty.call(this.roles, accountId)
    );
  }

  public getProvider(accountId: string, mode: Mode): Promise<Credentials> {
    const roleArn = `arn:aws:iam::${accountId}:role/${this.roles[accountId]}`;

    console.log('\n');
    console.log(
      ` 🚀  Using role ${green(roleArn)} for account ${green(
        accountId
      )} in mode ${green(Mode[mode])}`
    );
    console.log('\n');

    let masterCredentials = profileCredentialsCache.get(this.profile);

    if (!masterCredentials) {
      masterCredentials = new SharedIniFileCredentials({
        tokenCodeFn,
        filename: this.filename,
        profile: this.profile
      });

      profileCredentialsCache.set(this.profile, masterCredentials);
    }

    const credentials = new TemporaryCredentials(
      {
        RoleArn: roleArn,
        RoleSessionName: 'cdk-assume-role-plugin'
      },
      masterCredentials
    );

    return Promise.resolve(credentials);
  }

  public isAvailable(): Promise<boolean> {
    if (this.filename && !isEmpty(this.roles)) return Promise.resolve(true);

    return Promise.resolve(false);
  }
}
