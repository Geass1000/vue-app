import _ from 'lodash';
import * as Interfaces from './http.interface';

export class HttpMeta {
    protected entries: Map<Interfaces.HttpMeta.Key, Interfaces.HttpMeta.Value>;

    constructor (entries?: Interfaces.HttpMeta[]) {
        this.entries = new Map();

        if (!_.isArray(entries)) {
            return;
        }

        entries.map((entry) => {
            this.entries.set(entry.key, entry.value);
        });
    }

    /**
     * Sets the entry by key/value pair.
     *
     * @entry  {Interfaces.HttpMeta.Key} key - name of entry
     * @entry  {T} value - value of entry
     * @returns HttpMeta - clone of the HTTP meta object with the newly set entry value
     */
    public set (key: Interfaces.HttpMeta.Key, value: Interfaces.HttpMeta.Value): HttpMeta {
        const enties: Interfaces.HttpMeta[] = this.getAll();
        const newEntry = { key, value };

        const oldEntryIndex = _.findIndex(enties, [ `key`, key ]);
        if (oldEntryIndex === -1) {
            enties.push(newEntry);
        } else {
            enties[oldEntryIndex] = newEntry;
        }

        const newHttpMeta: HttpMeta = new HttpMeta(enties);
        return newHttpMeta;
    }

    /**
     * Removes entry by key (name).
     *
     * @entry  {Interfaces.HttpMeta.Key} key - name of entry
     * @returns void
     */
    public delete (key: Interfaces.HttpMeta.Key): void {
        this.entries.delete(key);
    }

    /**
     * Returns entry by key (name).
     *
     * @entry  {Interfaces.HttpMeta.Key} key
     * @returns Interfaces.HttpMeta<T>
     */
    public get (key: Interfaces.HttpMeta.Key): Interfaces.HttpMeta {
        const value = this.entries.get(key);
        return { key, value };
    }

    /**
     * Returns `true` if entry by key exists in entries.
     *
     * @entry  {Interfaces.HttpMeta.Key} key
     * @returns boolean
     */
    public has (key: Interfaces.HttpMeta.Key): boolean {
        return this.entries.has(key);
    }

    /**
     * Returns the array of `entries` http plain objects.
     *
     * @returns Dictionary
     */
    public getAll (): Interfaces.HttpMeta[] {
        const arrEntities = Array.from(this.entries);
        return _.map(arrEntities, (entity) => {
            return { key: entity[0], value: entity[1] };
        });
    }

    /**
     * Returns `entries` dictionary object.
     *
     * @returns Dictionary
     */
    public toDictionary (): _.Dictionary<Interfaces.HttpMeta.Value> {
        const arrHeaders = Array.from(this.entries);
        return _.fromPairs(arrHeaders);
    }

    /**
     * Extracts entities from dictionary object.
     *
     * @param  {Interfaces.HttpMetaDictionary} entities
     * @returns this
     */
    public fromDictionary (entities: Interfaces.HttpMetaDictionary): this {
        for (let key in entities) {
            if (!entities.hasOwnProperty(key) && key === `constructor`) {
                continue;
            }

            this.entries.set(key, entities[key]);
        }

        return this;
    }
}
