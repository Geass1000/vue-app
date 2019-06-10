import { DIScope } from './../shared/base/module/vue-module.enum';
import { VueModule } from './../shared/base/module';

import { LoggerService, HttpService } from './services';

import { AxiosValue, AxiosDIKey } from './services/axios.service';

export const CoreModule = VueModule.init({
    services: [
        LoggerService,
        HttpService,
        { provide: AxiosDIKey, useValue: AxiosValue },
    ],
    exports: [
        LoggerService,
        HttpService,
        AxiosDIKey,
    ]
});
