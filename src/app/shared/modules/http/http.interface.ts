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

export interface HttpMethodRequestConfig {
    headers?: HttpMeta[];
    params?: HttpMeta[];
    responseType?: Enums.HttpResponseType;
}

export interface HttpGetRequestConfig extends HttpMethodRequestConfig {
}

export interface HttpPostRequestConfig<DataType> extends HttpMethodRequestConfig {
    data?: DataType;
}

export interface HttpPutRequestConfig<DataType> extends HttpMethodRequestConfig {
    data?: DataType;
}

export interface HttpDeleteRequestConfig extends HttpMethodRequestConfig {
}

export interface HttpResponseSchema<ResponseDataType> {
    data?: ResponseDataType;
    status?: number;
    statusText?: string;
    headers?: HttpMeta[];
}
