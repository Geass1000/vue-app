import Vue from 'vue';
import VueRouter from 'vue-router';
import { RouteConfig } from 'vue-router';

import Home from './home/home.component.vue';
import HelloWorld from './hello-world/hello-world.component.vue';
import HelloWorldComponent from './hello-world/hello-world.component.vue';
import PageNotFoundComponent from './page-not-found/page-not-found.component.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/hello',
        component: HelloWorldComponent,
    },
    {
        path: '/*',
        component: PageNotFoundComponent,
    },
];

export const AppRouter = new VueRouter({
    routes,
});
