import * as fs from 'fs-extra';

export class SSOLoginCache {
  private files: string[];

  constructor(path: string) {
    try {
      this.files = fs.readdirSync(path);
    } catch (e) {
      this.files = [];
    }
  }

  public getCachedLogin(
    ssoProfile: Record<string, string>,
  ): { accessToken: string } {
    for (const file in this.files) {
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
