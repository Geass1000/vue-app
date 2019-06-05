import { Component, Prop, Vue } from 'vue-property-decorator';

import { HttpService, LoggerService } from '../core/services';

import { lazyInject } from '../core/di.container';

@Component({
})
export default class HelloWorldComponent extends Vue {
    @Prop() private msg!: string;

    @lazyInject(LoggerService.diIdentifier)
    private logger!: LoggerService;

    @lazyInject(HttpService.diIdentifier)
    private http!: HttpService;

    public created () {
        this.http.post();
        this.logger.className = `HelloWorldComponent`;
        this.logger.log(`created`, `Element was ceated with message ${this.msg}`);
    }
}
