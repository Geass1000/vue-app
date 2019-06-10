import * as Inversify from 'inversify';
import getDecorators from 'inversify-inject-decorators';

import _ from 'lodash';

import {
    VueModuleConfig, LazyInject, DynamicValue, DIKey,
    Injectors, DependencyConfig, ServiceProvider, ExportProvider,
} from './vue-module.interface';
import { DIScope, DIDataType } from './vue-module.enum';

export class VueModule {
    private _exportModule!: Inversify.ContainerModule;
    get exportModule (): Inversify.ContainerModule {
        return this._exportModule;
    }

    private parentModule: VueModule;
    get parent (): VueModule {
        return this.parentModule;
    }
    set parent (parent: VueModule) {
        this.container.parent = parent.Container;
        this.parentModule = parent;
    }

    /**
     * Module's container
     */
    private container!: Inversify.Container;
    get Container (): Inversify.Container {
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
        this.container = new Inversify.Container();

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
        if (_.isArray(config.modules) && config.modules.length) {
            this.registerModules(config.modules);
        }

        if (_.isArray(config.services) && config.services.length) {
            this.registerServices(config);
        }

        if (_.isArray(config.exports) && config.exports.length) {
            this.registerExports(config);
            this.container.load(this.exportModule);
        }

    }

    /**
     * Registers modules.
     * 1. Sets the parent property of each child module on the parent module.
     * 2. Gets Inversify module with exported services from each child module.
     * 3. Loads Inversify modules into the container.
     *
     * @param  {VueModule[]} modules - Inversify module with exported services
     * @returns void
     */
    private registerModules (modules: VueModule[]): void {
        modules.forEach((module) => {
            module.parent = this;

            const exportModule = module.exportModule;

            if (!_.isNil(exportModule)) {
                this.container.load(exportModule);
            }
        });
    }

    /**
     * Creates the Inversify module and binds the exported services to him.
     *
     * @param  {VueModuleConfig} config - module's configuration
     * @returns void
     */
    private registerExports (config: VueModuleConfig): void {
        this._exportModule = new Inversify.ContainerModule((moduleBind
                : Inversify.interfaces.Bind) => {
            config.exports.forEach((exportProvider) => {
                const diKey: DIKey = this
                    .getDIKeyFromExportProvider(exportProvider);

                if (!_.isSymbol(diKey)) {
                    throw new Error(`DI Key (${exportProvider}) is not found!`)
                }

                const provider: ServiceProvider = this
                    .findServiceProviderByDIKey(config.services, diKey);

                if (_.isUndefined(provider)) {
                    throw new Error(`ServiceProvider ${diKey.description} is not a valid!`);
                }

                this.registerProvider(moduleBind, provider);
            });
        });
    }

    /**
     * Registres services as dependencies of the current DI Container.
     * Excludes services what are already binded to export module. These services
     * will be added to container as the external module.
     *
     * @param  {VueModuleConfig} config - module's configuration
     * @returns void
     */
    private registerServices (config: VueModuleConfig): void {
        const containerBind = this.container.bind.bind(this.container);
        config.services.forEach((serviceProvider) => {
            const diKey: DIKey = this
                .getDIKeyFromServiceProvider(serviceProvider);
            const provider: ServiceProvider = this
                .findExportProviderByDIKey(config.exports, diKey);

            if (!_.isUndefined(provider)) {
                return;
            }

            this.registerProvider(containerBind, serviceProvider);
        });
    }

    /**
     * Registers the service provider.
     * 1. Parses the service provider (creates the dependency configuration)
     * 2. Binds dependency configuration to the container or external module.
     * 3. Sets the scope of dependency.
     *
     * @param  {Inversify.interfaces.Bind} bind - bind method (container/module)
     * @param  {ServiceProvider} provider - service provider
     * @returns void
     */
    private registerProvider (bind: Inversify.interfaces.Bind, provider: ServiceProvider): void {
        const dependencyConfig: DependencyConfig
                = this.getDependencyConfig(provider);

        if (!_.isSymbol(dependencyConfig.identifier)) {
            throw new Error(`DI identifier is not provided!`);
        }

        const boundDependency: Inversify.interfaces.BindingInWhenOnSyntax<{}>
            | Inversify.interfaces.BindingWhenOnSyntax<{}>
            = this.bindDependency(bind, dependencyConfig);

        // Skip step to apply the DI scope
        if (dependencyConfig.dataType === DIDataType.UseValue) {
            return;
        }

        const scope: DIScope = _.has(provider, 'scope')
            ? provider.scope : DIScope.Singleton;

        this.useScope(scope, boundDependency as Inversify.interfaces.BindingInWhenOnSyntax<{}>);
    }

    /**
     * Finds export provider by DI Key.
     *
     * @param  {ServiceProvider[]} exportProviders - list of export providers
     * @param  {DIKey} diKey - DI key
     * @returns ExportProvider
     */
    private findExportProviderByDIKey (exportProviders: ServiceProvider[],
            diKey: DIKey): ExportProvider {
        return _.find(exportProviders, (exportProvider) => {
            return this.getDIKeyFromExportProvider(exportProvider) === diKey;
        });
    }

    /**
     * Finds service provider by DI Key.
     *
     * @param  {ServiceProvider[]} serviceProviders - list of service providers
     * @param  {DIKey} diKey - DI key
     * @returns ServiceProvider
     */
    private findServiceProviderByDIKey (serviceProviders: ServiceProvider[],
            diKey: DIKey): ServiceProvider {
        return _.find(serviceProviders, (serviceProvider) => {
            return this.getDIKeyFromServiceProvider(serviceProvider) === diKey;
        });
    }

    /**
     * Creates the dependency configuration from service provider.
     *
     * @param  {ServiceProvider} provider - service provider
     * @returns DependencyConfig
     */
    private getDependencyConfig (provider: ServiceProvider): DependencyConfig {
        let diData: any;
        let diDataType: DIDataType;

        if (_.has(provider, 'useValue')) {
            diData = provider.useValue;
            diDataType = DIDataType.UseValue;
        } else if (_.has(provider, 'useDynamicValue')) {
            diData = provider.useDynamicValue;
            diDataType = DIDataType.UseDynamicValue;
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
     * Gets the DI Key from service provider.
     *
     * @param  {ServiceProvider} provider - service provider
     * @returns DIKey
     */
    private getDIKeyFromServiceProvider (provider: ServiceProvider): DIKey {
        if (_.has(provider, 'provide')) {
            return provider.provide;
        }

        let diData: any;
        if (_.has(provider, 'useValue')) {
            diData = provider.useValue;
        } else if (_.has(provider, 'useDynamicValue')) {
            diData = provider.useDynamicValue;
        } else if (_.has(provider, 'useClass')) {
            diData = provider.useClass;
        } else {
            diData = provider;
        }

        return _.get(diData, `diIdentifier`);
    }

    /**
     * Gets the DI Key from export provider.
     *
     * @param  {ExportProvider} provider - export provider
     * @returns DIKey
     */
    private getDIKeyFromExportProvider (provider: ExportProvider): DIKey {
        let diIdentifier: symbol;

        if (_.has(provider, 'diIdentifier')) {
            return provider.diIdentifier;
        }

        return provider as DIKey;
    }

    /**
     * Binds the dependency to the DI container.
     *
     * @param  {DependencyConfig} dependencyConfig - dependency configuration
     * @returns Inversify.interfaces.BindingInWhenOnSyntax<{}>
     */
    private bindDependency (bind: Inversify.interfaces.Bind, dependencyConfig: DependencyConfig)
            : Inversify.interfaces.BindingInWhenOnSyntax<{}>
            | Inversify.interfaces.BindingWhenOnSyntax<{}> {
        const boundData: Inversify.interfaces.BindingToSyntax<{}>
            = bind(dependencyConfig.identifier);

        switch (dependencyConfig.dataType) {
            case DIDataType.UseClass:
                // Binds the `Class` dependency.
                return boundData.to(dependencyConfig.data);
            case DIDataType.UseValue:
                // Binds the `Value` dependency.
                return boundData.toConstantValue(dependencyConfig.data);
            case DIDataType.UseDynamicValue:
                // Binds the `Dynamic Value` dependency.
                return boundData.toDynamicValue(dependencyConfig.data);
        }
    }

    /**
     * Applies the correct scope to dependency.
     *
     * @param  {DIScope} scope - dependency scope
     * @param  {Inversify.interfaces.BindingInWhenOnSyntax<{}>} boundDependency - bound dependency
     * @returns void
     */
    private useScope (scope: DIScope,
            boundDependency: Inversify.interfaces.BindingInWhenOnSyntax<{}>): void {
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
