import * as fs from 'fs-extra';
import * as path from 'path';

export class SSOLoginCache {
  private files: string[];

  constructor(ssoCachePath: string) {
    try {
      this.files = fs
        .readdirSync(ssoCachePath)
        .map((file) => path.join(ssoCachePath, file));
    } catch (e) {
      this.files = [];
    }
  }

  public getCachedLogin(ssoProfile: Record<string, string>): {
    accessToken: string;
  } {
    for (const file of this.files) {
      const json = fs.readJSONSync(file);
      if (
        json?.startUrl === ssoProfile.sso_start_url &&
        json?.region === ssoProfile.sso_region
      ) {
        return {
          accessToken: json.accessToken,
        };
      }
    }

    throw new Error('Current cached SSO login is expired or invalid');
  }
}
