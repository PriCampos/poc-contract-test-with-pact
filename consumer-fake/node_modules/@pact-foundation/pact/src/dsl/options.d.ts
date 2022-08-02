/**
 * Pact Options module.
 * @module PactOptions
 */
import { VerifierOptions as PactCoreVerifierOptions } from '@pact-foundation/pact-core';
import { PactfileWriteMode } from './mockService';
import { MessageProviders, StateHandlers } from './message';
export declare type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error';
export interface PactOptions {
    consumer: string;
    provider: string;
    port?: number;
    host?: string;
    ssl?: boolean;
    sslcert?: string;
    sslkey?: string;
    dir?: string;
    log?: string;
    logLevel?: LogLevel;
    spec?: number;
    cors?: boolean;
    timeout?: number;
    pactfileWriteMode?: PactfileWriteMode;
}
export interface MandatoryPactOptions {
    port: number;
    host: string;
    ssl: boolean;
}
export declare type PactOptionsComplete = PactOptions & MandatoryPactOptions;
export interface MessageProviderOptions {
    logLevel?: LogLevel;
    messageProviders: MessageProviders;
    stateHandlers?: StateHandlers;
}
declare type ExcludedPactNodeVerifierKeys = Exclude<keyof PactCoreVerifierOptions, 'providerBaseUrl'>;
export declare type PactNodeVerificationExcludedOptions = Pick<PactCoreVerifierOptions, ExcludedPactNodeVerifierKeys>;
export declare type PactMessageProviderOptions = PactNodeVerificationExcludedOptions & MessageProviderOptions;
export interface MessageConsumerOptions {
    consumer: string;
    dir?: string;
    provider: string;
    log?: string;
    logLevel?: LogLevel;
    spec?: number;
    pactfileWriteMode?: PactfileWriteMode;
}
export {};
