import _ from 'lodash';
import * as Interfaces from './http.interface';

export class HttpHeaders {
    private headers: Map<Interfaces.HttpHeader.Key, Interfaces.HttpHeader.Value>;

    constructor (headers?: Interfaces.HttpHeader[]) {
        if (!_.isArray(headers)) {
            return;
        }

        headers.map((header) => {
            this.set(header.key, header.value);
        });
    }

    /**
     * Sets the header by key/value pair.
     *
     * @param  {Interfaces.HttpHeader.Key} key - name of header
     * @param  {Interfaces.HttpHeader.Value} value - value of header
     * @returns void
     */
    public set (key: Interfaces.HttpHeader.Key, value: Interfaces.HttpHeader.Value): void {
        this.headers.set(key, value);
    }

    /**
     * Removes header by key (name).
     *
     * @param  {Interfaces.HttpHeader.Key} key - name of header
     * @returns void
     */
    public delete (key: Interfaces.HttpHeader.Key): void {
        this.headers.delete(key);
    }

    /**
     * Returns header by key (name).
     * 
     * @param  {Interfaces.HttpHeader.Key} key
     * @returns Interfaces.HttpHeader
     */
    public get (key: Interfaces.HttpHeader.Key): Interfaces.HttpHeader {
        const value = this.headers.get(key);
        return { key, value };
    }

    /**
     * Returns `true` if header by key exists in headers.
     *
     * @param  {Interfaces.HttpHeader.Key} key
     * @returns boolean
     */
    public has (key: Interfaces.HttpHeader.Key): boolean {
        return this.headers.has(key);
    }

    /**
     * Returns `headers` object for axios.
     *
     * @returns Dictionary
     */
    public getAll (): _.Dictionary<Interfaces.HttpHeader.Value> {
        const arrHeaders = Array.from(this.headers);
        return _.fromPairs(arrHeaders);
    }
}
