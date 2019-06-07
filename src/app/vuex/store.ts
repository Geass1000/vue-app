import Vue from 'vue';
import Vuex from 'vuex';
export { Store } from 'vuex';

import { AppStore, AppState } from './stores';

Vue.use(Vuex);

export const StoreKey = Symbol(`Store`);

export interface StoreState {
    app: AppState;
}

export const StoreInst = () => new Vuex.Store<StoreState>({
    modules: {
        app: AppStore,
    },
});
