import { Component, Prop, Vue } from 'vue-property-decorator';

import ProfileNavigationComponent from './navigation/navigation.component.vue';

@Component({
    components: {
        ProfileNavigationComponent,
    },
})
export default class ProfileComponent extends Vue {
}
