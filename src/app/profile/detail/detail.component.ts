import { FormModule } from './../../shared/base/form/form-module.base';
import { Component, Prop, Vue } from 'vue-property-decorator';

import VTextFieldBase from '../../shared/base/v-text-field/v-text-field.base.vue';

@Component({
    components: { VTextFieldBase },
    $_veeValidate: { validator: 'new' }, // inject an instance of the VeeValidate
})
export default class ProfileDetailComponent extends Vue {
    public valid: boolean = true;

    public formModule: FormModule;

    public created () {
        this.formModule = FormModule.create([
            {
                name: 'userName',
                formState: `Geass`,
                validators: {
                    required: true,
                    min: 3,
                },
            },
            {
                name: 'email',
                formState: ``,
                validators: {
                    required: true,
                    email: true,
                },
            },
            {
                name: 'isPublic',
                formState: true,
            },
        ]);
    }

    public send () {
    }

    /**
     * Computed property. Validates the form.
     *
     * @returns boolean
     */
    public get isValidForm (): boolean {
        const isVaild: boolean = this.$validator.fields.items
            .every((item) => item.flags.valid);
        return isVaild;
    }
}
