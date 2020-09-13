import { IniFileCredentialProviderSource } from '../ini-file-credential-provider-source';

describe('isAvailable', () => {
  it('should be not available', async () => {
    const ifcps = new IniFileCredentialProviderSource('name', {}, 'filename');
    const actual = await ifcps.isAvailable();
    expect(actual).toBe(false);
  });

  it('should be available', async () => {
    const ifcps = new IniFileCredentialProviderSource(
      'name',
      { '123': 'profile' },
      'filename',
    );
    const actual = await ifcps.isAvailable();
    expect(actual).toBe(true);
  });
});

describe('canProvideCredentials', () => {
  it('can not provide', async () => {
    const ifcps = new IniFileCredentialProviderSource(
      'name',
      { '4711': 'profile' },
      'filename',
    );
    const actual = await ifcps.canProvideCredentials('0815');
    expect(actual).toBe(false);
  });

  it('can provide', async () => {
    const ifcps = new IniFileCredentialProviderSource(
      'name',
      { '4711': 'profile' },
      'filename',
    );
    const actual = await ifcps.canProvideCredentials('4711');
    expect(actual).toBe(true);
  });
});
