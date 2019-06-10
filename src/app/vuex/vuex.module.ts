import { VueModule, DIScope } from '../shared/base/module';

import { StoreDIKey, StoreInst } from './store';

export const VuexModule = VueModule.init({
    services: [
        { provide: StoreDIKey, useValue: StoreInst },
    ],
    exports: [
        StoreDIKey,
    ]
});
