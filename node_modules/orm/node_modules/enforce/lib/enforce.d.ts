declare var exports: any

declare module enforce {
    export interface IEnforce {
        add(property: string, validator: ValidationCallback): IEnforce;
        add(property: string, validator: IValidator): IEnforce;
        context(): any;
        context(name: string): any;
        context(name: string, value: any): IEnforce;
        clear();
        check(data: any, cb: (error: Error) => void);
        check(data: any, cb: (errors: Error[]) => void);
    }

    export interface EnforceStatic {
        Enforce(options?: Options): IEnforce;
    }

    export interface Options {
        returnAllErrors: boolean;
    }

    interface ContextMap {
        property?: string;
        [name: string]: any;
    }

    interface IValidator {
        validate(data: any, next: (message?: string) => void, thisArg?: any, contexts?: enforce.ContextMap)
    }

    interface ValidationCallback {
        (value: any, next: (errorMessage?: string) => boolean, contexts: ContextMap);
    }

    interface ValidatorMap {
        [property: string]: IValidator[];
    }

    export interface ValidationError extends Error {
        property?: string;
        value?: any;
        msg?: string;
        type?: string;
    }
}