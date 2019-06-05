import { Container } from 'inversify';
import getDecorators from 'inversify-inject-decorators';

import { LoggerService, HttpService } from './services';
import { VueModuleConfig, LazyInject, Injectors } from './vue-module.interface';

export class VueModule {
    private config!: VueModuleConfig;

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
        this.config = config;

        this.afterInit();
    }

    private afterInit (): void {
        this.container = new Container();

        this.parseConfig();

        this.injectors = getDecorators(this.container);
    }

    /**
     * Parses the configuration.
     * 1. Sets the container's `parent` property on an external module (container).
     * 2. Binds services to the module's container. Function is using the
     * `diIdentifier` property for this.
     *
     * @param  {VueModuleCo} config - module's configuration
     * @returns void
     */
    private parseConfig (): void {
        if (this.config.parent) {
            this.container.parent = this.config.parent.Container;
        }

        this.config.services.forEach((service) => {
            this.container.bind(service.diIdentifier)
                .to(service).inSingletonScope();
        });
    }
}
