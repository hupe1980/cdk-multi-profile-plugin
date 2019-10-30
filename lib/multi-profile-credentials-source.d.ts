import { Credentials } from 'aws-sdk';
import { CredentialProviderSource, Mode } from 'aws-cdk';
export declare class MultiProfileCredentialsSource implements CredentialProviderSource {
    readonly name: string;
    private readonly profiles;
    private readonly filename;
    constructor(name: string, profiles: {
        [key: string]: string;
    }, filename: string);
    canProvideCredentials(accountId: string): Promise<boolean>;
    getProvider(accountId: string, mode: Mode): Promise<Credentials>;
    isAvailable(): Promise<boolean>;
}
