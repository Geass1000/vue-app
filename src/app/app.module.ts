import { VueModule, DIScope } from './shared/base/module';

import { CoreModule } from './core/core.module';

export const AppModule = VueModule.init({
    parent: CoreModule,
    services: [
    ]
});
