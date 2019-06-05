import Vue from 'vue';
import AppComponent from './app/app.component.vue';

import { VueDiContainer } from 'vue-di-container';

import { serviceProvider } from './app/core/global.provider';

Vue.config.productionTip = false;

Vue.use(VueDiContainer);

new Vue({
    diProvide: [
        ...serviceProvider,
    ],
    render: (h) => h(AppComponent),
}).$mount('#app');
