import { HttpMap } from './http.map';
import _ from 'lodash';
import * as Interfaces from './http.interface';

export class HttpParams extends HttpMap<Interfaces.HttpParams.Value> {
    /**
     * Returns `params` object for axios.
     * 
     * @returns Dictionary
     */
    public getAll (): string {
        const arrParams = Array.from(this.entries);
        return _.map(arrParams, (arrParam) =>
            arrParam.join('=')).join('&');
    }
}
