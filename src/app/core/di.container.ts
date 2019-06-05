import { Container } from 'inversify';
import getDecorators from 'inversify-inject-decorators';

import { LoggerService, HttpService } from './services';

let container = new Container();
container.bind<LoggerService>(LoggerService.diIdentifier).to(LoggerService);
container.bind<HttpService>(HttpService.diIdentifier).to(HttpService).inSingletonScope();

let childContainer = new Container();
childContainer.parent = container;
childContainer.bind<HttpService>(HttpService.diIdentifier).to(HttpService);

// console.log(container.get(HttpService.diIdentifier)); //60
// console.log(container.get(HttpService.diIdentifier)); //60

// console.log(childContainer.get(HttpService.diIdentifier)); //72
// console.log(childContainer.get(HttpService.diIdentifier)); //72

const { lazyInject } = getDecorators(container);

export { container, lazyInject }


