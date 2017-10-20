export class SharepointDataTypeParseInstruction {
    constructor(private parser = 'Default', private isReadOnly = true) {}
}

export class SharePointItem {
    __metadata: any;
    @select('Author/EMail,Author/Title')
    @expand('Author')
    Author: { Title: string, EMail: string };
    @select()
    AuthorId: number;
    @select()
    Created: string;
    @select('Editor/EMail,Editor/Title')
    @expand('Editor')
    Editor: { Title: string, EMail: string };
    @select()
    @parser(new SharepointDataTypeParseInstruction('Default'))
    Id: number;
    @select()
    @parser(new SharepointDataTypeParseInstruction('DateTime', false))
    Modified: string;

    constructor(json?: any) {
        /*
        const parsers = this.constructor[getSymbol('parser')];

        parsers.forEach(parser => {
            if (parser.propName === parser.queryName) {
                (new SharepointDataTypeParsers['Default']()).parseFromStorage(json, this, parser.propName);
            } else {
                const customParser = parser.queryName;
                (new SharepointDataTypeParsers[customParser]()).parseFromStorage(json, this, parser.propName);
            }
        });
        */
    }

    static get fieldsForExpand() {
        return getFieldsTagged(this, 'expand');
    }

    static get fieldsForSelect() {
        return getFieldsTagged(this, 'select');
    }
}

export function select(queryName?: string): PropertyDecorator {   // this is the decorator factory
    return function (target: any, propertyKey: string): void {      // this is the decorator
        setMetadata(target, 'select', propertyKey, queryName);
    };
}

export function expand(expandName: string): PropertyDecorator {   // this is the decorator factory
    return function (target: any, propertyKey: string): void {      // this is the decorator
        setMetadata(target, 'expand', propertyKey, expandName);
    };
}



export function parser(instruction: SharepointDataTypeParseInstruction): PropertyDecorator {   // this is the decorator factory
    return function (target: any, propertyKey: string): void {      // this is the decorator
        console.log(instruction);
    };
}

function setMetadata(target: any, key: string, propName: string, queryName: string): void {
    // string.isNullOrUndefinedOrEmpty
    if (!(typeof queryName === 'string' && queryName.length > 0)) {
        queryName = propName;
    }

    const sym: string = getSymbol(key);

    // instead of using Map object, we use an array of objects, as Map is not well supported
    // still by all the browsers, consider using Map compiling TypeScript to ES6 and using Babel to transpile to ES5
    let currentValues: { propName: string, queryName: string }[] = target.constructor[sym];
    if (currentValues !== undefined) {
        currentValues = [...currentValues, { propName, queryName }];
    } else {
        currentValues = [].concat({ propName, queryName });
    }


    // property Decorators will store the metadata in its instance ( as a class property)
    // ideally having a symbol as a key, but symbol are not still supported on all the browsers
    // and they will require polyfill, as a sample, I will not use symbols, but please, consider it
    target.constructor[sym] = currentValues;
}

function getSymbol(key: string): string {
    // symbol not supported on IE, maybe try with polyfill
    // const sym: symbol = Symbol.for(key);
    return '__' + key + '__';
}

function getFieldsTagged(constructor: any, parameter: string) {
    const sym: string = getSymbol(parameter);
    // get pre-saved select and expand props from decorators
    const arrayprops: { propName: string, queryName: string }[] = constructor[sym];
    let list = '';
    if (arrayprops !== undefined && arrayprops !== null) {
        list = arrayprops.map(i => i.queryName).join(',');
    } else {
        console.log(parameter);
    }
    return list;
}

namespace SharepointDataTypeParsers {
    export class Default {
        parseFromStorage(source: any, destination: any, propName: string) {
            console.log('invoked default parser');
            destination[propName] = source[propName];
        }
    }

    export class DateTime {
        parseFromStorage(source: any, destination: any, propName: string) {
            console.log('invoked date parser');
            destination[propName] = source[propName];
        }
    }
}