import { Component, Prop, Vue } from 'vue-property-decorator';

import { AppRouter } from './app.router';

@Component({
    router: AppRouter,
})
export default class AppComponent extends Vue {
    public showHello: boolean = true;

    public greet () {
        this.showHello = !this.showHello;
    }

    // Реагирует на изменение данных, но не кэширует результат
    public newData () {
        return this.showHello ? `Data 1` : `Data 2`;
    }
}
