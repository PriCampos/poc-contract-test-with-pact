import { Mismatch, MatchingResult, RequestMismatch } from '@pact-foundation/pact-core/src/consumer/index';
export declare function displayQuery(query: Record<string, string[]>): string;
export declare function displayRequest(request: RequestMismatch, indent?: string): string;
export declare function filterMissingFeatureFlag(mismatches: MatchingResult[]): MatchingResult[];
export declare function printMismatch(m: Mismatch): string;
export declare function generateMockServerError(mismatches: MatchingResult[], indent: string): string;
