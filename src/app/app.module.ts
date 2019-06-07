import { VueModule, DIScope } from './shared/base/module';

import { StoreKey, StoreInst } from './vuex/store';

import { CoreModule } from './core/core.module';

export const AppModule = VueModule.init({
    parent: CoreModule,
    services: [
    ]
});
