import * as Inversify from 'inversify';

import { DIScope, DIDataType } from './vue-module.enum';

export type LazyInject = (serviceIdentifier: string | symbol
    | Inversify.interfaces.Newable<any> | Inversify.interfaces.Abstract<any>)
    => (proto: any, key: string) => void;
export type LazyInjectNamed = (serviceIdentifier: string | symbol
    | Inversify.interfaces.Newable<any> | Inversify.interfaces.Abstract<any>, named: string)
    => (proto: any, key: string) => void;
export type LazyInjectTagged = (serviceIdentifier: string | symbol
    | Inversify.interfaces.Newable<any> | Inversify.interfaces.Abstract<any>, key: string, value: any)
    => (proto: any, propertyName: string) => void;
export type LazyMultiInject = (serviceIdentifier: string | symbol
    | Inversify.interfaces.Newable<any> | Inversify.interfaces.Abstract<any>)
    => (proto: any, key: string) => void;

export interface Injectors {
    lazyInject: LazyInject;
    lazyInjectNamed: LazyInjectNamed;
    lazyInjectTagged: LazyInjectTagged;
    lazyMultiInject: LazyMultiInject;
}

export type DIKey = symbol;

export interface DependencyConfig {
    identifier: DIKey;
    dataType: DIDataType;
    data: any;
}

export interface BaseProvider {
    provide?: DIKey;
    scope?: DIScope;
}

export interface ClassProvider extends BaseProvider {
    useClass: any;
}

export interface ValueProvider extends BaseProvider {
    useValue: any;
}

export type DynamicValue = (context: Inversify.interfaces.Context) => any;
export interface DynamicValueProvider extends BaseProvider {
    useDynamicValue: DynamicValue;
}

export type ServiceProvider = ClassProvider | ValueProvider | DynamicValueProvider | any;

export type ExportProvider = DIKey | any;

export interface VueModuleConfig {
    modules?: any[];
    services?: ServiceProvider[];
    exports?: ExportProvider[];
}
