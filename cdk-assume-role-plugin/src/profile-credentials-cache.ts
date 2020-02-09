import { Credentials } from 'aws-sdk';

export class ProfileCredentialsCache {
  private readonly cache: { [profile: string]: Credentials };

  constructor() {
    this.cache = {};
  }

  public set(profile: string, credentials: Credentials): void {
    this.cache[profile] = credentials;
  }

  public get(profile: string): Credentials | undefined {
    return this.cache[profile];
  }

  public has(profile: string): boolean {
    return !!this.cache[profile];
  }
}
