import { interfaces } from 'inversify';

import { DIScope, DIDataType } from './vue-module.enum';

export type LazyInject = (serviceIdentifier: string | symbol | interfaces.Newable<any> | interfaces.Abstract<any>)
    => (proto: any, key: string) => void;
export type LazyInjectNamed = (serviceIdentifier: string | symbol | interfaces.Newable<any> | interfaces.Abstract<any>, named: string)
    => (proto: any, key: string) => void;
export type LazyInjectTagged = (serviceIdentifier: string | symbol | interfaces.Newable<any> | interfaces.Abstract<any>, key: string, value: any)
    => (proto: any, propertyName: string) => void;
export type LazyMultiInject = (serviceIdentifier: string | symbol | interfaces.Newable<any> | interfaces.Abstract<any>)
    => (proto: any, key: string) => void;

export interface Injectors {
    lazyInject: LazyInject;
    lazyInjectNamed: LazyInjectNamed;
    lazyInjectTagged: LazyInjectTagged;
    lazyMultiInject: LazyMultiInject;
}

export type DIProvide = symbol;

export interface DependencyConfig {
    identifier: DIProvide;
    dataType: DIDataType;
    data: any;
}

export interface BaseProvider {
    provide?: DIProvide;
    scope?: DIScope;
}

export interface ClassProvider extends BaseProvider {
    useClass: any;
}

export interface ValueProvider extends BaseProvider {
    useValue: any;
}

export type Provider = ClassProvider | ValueProvider | any;

export interface VueModuleConfig {
    parent?: any;
    services: Provider[];
}
