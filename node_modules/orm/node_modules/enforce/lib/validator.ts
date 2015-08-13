/// <reference path="node.d.ts" />
/// <reference path="enforce.d.ts" />

class Validator implements enforce.IValidator {
    private validator: enforce.ValidationCallback;

    constructor(validate: enforce.ValidationCallback) {
        this.validator = validate;
        return this;
    }
    
    public validate(data: any, next: (message?: string) => void, thisArg?: any, contexts: enforce.ContextMap = {}) {
        this.validator.apply(thisArg, [data, next, contexts]);
    }

    ifDefined(): enforce.IValidator {
        return new Validator((value, next, contexts) => {
            if (value === undefined || value === null) return next();
            return this.validator(value, next, contexts);
        });
    }
    
    ifNotEmptyString(): enforce.IValidator {
        return new Validator((value, next, contexts) => {
            if (value === undefined || value === null) return next();
            if (typeof value !== 'string') return next();
            if (value.length === 0) return next();
            return this.validator(value, next, contexts);
        });
    }

    ifType(type: string): enforce.IValidator {
        return new Validator((value, next, contexts) => {
            if (typeof value != type) return next();
            return this.validator(value, next, contexts);
        });
    }

    ifNotType(type: string): enforce.IValidator {
        return new Validator((value, next, contexts) => {
            if (typeof value != type) return this.validator(value, next, contexts);
            return next();
        });
    }
}

export = Validator;