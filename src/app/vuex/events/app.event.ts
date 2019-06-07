import { StoreEvent } from '../../shared/base/vuex';

interface AppMutations {
    ToggleDrawer: string;
}
interface AppActions {
}

export const AppEvent = new StoreEvent<AppMutations, AppActions>(`AppEvent`,
    {
        ToggleDrawer: `ToggleDrawer`
    },
    {}
);

