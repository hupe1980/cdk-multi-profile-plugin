import { Plugin, PluginHost } from 'aws-cdk';

import { MultiProfileCredentialsSource } from './multi-profile-credentials-source';

export class MultiProfilePlugin implements Plugin {
  public readonly version = '1';

  constructor(
    private readonly profiles: { [key: string]: string },
    private readonly filename: string
  ) {}

  public init(host: PluginHost): void {
    host.registerCredentialProviderSource(
      new MultiProfileCredentialsSource(
        'cdk-multi-profile-plugin',
        this.profiles,
        this.filename
      )
    );
  }
}
