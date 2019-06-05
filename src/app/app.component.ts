import { Component, Prop, Vue } from 'vue-property-decorator';

import { AppRouter } from './app.router';

import { HttpService, LoggerService } from './core/services';

import { lazyInject } from './core/di.container';

@Component({
    router: AppRouter,
})
export default class AppComponent extends Vue {
    public showHello: boolean = true;

    @lazyInject(LoggerService.diIdentifier)
    private logger!: LoggerService;

    @lazyInject(HttpService.diIdentifier)
    private http!: HttpService;

    public created () {
        this.logger.className = `AppComponent`;
    }

    public greet () {
        this.showHello = !this.showHello;
        this.logger.info(`greet`, `User clicked on the 'Data' button`);
        // this.http.get();
    }

    public newData () {
        return this.showHello ? `Data 1` : `Data 2`;
    }
}
