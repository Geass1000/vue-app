import { FormControl } from './form-control.base';
import { FormModuleConfig } from '../../interfaces/form-base.interface';

export class FormModule {
    /**
     * List of the module's controls
     */
    private controls: FormControl[];

    static create (moduleConfig: FormModuleConfig) {
        return new this(moduleConfig);
    }

    constructor (moduleConfig: FormModuleConfig) {
        this.parseConfig(moduleConfig);
    }

    /**
     * Parses the form module's configuration.
     *
     * @param  {FormModuleConfig} moduleConfig - form module's configuration
     * @returns void
     */
    public parseConfig (moduleConfig: FormModuleConfig): void {
        this.controls = moduleConfig.map((controlConfig) => new FormControl(controlConfig));
    }

    /**
     * Finds and returns control by name.
     * 
     * @param  {string} name - control's name
     * @returns FormControl | null
     */
    public getControl (name: string): FormControl | null {
        return this.controls.find((control) => control.name === name) || null;
    }
}
