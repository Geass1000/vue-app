import { Component, Prop, Vue } from 'vue-property-decorator';

import { AppRouter } from './app.router';

import { HttpService, LoggerService } from './core/services';

import { AppModule } from './app.module';

@Component({
    router: AppRouter,
})
export default class AppComponent extends Vue {
    public drawerState: boolean = false;
    public links = [
        {
            icon: `home`,
            title: `Home`,
            to: `/`,
        },
        {
            icon: `question_answer`,
            title: `Hello`,
            to: `/hello`,
        },
        {
            icon: `account_circle`,
            title: `Profile`,
            links: [
                {
                    icon: `contacts`,
                    title: `Detail`,
                    to: { name: 'detail', params: { id: 0 } },
                },
                {
                    icon: `settings`,
                    title: `Settings`,
                    to: { name: 'settings', params: { id: 0 } },
                },
            ]
        },
    ];

    @AppModule.lazyInject(LoggerService.diIdentifier)
    private logger!: LoggerService;

    @AppModule.lazyInject(HttpService.diIdentifier)
    private http!: HttpService;

    public created () {
        this.logger.className = `AppComponent`;
    }

    /**
     * Event handler. Shows/hides the Vuetify drawer.
     *
     * @event click
     * @returns void
     */
    public toggleDrawer (): void {
        this.drawerState = !this.drawerState;
    }
}
