import { MultiProfilePlugin } from '../multi-profile-plugin';
import {ContextProviderPlugin, PluginHost} from 'aws-cdk/lib/api/plugin';

const host: PluginHost = {
    credentialProviderSources: [],
    load: jest.fn(),
    registerCredentialProviderSource: jest.fn(),
    contextProviderPlugins: {},
    registerContextProviderAlpha: function (_pluginProviderName: string, _provider: ContextProviderPlugin): void {
        throw new Error('Function not implemented.');
    }
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
