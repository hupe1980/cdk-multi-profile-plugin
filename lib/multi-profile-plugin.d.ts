import { Plugin, PluginHost } from 'aws-cdk';
export declare class MultiProfilePlugin implements Plugin {
    private readonly profiles;
    private readonly filename;
    readonly version = "1";
    constructor(profiles: {
        [key: string]: string;
    }, filename: string);
    init(host: PluginHost): void;
}
