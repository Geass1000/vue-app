import Vue from 'vue';
import App from './app/app.component.vue';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
