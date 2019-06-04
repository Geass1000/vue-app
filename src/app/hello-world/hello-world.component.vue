<template src="./hello-world.component.html"></template>
<style scoped src="./hello-world.component.css"></style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class HelloWorldComponent extends Vue {
    @Prop() private msg!: string;

    public created () {
        console.log(`Element was ceated with message ${this.msg}`);
    }
}
</script>
