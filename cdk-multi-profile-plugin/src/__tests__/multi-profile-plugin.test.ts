import { MultiProfilePlugin } from '../multi-profile-plugin';
import { PluginHost } from 'aws-cdk';

const host: PluginHost = {
  credentialProviderSources: [],
  load: jest.fn(),
  registerCredentialProviderSource: jest.fn()
};

beforeEach(() => {
  jest.resetAllMocks();
});

it('should register the credential provider source', async () => {
  const plugin = new MultiProfilePlugin({ profile: '123' }, 'filename');

  plugin.init(host);

  expect(host.registerCredentialProviderSource).toHaveBeenCalledTimes(1);
});

it('should not register the credential provider source', async () => {
  const plugin = new MultiProfilePlugin({ profile: '123' }, 'filename');

  process.env.IGNORE_CDK_MULTI_PROFILE_PLUGIN = 'true';

  plugin.init(host);

  expect(host.registerCredentialProviderSource).toHaveBeenCalledTimes(0);
});
