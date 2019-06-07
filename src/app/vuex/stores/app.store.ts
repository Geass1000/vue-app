import { AppEvent } from './../events';

export interface AppState {
    drawerState: boolean;
}

const appState: AppState = {
    drawerState: false
}

const appGetters = {
}

const appActions = {
}

const appMutations = {
    [AppEvent.mutations.ToggleDrawer]: (state: AppState) => {
        state.drawerState = !state.drawerState;
    }
}

export const AppStore = {
    namespaced: false,
    state: appState,
    getters: appGetters,
    actions: appActions,
    mutations: appMutations,
};
