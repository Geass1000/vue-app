
/**
 * Class container for mutation and action acts.
 * Base class for act class who gets the store.
 */
export class StoreAct {
    protected store!: any;

    private _mutations: any;
    get mutations () {
        return this._mutations;
    }

    private _actions: any;
    get actions () {
        return this._mutations;
    }

    constructor (ActMutation: any, ActAction: any) {
        this._mutations = new ActMutation(this.store);
        this._actions = new ActAction(this.store);
    }
}
