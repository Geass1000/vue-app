
export namespace HttpMeta {
    export type Key = string;
    export type Value = string;
}

export interface HttpMeta {
    key: HttpMeta.Key;
    value: HttpMeta.Value;
}

export interface HttpMetaDictionary {
    [key: string]: string;
}

export interface HttpRequestConfig<DataType> {
    url?: string;
    method?: `get` | `post` | `put` | `delete`;
    headers?: HttpMeta[];
    params?: HttpMeta[];
    data?: DataType;
}