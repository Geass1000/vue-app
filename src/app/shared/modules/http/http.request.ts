import { HttpMethod } from './http.enum';
import _ from 'lodash';

import { HttpRequestConfig } from './http.interface';
import { HttpMeta } from './http.meta';
import { AxiosRequestConfig } from './axios.service';

export class HttpRequest<T> {
    /**
     * Method type that will be used for determining the request type
     */
    private _method: HttpMethod;
    get method (): HttpMethod {
        return this._method;
    }

    /**
     * Url that will be used for determining the request destination
     */
    private _url: string;
    get url (): string {
        return this._url;
    }

    /**
     * Http Headers that will be used as the request headers
     */
    private _headers: HttpMeta;
    get headers (): HttpMeta {
        return this._headers;
    }

    /**
     * Http Query Params that will be used as the request query params
     */
    private _params: HttpMeta;
    get params (): HttpMeta {
        return this._params;
    }

    /**
     * Data that will be used for the `POST`/`PUT`/`PATCH` request
     */
    private _data: any;
    get data (): any {
        return this._data;
    }

    /**
     * Creates a new instance of `HttpRequest` class from the `Http Request` configuration.
     *
     * @static
     * @param  {HttpRequestConfig<DataType>} config - `Http Request` configuration
     * @returns HttpRequest<DataType>
     */
    static fromHttpConfig<DataType> (config: HttpRequestConfig<DataType>): HttpRequest<DataType> {
        const httpRequest = new HttpRequest<DataType>();

        httpRequest.parseHttpConfig(config);
        return httpRequest;
    }

    /**
     * Creates a new instance of `HttpRequest` class from the `Axios` configuration.
     *
     * @static
     * @param  {AxiosRequestConfig} axiosConfig - `Axios` configuration
     * @returns HttpRequest<DataType>
     */
    static fromAxiosConfig<DataType> (axiosConfig: AxiosRequestConfig): HttpRequest<DataType> {
        const headers: HttpMeta = new HttpMeta();
        const params: HttpMeta = new HttpMeta();

        const config: HttpRequestConfig<DataType> = {
            url: axiosConfig.url,
            data: axiosConfig.data,
            method: axiosConfig.method as HttpMethod,
            headers: headers.fromDictionary(axiosConfig.headers).getAll(),
            params: headers.fromDictionary(axiosConfig.headers).getAll(),
        };

        return HttpRequest.fromHttpConfig(config);
    }

    constructor () { ; }

    /**
     * Parses and sets a HttpRequest configuration.
     *
     * @param  {HttpRequestConfig<T>} config - `Http Request` configuration
     * @returns void
     */
    private parseHttpConfig (config: HttpRequestConfig<T>): void {
        this._url = config.url;

        if (!this._url) {
            throw new Error (`Url is required!`);
        }

        this._method = config.method;

        this._headers = new HttpMeta(config.headers);
        this._params = new HttpMeta(config.params);
        this._data = config.data;
    }

    /**
     * Creates the clone of current instance and assigns him a new configuration.
     *
     * @param  {HttpRequestConfig<T>} newConfig - new `Http Request` configuration
     * @returns HttpRequest
     */
    public clone (newConfig: HttpRequestConfig<T>): HttpRequest<T> {
        const oldConfig: HttpRequestConfig<T> = this.getHttpConfig();
        const config: HttpRequestConfig<T> = _.assign({}, oldConfig, newConfig);

        return HttpRequest.fromHttpConfig(config);
    }

    /**
     * Returns the configuration of the `Http Request` in the `HttpRequest` format.
     *
     * @returns HttpRequestConfig<T>
     */
    public getHttpConfig (): HttpRequestConfig<T> {
        return {
            url: this.url,
            method: this.method,
            headers: this.headers.getAll(),
            params: this.params.getAll(),
            data: this.data,
        };
    }

    /**
     * Returns the configuration of the `Http Request` in the `Axios` format.
     *
     * @returns AxiosRequestConfig
     */
    public getAxiosConfig (): AxiosRequestConfig {
        return {
            url: this.url,
            method: this.method,
            headers: this.headers.toDictionary(),
            params: this.params.toDictionary(),
            data: this.data,
        };
    }
}
