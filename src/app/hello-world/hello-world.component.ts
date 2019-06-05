import { Component, Prop, Vue } from 'vue-property-decorator';

import { HttpService, LoggerService } from '../core/services';

@Component({
    diProvide: [
        HttpService,
        LoggerService,
    ],
    diInject: {
        http: HttpService,
        logger: LoggerService,
    }
})
export default class HelloWorldComponent extends Vue {
    @Prop() private msg!: string;

    public http!: HttpService;
    public logger!: LoggerService;

    public created () {
        this.http.post();
        this.logger.className = `HelloWorldComponent`;
        this.logger.log(`created`, `Element was ceated with message ${this.msg}`);
    }
}
