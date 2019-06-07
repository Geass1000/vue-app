import { Container, interfaces as inversifyInterfaces } from 'inversify';
import getDecorators from 'inversify-inject-decorators';

import _ from 'lodash';

import {
    VueModuleConfig, LazyInject,
    Injectors, DependencyConfig, Provider
} from './vue-module.interface';
import { DIScope, DIDataType } from './vue-module.enum';

export class VueModule {
    private parentModule: VueModule;
    get parent (): VueModule {
        return this.parentModule;
    }

    /**
     * Module's container
     */
    private container!: Container;
    get Container (): Container {
        return this.container;
    }

    /**
     * Object with `Inject` methods for module's container
     */
    private injectors!: Injectors;
    get lazyInject (): LazyInject {
        return this.injectors.lazyInject;
    }

    static init (config: VueModuleConfig) {
        return new this(config);
    }

    constructor (config: VueModuleConfig) {
        this.parentModule = null;

        this.afterInit(config);
    }

    /**
     * Hook. It is called after `constructor`.
     * 1. Creates the DI Container (inversify).
     * 2. Calls the parser of the module's configuration.
     * 3. Creates decorators for module's injectors.
     *
     * @param  {VueModuleConfig} config - module's configuration
     * @returns void
     */
    private afterInit (config: VueModuleConfig): void {
        this.container = new Container();

        this.parseConfig(config);

        this.injectors = getDecorators(this.container);
    }

    /**
     * Parses the configuration.
     * 1. Sets the container's `parent` property on an external container.
     * 2. Sets the class's `parent` property on an external module.
     * 3. Binds dependencies to the module's container.
     * 4. Applies correct DI scope for each dependency.
     *
     * @param  {VueModuleConfig} config - module's configuration
     * @returns void
     */
    private parseConfig (config: VueModuleConfig): void {
        if (config.parent) {
            this.container.parent = config.parent.Container;
            this.parentModule = config.parent;
        }

        config.services.forEach((provider) => {
            const dependencyConfig: DependencyConfig
                = this.getDependencyConfig(provider);

            if (!_.isSymbol(dependencyConfig.identifier)) {
                throw new Error(`DI identifier is not provided!`);
            }

            const boundDependency: inversifyInterfaces.BindingInWhenOnSyntax<{}>
                | inversifyInterfaces.BindingWhenOnSyntax<{}>
                = this.bindDependency(dependencyConfig);

            // Skip step to apply the DI scope
            if (dependencyConfig.dataType === DIDataType.UseValue) {
                return;
            }

            const scope: DIScope = _.has(provider, 'scope')
                ? provider.scope : DIScope.Singleton;

            this.useScope(scope, boundDependency as inversifyInterfaces.BindingInWhenOnSyntax<{}>);
        });
    }

    /**
     * Creates the dependency configuration from provider.
     *
     * @param  {Provider} provider - provider configuration
     * @returns DependencyConfig
     */
    private getDependencyConfig (provider: Provider): DependencyConfig {
        let diData: any;
        let diDataType: DIDataType;

        if (_.has(provider, 'useValue')) {
            diData = provider.useValue;
            diDataType = DIDataType.UseValue;
        } else if (_.has(provider, 'useClass')) {
            diData = provider.useClass;
            diDataType = DIDataType.UseClass;
        } else {
            diData = provider;
            diDataType = DIDataType.UseClass;
        }

        let diIdentifier: symbol = _.has(provider, 'provide')
            ? provider.provide
            : _.get(diData, `diIdentifier`);

        return {
            identifier: diIdentifier,
            dataType: diDataType,
            data: diData,
        };
    }

    /**
     * Binds the dependency to the DI container.
     *
     * @param  {DependencyConfig} dependencyConfig - dependency configuration
     * @returns inversifyInterfaces.BindingInWhenOnSyntax<{}>
     */
    private bindDependency (dependencyConfig: DependencyConfig)
            : inversifyInterfaces.BindingInWhenOnSyntax<{}>
            | inversifyInterfaces.BindingWhenOnSyntax<{}> {
        switch (dependencyConfig.dataType) {
            case DIDataType.UseClass:
                return this.bindClass(dependencyConfig.identifier, dependencyConfig.data);
            case DIDataType.UseValue:
                return this.bindValue(dependencyConfig.identifier, dependencyConfig.data);
        }
    }

    /**
     * Binds the `Class` dependency to the DI container.
     *
     * @param  {symbol} diIdentifier - dependency identifier
     * @param  {any} diClass - dependency class
     * @returns inversifyInterfaces.BindingInWhenOnSyntax<{}>
     */
    private bindClass (diIdentifier: symbol, diClass: any)
            : inversifyInterfaces.BindingInWhenOnSyntax<{}> {
        return this.container.bind(diIdentifier).to(diClass);
    }

    /**
     * Binds the `Value` dependency to the DI container.
     *
     * @param  {symbol} diIdentifier - dependency identifier
     * @param  {any} diValue - dependency value
     * @returns inversifyInterfaces.BindingInWhenOnSyntax<{}>
     */
    private bindValue (diIdentifier: symbol, diValue: any)
            : inversifyInterfaces.BindingWhenOnSyntax<{}> {
        return this.container.bind(diIdentifier).toConstantValue(diValue);
    }

    /**
     * Applies the correct scope to dependency.
     *
     * @param  {DIScope} scope - dependency scope
     * @param  {inversifyInterfaces.BindingInWhenOnSyntax<{}>} boundDependency - bound dependency
     * @returns void
     */
    private useScope (scope: DIScope,
            boundDependency: inversifyInterfaces.BindingInWhenOnSyntax<{}>): void {
        switch (scope) {
            case DIScope.Transient:
                boundDependency.inTransientScope();
                break;
            case DIScope.Request:
                boundDependency.inRequestScope();
                break;
            case DIScope.Singleton:
                boundDependency.inSingletonScope();
                break;
            default:
                throw new Error(`Undefined scope!`);
        }
    }
}
