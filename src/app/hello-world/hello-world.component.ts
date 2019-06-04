import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class HelloWorldComponent extends Vue {
    @Prop() private msg!: string;

    public created () {
        console.log(`Element was ceated with message ${this.msg}`);
    }
}
