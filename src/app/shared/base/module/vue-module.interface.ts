import { interfaces } from 'inversify';

import { DIScope } from './vue-module.enum';

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

export interface BaseProvider {
    provide?: symbol;
    scope?: DIScope;
}

export interface ClassProvider extends BaseProvider {
    useClass: any;
}

export type Provider = ClassProvider[] | any[];

export interface VueModuleConfig {
    parent?: any;
    services: Provider;
}
