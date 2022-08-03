import { AnyJson } from '../common/jsonTypes';
/**
 * Pact Matcher
 */
export interface Matcher<T> {
    'pact:matcher:type': string;
    'pact:generator:type'?: string;
    value?: T;
}
export declare type AnyTemplate = AnyJson | TemplateMap | TemplateArray | Matcher<unknown>;
interface TemplateMap {
    [key: string]: AnyJson | AnyTemplate;
}
declare type TemplateArray = Array<AnyTemplate>;
/**
 * Value must match the given template
 * @param template Template to base the comparison on
 */
export declare const like: <T extends AnyTemplate>(template: T) => Matcher<T>;
/**
 * Object where the key itself is ignored, but the value template must match.
 *
 * @param keyTemplate Example key to use
 * @param template Example value template to base the comparison on
 */
export declare const eachKeyLike: <T extends AnyTemplate>(keyTemplate: string, template: T) => Matcher<AnyTemplate>;
/**
 * Array where each element must match the given template
 * @param template Template to base the comparison on
 */
export declare const eachLike: <T extends AnyTemplate>(template: T) => Matcher<T[]>;
/**
 * Like Matcher with a minimum number of required values
 */
export interface MinLikeMatcher<T> extends Matcher<T> {
    min: number;
}
/**
 * An array that has to have at least one element and each element must match the given template
 * @param template Template to base the comparison on
 * @param count Number of examples to generate, defaults to one
 */
export declare const atLeastOneLike: <T extends AnyTemplate>(template: T, count?: number) => MinLikeMatcher<T[]>;
/**
 * An array that has to have at least the required number of elements and each element must match the given template
 * @param template Template to base the comparison on
 * @param min Minimum number of elements required in the array
 * @param count Number of examples to generate, defaults to min
 */
export declare const atLeastLike: <T extends AnyTemplate>(template: T, min: number, count?: number) => MinLikeMatcher<T[]>;
/**
 * Like Matcher with a maximum number of required values
 */
export interface MaxLikeMatcher<T> extends Matcher<T> {
    max: number;
}
/**
 * An array that has to have at most the required number of elements and each element must match the given template
 * @param template Template to base the comparison on
 * @param max Maximum number of elements required in the array
 * @param count Number of examples to generate, defaults to one
 */
export declare const atMostLike: <T extends AnyTemplate>(template: T, max: number, count?: number) => MaxLikeMatcher<T[]>;
/**
 * An array whose size is constrained to the minimum and maximum number of elements and each element must match the given template
 * @param template Template to base the comparison on
 * @param min Minimum number of elements required in the array
 * @param max Maximum number of elements required in the array
 * @param count Number of examples to generate, defaults to one
 */
export declare const constrainedArrayLike: <T extends AnyTemplate>(template: T, min: number, max: number, count?: number) => MinLikeMatcher<T[]> & MaxLikeMatcher<T[]>;
/**
 * Value must be a boolean
 * @param b Boolean example value. Defaults to true if unsupplied
 */
export declare const boolean: (b?: boolean) => Matcher<boolean>;
/**
 * Value must be an integer (must be a number and have no decimal places)
 * @param int Example value. If omitted a random value will be generated.
 */
export declare const integer: (int?: number) => Matcher<number>;
/**
 * Value must be a decimal number (must be a number and have decimal places)
 * @param num Example value. If omitted a random value will be generated.
 */
export declare const decimal: (num?: number) => Matcher<number>;
/**
 * Value must be a number
 * @param num Example value. If omitted a random integer value will be generated.
 */
export declare function number(num?: number): Matcher<number>;
/**
 * Value must be a string
 * @param str Example value
 */
export declare function string(str: string): Matcher<string>;
export interface RegexMatcher extends Matcher<string> {
    regex: string;
    example?: string;
}
/**
 * Value that must match the given regular expression
 * @param pattern Regular Expression to match
 * @param str Example value
 */
export declare function regex(pattern: RegExp | string, str: string): RegexMatcher;
/**
 * Value that must be equal to the example. This is mainly used to reset the matching rules which cascade.
 * @param value Example value
 */
export declare const equal: <T extends AnyTemplate>(value: T) => Matcher<T>;
export interface DateTimeMatcher extends Matcher<string> {
    format: string;
}
/**
 * String value that must match the provided datetime format string.
 * @param format Datetime format string. See [Java SimpleDateFormat](https://docs.oracle.com/javase/8/docs/api/java/text/SimpleDateFormat.html)
 * @param example Example value to use. If omitted a value using the current system date and time will be generated.
 */
export declare function datetime(format: string, example: string): DateTimeMatcher;
/**
 * String value that must match the provided datetime format string.
 * @param format Datetime format string. See [Java SimpleDateFormat](https://docs.oracle.com/javase/8/docs/api/java/text/SimpleDateFormat.html)
 * @param example Example value to use. If omitted a value using the current system date and time will be generated.
 */
export declare function timestamp(format: string, example: string): DateTimeMatcher;
/**
 * String value that must match the provided time format string.
 * @param format Time format string. See [Java SimpleDateFormat](https://docs.oracle.com/javase/8/docs/api/java/text/SimpleDateFormat.html)
 * @param example Example value to use. If omitted a value using the current system time will be generated.
 */
export declare function time(format: string, example: string): DateTimeMatcher;
/**
 * String value that must match the provided date format string.
 * @param format Date format string. See [Java SimpleDateFormat](https://docs.oracle.com/javase/8/docs/api/java/text/SimpleDateFormat.html)
 * @param example Example value to use. If omitted a value using the current system date will be generated.
 */
export declare function date(format: string, example: string): DateTimeMatcher;
/**
 * Value that must include the example value as a substring.
 * @param value String value to include
 */
export declare function includes(value: string): Matcher<string>;
/**
 * Value that must be null. This will only match the JSON Null value. For other content types, it will
 * match if the attribute is missing.
 */
export declare function nullValue(): Matcher<null>;
/**
 * Matches a URL composed of a base path and a list of path fragments
 * @param basePath Base path of the URL. If null, will use the base URL from the mock server.
 * @param pathFragments list of path fragments, can be regular expressions
 */
export declare function url2(basePath: string | null, pathFragments: Array<string | RegexMatcher | RegExp>): RegexMatcher;
/**
 * Matches a URL composed of a list of path fragments. The base URL from the mock server will be used.
 * @param pathFragments list of path fragments, can be regular expressions
 */
export declare function url(pathFragments: Array<string | RegexMatcher | RegExp>): RegexMatcher;
export interface ArrayContainsMatcher extends Matcher<AnyTemplate[]> {
    variants: Array<AnyTemplate>;
}
/**
 * Matches the items in an array against a number of variants. Matching is successful if each variant
 * occurs once in the array. Variants may be objects containing matching rules.
 */
export declare function arrayContaining(...variants: AnyTemplate[]): ArrayContainsMatcher;
export interface ProviderStateInjectedValue<T> extends Matcher<T> {
    expression: string;
}
/**
 * Marks an item to be injected from the provider state
 * @param expression Expression to lookup in the provider state context
 * @param exampleValue Example value to use in the consumer test
 */
export declare function fromProviderState<V extends AnyJson>(expression: string, exampleValue: V): ProviderStateInjectedValue<V>;
/**
 * Match a universally unique identifier (UUID). Random values will be used for examples if no example is given.
 */
export declare function uuid(example?: string): RegexMatcher;
export declare const matcherValueOrString: (obj: unknown) => string;
export {};
