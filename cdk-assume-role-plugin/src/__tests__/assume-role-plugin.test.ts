import { AssumeRolePlugin } from '../assume-role-plugin';
import { PluginHost } from 'aws-cdk';

const host: PluginHost = {
  credentialProviderSources: [],
  load: jest.fn(),
  registerCredentialProviderSource: jest.fn(),
};

beforeEach(() => {
  jest.resetAllMocks();
});

it('should register the credential provider source', async () => {
  const plugin = new AssumeRolePlugin('user', { 123: 'role' }, 'filename');

  plugin.init(host);

  expect(host.registerCredentialProviderSource).toHaveBeenCalledTimes(1);
});

it('should not register the credential provider source', async () => {
  const plugin = new AssumeRolePlugin('user', { 123: 'role' }, 'filename');

  process.env.IGNORE_CDK_ASSUME_ROLE_PLUGIN = 'true';

  plugin.init(host);

  expect(host.registerCredentialProviderSource).toHaveBeenCalledTimes(0);
});
