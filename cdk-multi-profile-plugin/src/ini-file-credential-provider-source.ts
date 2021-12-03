import { green } from 'colors/safe';
import isEmpty from 'lodash.isempty';
import { SharedIniFileCredentials, Credentials, SSO } from 'aws-sdk';
import { CredentialProviderSource, Mode } from 'aws-cdk/lib/api/aws-auth/credentials';

import { tokenCodeFn, getConfigFilename, getSSOCachePath } from './utils';
import { ProfileCredentialsCache } from './profile-credentials-cache';
import { ProfileConfig } from './profile-config';
import { SSOLoginCache } from './sso-login-cache';

const profileCredentialsCache = new ProfileCredentialsCache();

export class IniFileCredentialProviderSource
  implements CredentialProviderSource {
  private profileConfig: ProfileConfig;
  private ssoLoginCache: SSOLoginCache;

  constructor(
    public readonly name: string,
    private readonly profiles: { [key: string]: string },
    private readonly filename: string,
  ) {
    this.profileConfig = new ProfileConfig(getConfigFilename());
    this.ssoLoginCache = new SSOLoginCache(getSSOCachePath());
  }

  public canProvideCredentials(accountId: string): Promise<boolean> {
    return Promise.resolve(
      Object.prototype.hasOwnProperty.call(this.profiles, accountId),
    );
  }

  public async getProvider(
    accountId: string,
    mode: Mode,
  ): Promise<Credentials> {
    const profile = this.profiles[accountId];

    console.log('\n');
    console.log(
      ` 🚀  Using profile ${green(profile)} for account ${green(
        accountId,
      )} in mode ${green(Mode[mode])}`,
    );
    console.log('\n');

    let credentials = profileCredentialsCache.get(profile);

    if (!credentials) {
      if (this.profileConfig.isSSOProfile(profile)) {
        const ssoProfile = this.profileConfig.getProfile(profile);
        const ssoLogin = this.ssoLoginCache.getCachedLogin(ssoProfile);

        const sso = new SSO({ region: ssoProfile.sso_region });

        const { roleCredentials } = await sso
          .getRoleCredentials({
            accessToken: ssoLogin.accessToken,
            accountId: ssoProfile.sso_account_id,
            roleName: ssoProfile.sso_role_name,
          })
          .promise();

        if (
          !roleCredentials?.accessKeyId ||
          !roleCredentials.secretAccessKey ||
          !roleCredentials.sessionToken
        )
          throw new Error('Invalid roleCredentials!');

        credentials = new Credentials({
          accessKeyId: roleCredentials.accessKeyId,
          secretAccessKey: roleCredentials.secretAccessKey,
          sessionToken: roleCredentials.sessionToken,
        });
      } else {
        credentials = new SharedIniFileCredentials({
          tokenCodeFn,
          filename: this.filename,
          profile,
        });
      }

      profileCredentialsCache.set(profile, credentials);
    }

    return Promise.resolve(credentials);
  }

  public isAvailable(): Promise<boolean> {
    if (this.filename && !isEmpty(this.profiles)) return Promise.resolve(true);

    return Promise.resolve(false);
  }
}
