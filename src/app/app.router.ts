import Vue from 'vue';
import VueRouter from 'vue-router';
import { RouteConfig } from 'vue-router';

const HomeComponent = () => import(/* webpackChunkName: "home" */ `./home/home.component.vue`);
import HelloWorldComponent from './hello-world/hello-world.component.vue';
import PageNotFoundComponent from './page-not-found/page-not-found.component.vue';
const ProfileComponent = () => import(/* webpackChunkName: "profile" */ `./profile/profile.component.vue`);

import { profileRoutes } from './profile/profile.router';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
    {
        path: '/',
        component: HomeComponent,
    },
    {
        path: '/hello',
        component: HelloWorldComponent,
    },
    {
        path: '/profile/:id',
        name: 'profile',
        component: ProfileComponent,
        children: profileRoutes,
    },
    {
        path: '/profile',
        redirect: {
            name: 'profile',
            params: {
                id: '0',
            }
        },
    },
    {
        path: '/*',
        component: PageNotFoundComponent,
    },
];

export const AppRouter = new VueRouter({
    routes,
});
