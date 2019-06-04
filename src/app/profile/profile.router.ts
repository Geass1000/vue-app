import { RouteConfig } from 'vue-router';

import ProfileDetailComponent from './detail/detail.component.vue';
import ProfileSettingsComponent from './settings/settings.component.vue';

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
