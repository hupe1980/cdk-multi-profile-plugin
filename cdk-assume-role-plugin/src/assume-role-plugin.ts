import { Plugin, PluginHost } from 'aws-cdk';

import { TemporaryCredentialProviderSource } from './temporary-credential-provider-source';

export class AssumeRolePlugin implements Plugin {
  public readonly version = '1';

  constructor(
    private readonly profile: string,
    private readonly roles: Record<string, string>,
    private readonly filename: string
  ) {}

  public init(host: PluginHost): void {
    if (process.env.IGNORE_CDK_ASSUME_ROLE_PLUGIN) {
      return;
    }

    host.registerCredentialProviderSource(
      new TemporaryCredentialProviderSource(
        'cdk-assume-role-plugin',
        this.profile,
        this.roles,
        this.filename
      )
    );
  }
}
