import { Container } from 'inversify';
import getDecorators from 'inversify-inject-decorators';

import { LoggerService, HttpService } from './services';
import { VueModuleConfig, LazyInject, Injectors } from './vue-module.interface';

export class VueModule {
    private parentModule: VueModule | null;
    get parent (): VueModule | null {
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
     * 1. Sets the container's `parent` property on an external module (container).
     * 2. Binds services to the module's container. Function is using the
     * `diIdentifier` property for this.
     *
     * @param  {VueModuleConfig} config - module's configuration
     * @returns void
     */
    private parseConfig (config: VueModuleConfig): void {
        if (config.parent) {
            this.container.parent = config.parent.Container;
            this.parentModule = config.parent;
        }

        config.services.forEach((service) => {
            this.container.bind(service.diIdentifier)
                .to(service).inSingletonScope();
        });
    }
}
