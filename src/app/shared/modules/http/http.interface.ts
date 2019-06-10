
export namespace HttpHeader {
    export type Key = string;
    export type Value = string|string[];
}

export interface HttpHeader {
    key: HttpHeader.Key;
    value: HttpHeader.Value;
}
