export declare const tokenCodeFn: (mfaSerial: string, callback: (err?: Error | undefined, token?: string | undefined) => void) => Promise<void>;
export declare const readProfiles: () => {
    [key: string]: string;
};
export declare const getSharedCredentialsFilename: () => string;
