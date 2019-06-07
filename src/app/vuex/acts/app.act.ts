import { ActDecorator, ActPayload, ActBase } from '../../shared/base/vuex';

import { VuexAct } from './vuex.act';

import { AppEvent } from '../../vuex/events';

export class AppActMutation extends ActBase {
    @ActDecorator.Mutation(AppEvent.mutations.ToggleDrawer)
    public toggleDrawer(): ActPayload {
        return { data: `Hello!`, target: `no` };
    }
}

export class AppActAction extends ActBase {
}

export const AppAct = new VuexAct(AppActMutation, AppActAction);
