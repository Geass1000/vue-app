import { VueModule } from './vue.module';

import { LoggerService, HttpService } from './services';

export const CoreModule = VueModule.init({
    services: [
        LoggerService,
        HttpService,
    ]
});
