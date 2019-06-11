import * as Enums from './http.enum';
import { ResponseType } from './axios.service';

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
    url: string;
    method: Enums.HttpMethod;
    headers?: HttpMeta[];
    params?: HttpMeta[];
    data?: DataType;
    responseType?: Enums.HttpResponseType;
}
