import { Component, Prop, Vue } from 'vue-property-decorator';

import ProfileNavigationComponent from './navigation/navigation.component.vue';

import { HttpService, LoggerService } from '../core/services';
import { StoreKey, Store, StoreState, AppEvent } from '../vuex';
import { AppAct } from '../vuex/acts/app.act';

import { ProfileModule } from './profile.module';

@Component({
    components: {
        ProfileNavigationComponent,
    },
})
export default class ProfileComponent extends Vue {
    @ProfileModule.lazyInject(LoggerService.diIdentifier)
    private logger!: LoggerService;

    @ProfileModule.lazyInject(HttpService.diIdentifier)
    private http!: HttpService;

    @ProfileModule.lazyInject(StoreKey)
    private store!: Store<StoreState>;

    public created () {
        // this.store.commit(`${AppEvent.mutations.ToggleDrawer}`);
        AppAct.mutations.toggleDrawer();
        setTimeout(() => AppAct.mutations.toggleDrawer(), 4000);

        this.logger.className = `HelloWorldComponent`;
        this.logger.log(`created`, `Element was ceated with message`);
    }

    get drawerState (): boolean {
        console.log(this.store.state.app.drawerState);
        return this.store.state.app.drawerState;
    }
}
