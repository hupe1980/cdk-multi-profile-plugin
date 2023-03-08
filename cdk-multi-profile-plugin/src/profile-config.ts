import * as fs from 'fs-extra';
import * as ini from 'ini';

export class ProfileConfig {
  private config: Record<string, Record<string, string>>;

  constructor(path: string) {
    try {
      const raw = fs.readFileSync(path, {
        encoding: 'utf-8',
      });

      this.config = ini.parse(raw);
    } catch (e) {
      this.config = {};
    }
  }

  public getProfile(profile: string): Record<string, string> {
    return this.config[`profile ${profile}`];
  }

  public getSSOSession(ssoSession: string): Record<string, string> {
    return this.config[`sso-session ${ssoSession}`];
  }

  public getSSOSettings(profile: string): Record<string, string> {
    if (!this.isSSOProfile(profile)) return {};

    const config = this.getProfile(profile);
    let ssoConfig: Record<string, string> = {};
    if (config?.sso_session) {
      ssoConfig = this.getSSOSession(config.sso_session);
    }
    const ssoSettings = {
      sso_start_url: config?.sso_start_url ?? ssoConfig?.sso_start_url,
      sso_region: config?.sso_region ?? ssoConfig?.sso_region,
    };
    return ssoSettings;
  }

  public isSSOProfile(profile: string): boolean {
    const config = this.getProfile(profile);

    return Boolean(config?.sso_start_url || config?.sso_session);
  }
}
