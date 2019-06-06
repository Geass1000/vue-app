
export interface FormControlConfig {
    formState: any,
    name: string,
    validators?: any, // TODO: Add interface
}

export type FormModuleConfig = FormControlConfig[];
