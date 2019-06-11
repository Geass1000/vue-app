import _ from 'lodash';

import { HttpResponseSchema } from './http.interface';
import { HttpMeta } from './http.meta';
import { AxiosResponse } from './axios.service';

export class HttpResponse<T> {
    private axiosResp: AxiosResponse<T>;

    private _data: T;
    get data (): T {
        return this._data;
    }

    private _status: number;
    get status (): number {
        return this._status;
    }

    private _statusText: string;
    get statusText (): string {
        return this._statusText;
    }

    private _headers: HttpMeta;
    get headers (): HttpMeta {
        return this._headers;
    }

    /**
     * Creates a new instance of `HttpResponse` class from the `Axios` response.
     *
     * @static
     * @param  {AxiosResponse<ResponseDataType>} axiosResp - `Axios` response
     * @returns HttpResponse<ResponseDataType>
     */
    public static fromAxiosResponse<ResponseDataType> (axiosResp: AxiosResponse<ResponseDataType>)
            : HttpResponse<ResponseDataType> {
        const httpResponse = new HttpResponse<ResponseDataType>();
        httpResponse.parseAxiosResponse(axiosResp);

        return httpResponse;
    }

    constructor () { ; }

    /**
     * Parses and sets HttpResponse properties.
     *
     * @param  {AxiosResponse<T>} axiosResp
     * @returns void
     */
    private parseAxiosResponse (axiosResp: AxiosResponse<T>): void {
        this.axiosResp = axiosResp;

        this._data = axiosResp.data;
        this._status = axiosResp.status;
        this._statusText = axiosResp.statusText;

        const headers: HttpMeta = new HttpMeta();
        this._headers = headers.fromDictionary(axiosResp.headers);
    }

    /**
     * Creates the clone of current instance and assigns him a new response.
     *
     * @param  {HttpResponseSchema<T>} newResp
     * @returns HttpResponse<T>
     */
    public clone (newResp: HttpResponseSchema<T>): HttpResponse<T> {
        const oldResp: AxiosResponse<T> = this.getAxiosResponse();
        const resp: AxiosResponse<T> = _.assign({}, this.axiosResp, newResp);

        return HttpResponse.fromAxiosResponse(resp);
    }

    /**
     * Returns the response of the `Http Response` in the `Axios` format.
     *
     * @returns AxiosResponse<T>
     */
    public getAxiosResponse (): AxiosResponse<T> {
        return {
            headers: this.headers.toDictionary(),
            config: this.axiosResp.config,
            request: this.axiosResp.request,
            data: this.data,
            status: this.status,
            statusText: this.statusText,
        };
    }
}
