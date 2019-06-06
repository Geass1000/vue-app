import { VueModule, DIScope } from '../shared/base/module';

import { HttpService, LoggerService } from '../core/services';

import { CoreModule } from '../core/core.module';

export const ProfileModule = VueModule.init({
    parent: CoreModule,
    services: [
        HttpService,
        { useClass: LoggerService, scope: DIScope.Transient },
    ]
});
