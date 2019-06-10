import { VueModule, DIScope } from '../shared/base/module';

import { HttpService, LoggerService } from '../core/services';

export const ProfileModule = VueModule.init({
    services: [
        HttpService,
        { useClass: LoggerService, scope: DIScope.Transient },
    ]
});
