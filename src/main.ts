import 'reflect-metadata';
import Vue from 'vue';
import AppComponent from './app/app.component.vue';

import 'vuetify/dist/vuetify.min.css';
import Vuetify from 'vuetify'
import VeeValidate from 'vee-validate';

Vue.use(Vuetify)
Vue.use(VeeValidate, { inject: false });

Vue.config.productionTip = false;

new Vue({
    render: (h) => h(AppComponent),
}).$mount('#app');
