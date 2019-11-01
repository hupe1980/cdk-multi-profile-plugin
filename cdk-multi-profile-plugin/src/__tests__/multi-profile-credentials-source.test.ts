import { MultiProfileCredentialsSource } from '../multi-profile-credentials-source';

describe('isAvailable', () => {
  it('should be not available', async () => {
    const mpcs = new MultiProfileCredentialsSource('name', {}, 'filename');
    const actual = await mpcs.isAvailable();
    expect(actual).toBe(false);
  });

  it('should be available', async () => {
    const mpcs = new MultiProfileCredentialsSource(
      'name',
      { '123': 'profile' },
      'filename'
    );
    const actual = await mpcs.isAvailable();
    expect(actual).toBe(true);
  });
});

describe('canProvideCredentials', () => {
  it('can not provide', async () => {
    const mpcs = new MultiProfileCredentialsSource(
      'name',
      { '4711': 'profile' },
      'filename'
    );
    const actual = await mpcs.canProvideCredentials('0815');
    expect(actual).toBe(false);
  });

  it('can provide', async () => {
    const mpcs = new MultiProfileCredentialsSource(
      'name',
      { '4711': 'profile' },
      'filename'
    );
    const actual = await mpcs.canProvideCredentials('4711');
    expect(actual).toBe(true);
  });
});
