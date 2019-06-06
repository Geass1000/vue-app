import { VueModule } from './../shared/base/module';

import { LoggerService, HttpService } from './services';

export const CoreModule = VueModule.init({
    services: [
        LoggerService,
        HttpService,
    ]
});
