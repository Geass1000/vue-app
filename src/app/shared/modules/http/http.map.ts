import _ from 'lodash';
import * as Interfaces from './http.interface';

export class HttpMap<T> {
    protected entries: Map<Interfaces.HttpMap.Key, T>;

    constructor (entries?: Interfaces.HttpMap<T>[]) {
        if (!_.isArray(entries)) {
            return;
        }

        entries.map((entry) => {
            this.set(entry.key, entry.value);
        });
    }

    /**
     * Sets the entry by key/value pair.
     *
     * @entry  {Interfaces.HttpMap.Key} key - name of entry
     * @entry  {T} value - value of entry
     * @returns void
     */
    public set (key: Interfaces.HttpMap.Key, value: T): void {
        this.entries.set(key, value);
    }

    /**
     * Removes entry by key (name).
     *
     * @entry  {Interfaces.HttpMap.Key} key - name of entry
     * @returns void
     */
    public delete (key: Interfaces.HttpMap.Key): void {
        this.entries.delete(key);
    }

    /**
     * Returns entry by key (name).
     * 
     * @entry  {Interfaces.HttpMap.Key} key
     * @returns Interfaces.HttpMap<T>
     */
    public get (key: Interfaces.HttpMap.Key): Interfaces.HttpMap<T> {
        const value = this.entries.get(key);
        return { key, value };
    }

    /**
     * Returns `true` if entry by key exists in entries.
     *
     * @entry  {Interfaces.HttpMap.Key} key
     * @returns boolean
     */
    public has (key: Interfaces.HttpMap.Key): boolean {
        return this.entries.has(key);
    }
}
