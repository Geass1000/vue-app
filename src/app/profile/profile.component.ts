import { Component, Prop, Vue } from 'vue-property-decorator';

import ProfileNavigationComponent from './navigation/navigation.component.vue';

import { HttpService, LoggerService } from '../core/services';

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

    public created () {
        this.http.post();
        this.logger.className = `HelloWorldComponent`;
        this.logger.log(`created`, `Element was ceated with message`);
    }
}
