import { HttpMap } from './http.map';
import _ from 'lodash';
import * as Interfaces from './http.interface';

export class HttpHeaders extends HttpMap<Interfaces.HttpHeader.Value> {
    /**
     * Returns `headers` object for axios.
     *
     * @returns Dictionary
     */
    public getAll (): _.Dictionary<Interfaces.HttpHeader.Value> {
        const arrHeaders = Array.from(this.entries);
        return _.fromPairs(arrHeaders);
    }
}
