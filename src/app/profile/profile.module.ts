import { VueModule, DIScope } from '../shared/base/module';

import { HttpService, LoggerService } from '../core/services';

import { AppModule } from '../app.module';

export const ProfileModule = VueModule.init({
    parent: AppModule,
    services: [
        HttpService,
        { useClass: LoggerService, scope: DIScope.Transient },
    ]
});
