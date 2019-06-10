import { VueModule, DIScope } from './shared/base/module';

import { CoreModule } from './core/core.module';
import { VuexModule } from './vuex/vuex.module';
import { ProfileModule } from './profile/profile.module';

export const AppModule = VueModule.init({
    modules: [ CoreModule, VuexModule, ProfileModule, ],
});
