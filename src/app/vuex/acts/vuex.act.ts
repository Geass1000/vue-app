import { StoreAct } from './../../shared/base/vuex';
import { VuexModule } from '../vuex.module';
import { StoreDIKey, Store, StoreState } from '../../vuex/store';

export class VuexAct extends StoreAct {
    @VuexModule.lazyInject(StoreDIKey)
    protected store!: Store<StoreState>;
}
