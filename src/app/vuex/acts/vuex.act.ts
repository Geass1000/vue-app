import { StoreAct } from './../../shared/base/vuex';
import { VuexModule } from '../vuex.module';
import { StoreKey, Store, StoreState } from '../../vuex/store';

export class VuexAct extends StoreAct {
    @VuexModule.lazyInject(StoreKey)
    protected store!: Store<StoreState>;
}
