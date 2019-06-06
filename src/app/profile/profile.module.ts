import { VueModule } from '../shared/base/module';

import { HttpService } from '../core/services';

import { CoreModule } from '../core/core.module';

export const ProfileModule = VueModule.init({
    parent: CoreModule,
    services: [
        HttpService,
    ]
});
