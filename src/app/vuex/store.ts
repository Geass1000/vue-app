import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export { Store } from 'vuex';

import { AppStore, AppState } from './stores';

export interface StoreState {
    app: AppState;
}

export const StoreInst = new Vuex.Store<StoreState>({
    modules: {
        app: AppStore,
    },
});

export const StoreDIKey = Symbol(`Store`);
