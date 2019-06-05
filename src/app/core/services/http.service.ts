import { Inject, Service, Token } from 'vue-di-container';

@Service()
export class HttpService {
    private sid: number;

    constructor () {
        this.sid = Math.floor(Math.random() * 100);
        console.info(`HttpService - constructor (${this.sid}): Cteate service`);
    }

    public get () {
        console.log(`HttpService - get (${this.sid}): Called`);
    }

    public post () {
        console.log(`HttpService - post (${this.sid}): Called`);
    }
}
