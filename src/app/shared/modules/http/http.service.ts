import _ from 'lodash';
import Bluebird from 'bluebird';
import { injectable, inject, multiInject, optional } from 'inversify';

import * as Interfaces from './http.interface';
import * as Enums from './http.enum';

import { HttpRequest } from './http.request';
import { HttpResponse } from './http.response';

import { AxiosDIKey, AxiosService } from './axios.service';
import {
    HttpRequestInterceptorDIKey, HttpRequestInterceptor,
    HttpResponseInterceptorDIKey, HttpResponseInterceptor,
} from './http.interceptor';

@injectable()
export class HttpService {
    static diIdentifier: symbol = Symbol(`HttpService`);

    constructor (
            @inject(AxiosDIKey) public axios: AxiosService,
            @multiInject(HttpRequestInterceptorDIKey) @optional() requestInterceptors: HttpRequestInterceptor[],
            @multiInject(HttpResponseInterceptorDIKey) @optional() responseInterceptors: HttpResponseInterceptor[]) {
        this.applyRequestInterceptors(requestInterceptors);
        this.applyResponseInterceptors(responseInterceptors);
    }

    /**
     * Applies to the Axios user's request interceptors.
     *
     * @param  {HttpRequestInterceptor[]} requestInterceptors - request interceptors
     * @returns void
     */
    public applyRequestInterceptors (requestInterceptors: HttpRequestInterceptor[]): void {
        if (!_.isArray(requestInterceptors)) {
            return;
        }

        this.axios.interceptors.request.use(async (config) => {
            let httpRequest = HttpRequest.fromAxiosConfig<any>(config);

            await Bluebird.mapSeries(requestInterceptors, async (interceptor) => {
                if (!_.isObject(interceptor) || !_.isFunction(interceptor.intercept)) {
                    return;
                }

                httpRequest = await new Bluebird(null)
                    .then(() => interceptor.intercept(httpRequest));
            });

            return httpRequest.getAxiosConfig();
        });
    }

    /**
     * Applies to the Axios user's response interceptors.
     *
     * @param  {HttpResponseInterceptor[]} responseInterceptors - response interceptors
     * @returns void
     */
    public applyResponseInterceptors (responseInterceptors: HttpResponseInterceptor[]): void {
        if (!_.isArray(responseInterceptors)) {
            return;
        }

        this.axios.interceptors.response.use(async (response) => {
            let httpResponse = HttpResponse.fromAxiosResponse<any>(response);

            await Bluebird.mapSeries(responseInterceptors, async (interceptor) => {
                if (!_.isObject(interceptor) || !_.isFunction(interceptor.intercept)) {
                    return;
                }

                httpResponse = await new Bluebird(null)
                    .then(() => interceptor.intercept(httpResponse));
            });

            return httpResponse.getAxiosResponse();
        });
    }

    /**
     * Sends an outgoing HTTP request.
     *
     * @param  {Interfaces.HttpRequestConfig<RequestDataType>} config - request's configuration
     * @returns Promise<ResponseDataType>
     */
    public request<RequestDataType, ResponseDataType> (
            config: Interfaces.HttpRequestConfig<RequestDataType>)
            : Promise<ResponseDataType> {
        const httpRequest = HttpRequest.fromHttpConfig(config);

        return this.axios.request<any, ResponseDataType>(httpRequest.getAxiosConfig());
    }

    /**
     * Sends an outgoing `GET` HTTP request.
     *
     * @param  {string} url - url for determining the request destination
     * @param  {Interfaces.HttpGetRequestConfig} config - request's configuration
     * @returns Promise<ResponseDataType>
     */
    public get<ResponseDataType> (url: string,
            config?: Interfaces.HttpGetRequestConfig)
            : Promise<ResponseDataType> {
        const reqConfig: Interfaces.HttpRequestConfig<undefined> = _.assign({}, config, {
            url, method: Enums.HttpMethod.Get,
        });
        return this.request(reqConfig);
    }

    /**
     * Sends an outgoing `POST` HTTP request.
     *
     * @param  {string} url - url for determining the request destination
     * @param  {Interfaces.HttpPostRequestConfig<RequestDataType>} config - request's configuration
     * @returns Promise<ResponseDataType>
     */
    public post<RequestDataType, ResponseDataType> (url: string,
            config?: Interfaces.HttpPostRequestConfig<RequestDataType>)
            : Promise<ResponseDataType> {
        const reqConfig: Interfaces.HttpRequestConfig<RequestDataType> = _.assign({}, config, {
            url, method: Enums.HttpMethod.Post,
        });
        return this.request(reqConfig);
    }

    /**
     * Sends an outgoing `PUT` HTTP request.
     *
     * @param  {string} url - url for determining the request destination
     * @param  {Interfaces.HttpPutRequestConfig<RequestDataType>} config - request's configuration
     * @returns Promise<ResponseDataType>
     */
    public put<RequestDataType, ResponseDataType> (url: string,
            config?: Interfaces.HttpPutRequestConfig<RequestDataType>)
            : Promise<ResponseDataType> {
        const reqConfig: Interfaces.HttpRequestConfig<RequestDataType> = _.assign({}, config, {
            url, method: Enums.HttpMethod.Put,
        });
        return this.request(reqConfig);
    }

    /**
     * Sends an outgoing `DELETE` HTTP request.
     *
     * @param  {string} url - url for determining the request destination
     * @param  {Interfaces.HttpDeleteRequestConfig} config - request's configuration
     * @returns Promise<ResponseDataType>
     */
    public delete<ResponseDataType> (url: string,
            config?: Interfaces.HttpDeleteRequestConfig)
            : Promise<ResponseDataType> {
        const reqConfig: Interfaces.HttpRequestConfig<undefined> = _.assign({}, config, {
            url, method: Enums.HttpMethod.Delete,
        });
        return this.request(reqConfig);
    }
}
