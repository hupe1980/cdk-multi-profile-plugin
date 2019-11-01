export class MfaTokenCache {
  private readonly cache: { [mfaSerial: string]: string[] };

  constructor() {
    this.cache = {};
  }

  public has(mfaSerial: string, token: string): boolean {
    if (this.cache[mfaSerial]) {
      return this.cache[mfaSerial].includes(token);
    }
    return false;
  }

  public set(mfaSerial: string, token: string): void {
    if (this.cache[mfaSerial]) {
      this.cache[mfaSerial].push(token);
      return;
    }
    this.cache[mfaSerial] = [token];
  }
}
