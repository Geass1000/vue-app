import { Component, Prop, Vue } from 'vue-property-decorator';

import ProfileNavigationComponent from './navigation/navigation.component.vue';

import { HttpService, LoggerService } from '../core/services';
import { StoreKey, Store, StoreState, AppEvent } from '../vuex';

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
        this.http.post();

        this.store.commit(`${AppEvent.mutations.ToggleDrawer}`);
        setTimeout(() => this.store.commit(`${AppEvent.mutations.ToggleDrawer}`), 4000);

        this.logger.className = `HelloWorldComponent`;
        this.logger.log(`created`, `Element was ceated with message`);
    }

    get drawerState (): boolean {
        return this.store.state.app.drawerState;
    }
}
