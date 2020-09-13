import * as fs from 'fs-extra';
import * as ini from 'ini';

export class ProfileConfig {
  private config: Record<string, Record<string, string>>;

  constructor(path: string) {
    const raw = fs.readFileSync(path, {
      encoding: 'utf-8',
    });

    this.config = ini.parse(raw);
  }

  public getProfile(profile: string): Record<string, string> {
    return this.config[`profile ${profile}`];
  }

  public isSSOProfile(profile: string): boolean {
    const config = this.getProfile(profile);

    if (config?.sso_start_url) return true;

    return false;
  }
}
