import { Component, Prop, Vue } from 'vue-property-decorator';

import { AppRouter } from './app.router';

import { HttpService } from './core/services/http.service';

@Component({
    diInject: { http: HttpService },
    router: AppRouter,
})
export default class AppComponent extends Vue {
    public showHello: boolean = true;

    public http!: HttpService;

    public greet () {
        this.showHello = !this.showHello;
        this.http.get();
    }

    public newData () {
        return this.showHello ? `Data 1` : `Data 2`;
    }
}
