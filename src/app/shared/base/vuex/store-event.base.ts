
export class StoreEvent<M, A> {
    private _mutations: M;
    public get mutations (): M {
        return this._mutations;
    }

    private _actions: A;
    public get actions (): A {
        return this._actions;
    }

    constructor(private className: string,
            mutations: M, actions: A) {
        this._mutations = this.addClassSelector(mutations, `Mutation`);
        this._actions = this.addClassSelector(actions, `Action`);
    }

    /**
     * Adds the `className` to each value in object.
     *
     * @param  {T} obj - input object
     * @returns T
     */
    private addClassSelector<T> (obj: T, eventType: string): T {
        const newObj: any = {};
        for (const key in obj) {
            if (!obj.hasOwnProperty(key)) {
                continue;
            }

            const value: string = (obj as any)[key];

            newObj[key] = `${this.className}:${eventType}:${value}`;
        }

        return newObj;
    }
}
