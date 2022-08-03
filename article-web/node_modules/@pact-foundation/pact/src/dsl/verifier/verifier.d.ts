import { VerifierOptions } from './types';
export declare class Verifier {
    private address;
    private stateSetupPath;
    private config;
    private deprecatedFields;
    constructor(config: VerifierOptions);
    /**
     * Verify a HTTP Provider
     *
     * @param config
     */
    verifyProvider(): Promise<string>;
    private runProviderVerification;
    private isLocalVerification;
}
