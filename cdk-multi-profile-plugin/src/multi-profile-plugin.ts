import { Plugin, PluginHost } from 'aws-cdk';

import { IniFileCredentialProviderSource } from './ini-file-credential-provider-source';

export class MultiProfilePlugin implements Plugin {
  public readonly version = '1';

  constructor(
    private readonly profiles: { [key: string]: string },
    private readonly filename: string
  ) {}

  public init(host: PluginHost): void {
    host.registerCredentialProviderSource(
      new IniFileCredentialProviderSource(
        'cdk-multi-profile-plugin',
        this.profiles,
        this.filename
      )
    );
  }
}
