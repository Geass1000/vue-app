import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './home/home.component.vue';
import HelloWorld from './hello-world/hello-world.component.vue';
import PageNotFound from './page-not-found/page-not-found.component.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/hello',
        component: HelloWorld,
    },
    {
        path: '/*',
        component: PageNotFound,
    },
];

export const AppRouter = new VueRouter({
    routes,
});
