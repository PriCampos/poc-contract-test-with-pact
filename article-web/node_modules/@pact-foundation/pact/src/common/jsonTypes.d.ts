export declare type AnyJson = boolean | number | string | null | JsonArray | JsonMap;
export interface JsonMap {
    [key: string]: AnyJson;
}
export declare type JsonArray = Array<AnyJson>;
