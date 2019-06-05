import { Inject, Service, Token } from 'vue-di-container';

import { LogLevel } from '../../shared/enums/service.enum';

@Service()
export class LoggerService {
    private curLogLevel: LogLevel = LogLevel.Log;

    public set className (name: string) {
        this._className = name;
    }
    public get className () {
        return this._className;
    }
    /**
     * Name of class who uses the current instance of the LoggerService
     */
    private _className: string = '';

    constructor () {
    }

    /**
     * Wrapps the `console.error` function and adds log description to the log message.
     *
     * @param  {string} methodName - name of the method who called the `error` function
     * @param  {any[]} ...restMsgs - user's messages
     */
    public error (methodName: string, ...restMsgs: any[]) {
        if (this.isDisabled(LogLevel.Warn)) {
            return;
        }

        this.callLogFunction(console.error, methodName, restMsgs);
    }

    /**
     * Wrapps the `console.warn` function and adds log description to the log message.
     *
     * @param  {string} methodName - name of the method who called the `warn` function
     * @param  {any[]} ...restMsgs - user's messages
     */
    public warn (methodName: string, ...restMsgs: any[]) {
        if (this.isDisabled(LogLevel.Warn)) {
            return;
        }

        this.callLogFunction(console.warn, methodName, restMsgs);
    }

    /**
     * Wrapps the `console.info` function and adds log description to the log message.
     *
     * @param  {string} methodName - name of the method who called the `info` function
     * @param  {any[]} ...restMsgs - user's messages
     */
    public info (methodName: string, ...restMsgs: any[]) {
        if (this.isDisabled(LogLevel.Info)) {
            return;
        }

        this.callLogFunction(console.info, methodName, restMsgs);
    }

    /**
     * Wrapps the `console.debug` function and adds log description to the log message.
     *
     * @param  {string} methodName - name of the method who called the `debug` function
     * @param  {any[]} ...restMsgs - user's messages
     */
    public debug (methodName: string, ...restMsgs: any[]) {
        if (this.isDisabled(LogLevel.Debug)) {
            return;
        }

        this.callLogFunction(console.debug || console.log, methodName, restMsgs);
    }

    /**
     * Wrapps the `console.log` function and adds log description to the log message.
     *
     * @param  {string} methodName - name of the method who called the `log` function
     * @param  {any[]} ...restMsgs - user's messages
     */
    public log (methodName: string, ...restMsgs: any[]) {
        if (this.isDisabled(LogLevel.Log)) {
            return;
        }

        this.callLogFunction(console.log, methodName, restMsgs);
    }

    /**
     * Calls the corresponding `console` method by the level of logging.
     *
     * @param  {string} methodName - name of the method who called the `log` function
     * @param  {LogLevel} logLevel - level of logging
     * @param  {any[]} ...restMsgs - user's messages
     */
    public print (methodName: string, logLevel: LogLevel, ...restMsgs: any[]) {
        switch (logLevel) {
            case LogLevel.Error:
                this.error(methodName, restMsgs);
                return;
            case LogLevel.Warn:
                this.warn(methodName, restMsgs);
                return;
            case LogLevel.Info:
                this.info(methodName, restMsgs);
                return;
            case LogLevel.Debug:
                this.debug(methodName, restMsgs);
                return;
            case LogLevel.Log:
                this.log(methodName, restMsgs);
                return;
        }
    }

    /**
     * Returns true if current level of logging is greater than o equal to log level from params.
     *
     * @param  {LogLevel} level - level of logging
     * @returns boolean
     */
    private isEnabled (level: LogLevel): boolean {
        return this.curLogLevel >= level;
    }

    /**
     * Returns true if current level of logging is smaller than log level from params.
     *
     * @param  {LogLevel} level - level of logging
     * @returns boolean
     */
    private isDisabled (level: LogLevel): boolean {
        return this.curLogLevel < level;
    }

    /**
     * Returns the description of log message (class and method names).
     *
     * @param  {string} methodName - name of the method who called the log function
     * @returns string
     */
    private getMessageDescription (methodName: string): string {
        return `${this.className} - ${methodName}`;
    }

    /**
     * Calls the log function with description of the message.
     *
     * @param  {Function} logFunc - log function
     * @param  {string} methodName - name of the method who called the log function
     * @param  {any[]} msgs - user's messages
     * @returns void
     */
    private callLogFunction (logFunc: Function, methodName: string, msgs: any[]): void {
        const msgDescriptor: string = this.getMessageDescription(methodName);
        const msgSeparator: string = !msgs ? '' : ': ';
        logFunc.apply(console, [ msgDescriptor + msgSeparator, ...msgs ]);
    }
}
