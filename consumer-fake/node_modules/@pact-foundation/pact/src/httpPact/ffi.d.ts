import { ConsumerInteraction } from '@pact-foundation/pact-core/src/consumer/index';
import { RequestOptions, ResponseOptions, Headers, Query } from '../dsl/interaction';
import { AnyTemplate } from 'v3/matchers';
declare enum INTERACTION_PART {
    REQUEST = 1,
    RESPONSE = 2
}
export declare const contentTypeFromHeaders: (headers: Headers | undefined, defaultContentType: string) => string;
export declare const setRequestDetails: (interaction: ConsumerInteraction, req: RequestOptions) => void;
export declare const setResponseDetails: (interaction: ConsumerInteraction, res: ResponseOptions) => void;
export declare const setRequestMethodAndPath: (interaction: ConsumerInteraction, req: RequestOptions) => void;
export declare const setQuery: (interaction: ConsumerInteraction, query?: Query) => void;
export declare const setBody: (part: INTERACTION_PART, interaction: ConsumerInteraction, headers?: Headers, body?: AnyTemplate) => void;
export declare const setHeaders: (part: INTERACTION_PART, interaction: ConsumerInteraction, headers?: Headers) => void;
export {};
