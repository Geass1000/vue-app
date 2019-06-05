import 'reflect-metadata';
import Vue from 'vue';
import AppComponent from './app/app.component.vue';

Vue.config.productionTip = false;

new Vue({
    render: (h) => h(AppComponent),
}).$mount('#app');
