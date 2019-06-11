import { VueModule } from './../../base/module';

import { HttpService } from './http.service';
import { AxiosServiceInst, AxiosDIKey } from './axios.service';

export const HttpModule = VueModule.init({
    services: [
        HttpService,
        { provide: AxiosDIKey, useValue: AxiosServiceInst },
    ],
    exports: [
        HttpService,
        AxiosDIKey,
    ]
});
