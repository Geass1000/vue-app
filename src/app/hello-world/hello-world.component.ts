import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
})
export default class HelloWorldComponent extends Vue {
    @Prop() private msg!: string;
}
