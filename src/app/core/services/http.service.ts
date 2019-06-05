import { injectable, inject } from 'inversify';

import { LoggerService } from './logger.service';

@injectable()
export class HttpService {
    static diIdentifier: symbol = Symbol(`HttpService`);

    private sid: number;

    constructor (@inject(LoggerService.diIdentifier) public logger: LoggerService) {
        this.logger.className = `HttpService`;
        this.sid = Math.floor(Math.random() * 100);
        this.logger.info(`constructor (${this.sid})`, `Cteate service`);
    }

    public get () {
        this.logger.log(`get (${this.sid})`, `Called`);
    }

    public post () {
        this.logger.log(`post (${this.sid})`, `Called`);
    }

}
