import Bluebird from 'bluebird';
import { HttpResponse } from './http.response';
import { HttpRequest } from './http.request';

export const HttpRequestInterceptorDIKey: symbol = Symbol(`HttpRequestInterceptor`);
export const HttpResponseInterceptorDIKey: symbol = Symbol(`HttpResponseInterceptor`);

export abstract class HttpRequestInterceptor {

    public abstract intercept (req: HttpRequest<any>)
        : HttpRequest<any> | Bluebird<HttpRequest<any>>;
}

export abstract class HttpResponseInterceptor {

    public abstract intercept (req: HttpResponse<any>)
        : HttpResponse<any> | Bluebird<HttpResponse<any>>;
}
