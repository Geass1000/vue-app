
export namespace HttpMap {
    export type Key = string;
}

export interface HttpMap<T> {
    key: HttpMap.Key;
    value: T;
}

export namespace HttpHeader {
    export type Key = string;
    export type Value = string|string[];
}

export interface HttpHeader extends HttpMap<HttpHeader.Value> {
    value: HttpHeader.Value;
}

export namespace HttpParams {
    export type Key = string;
    export type Value = string;
}

export interface HttpParams extends HttpMap<HttpParams.Value> {
    value: HttpParams.Value;
}
