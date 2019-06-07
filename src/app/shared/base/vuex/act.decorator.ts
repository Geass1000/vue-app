
/**
 * Decorator. Gets the act payload from original method and calls the
 * store's `commit` method.
 *
 * @param  {string} event - vuex event
 * @returns any
 */
function Mutation (event: string): any {
    return function (target: any, propertyName: string,
            descriptor: TypedPropertyDescriptor<Function>): PropertyDescriptor {
        const originalMethod = descriptor.value;

        descriptor.value = function(...args: any[]): any {
            const actPayload = originalMethod.apply(this, args);
            return (<any>this).store.commit(event, actPayload);
        };

        return descriptor;
    };
}

/**
 * Decorator. Gets the act payload from original method and calls the
 * store's `dispatch` method.
 *
 * @param  {string} event - vuex event
 * @returns any
 */
function Action (event: string): any {
    return function (target: any, propertyName: string,
            descriptor: TypedPropertyDescriptor<Function>): PropertyDescriptor {
        const originalMethod = descriptor.value;

        descriptor.value = function(...args: any[]): any {
            const actPayload = originalMethod.apply(this, args);
            return (<any>this).store.dispatch(event, actPayload);
        };

        return descriptor;
    };
}

export const ActDecorator = {
    Mutation,
    Action,
};
