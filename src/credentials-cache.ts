import { Credentials } from 'aws-sdk';

export class CredentialsCache {
  private readonly cache: Map<string, Credentials>;

  constructor() {
    this.cache = new Map();
  }

  public set(accountId: string, credentials: Credentials): void {
    this.cache.set(accountId, credentials);
  }

  public get(accountId: string): Credentials | undefined {
    return this.cache.get(accountId);
  }

  public has(accountId: string): boolean {
    return this.cache.has(accountId);
  }
}
