import { VueModule, DIScope } from '../shared/base/module';

import { StoreKey, StoreInst } from './store';

export const VuexModule = VueModule.init({
    services: [
        { provide: StoreKey, useValue: StoreInst },
    ],
    exports: [
        StoreKey,
    ]
});
