import { FormControlConfig } from '../../interfaces/form-base.interface';

export class FormControl {
    /**
     * Control's value.
     */
    public value: any;

    /**
     * Control's validators.
     */
    public _validators: any;
    public get validators(): any {
        return this._validators;
    };

    /**
     * Control's name.
     */
    private _name: string;
    public get name (): string {
        return this._name;
    }

    constructor (config: FormControlConfig) {
        this.parseConfig(config);
    }

    /**
     * Parses the control's configuration.
     *
     * @param  {FormControlConfig} config - control's configuration
     * @returns void
     */
    private parseConfig (config: FormControlConfig): void {
        this.value = config.formState;
        this._validators = config.validators || {};
        this._name = config.name;
    }
}
