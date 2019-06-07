import { VueModule } from './../shared/base/module';

import { LoggerService, HttpService } from './services';

import { VuexModule } from '../vuex/vuex.module';

export const CoreModule = VueModule.init({
    parent: VuexModule,
    services: [
        LoggerService,
        HttpService,
    ]
});
