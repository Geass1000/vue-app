import { Component, Prop, Vue } from 'vue-property-decorator';

import { HttpService } from '../core/services/http.service';

@Component({
    diProvide: [
        HttpService,
    ],
    diInject: {
        http: HttpService,
    }
})
export default class HelloWorldComponent extends Vue {
    @Prop() private msg!: string;

    public http!: HttpService;

    public created () {
        this.http.post();
        console.log(`Element was ceated with message ${this.msg}`);
    }
}
