import { RouteConfig } from 'vue-router';

// import ProfileDetailComponent from './detail/detail.component.vue';
// import ProfileSettingsComponent from './settings/settings.component.vue';
const ProfileDetailComponent = () => import(/* webpackChunkName: "profile-detail" */ `./detail/detail.component.vue`);
const ProfileSettingsComponent = () => import(/* webpackChunkName: "profile-settings" */ `./settings/settings.component.vue`);

export const profileRoutes: RouteConfig[] = [
    {
        path: 'detail',
        name: 'detail',
        component: ProfileDetailComponent,
    },
    {
        path: 'settings',
        name: 'settings',
        component: ProfileSettingsComponent,
    },
];
