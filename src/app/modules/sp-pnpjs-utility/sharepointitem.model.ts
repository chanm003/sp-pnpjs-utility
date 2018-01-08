import { parser, HttpBodyParsers } from './httpBodyParser';

export class SharePointItem {
    static listName = '';

    @select('Author/EMail,Author/Id,Author/Title')
    @expand('Author')
    @parser({isReadOnly: true})
    Author: { Id: number, Title: string, EMail: string };

    @select()
    @parser({parser: 'DateTime', isReadOnly: true})
    Created: Date;

    @select('Editor/EMail,Editor/Id,Editor/Title')
    @expand('Editor')
    @parser({isReadOnly: true})
    Editor: { Id: number, Title: string, EMail: string };

    @select()
    @parser({isReadOnly: true})
    Id: number;

    @select('Modified')
    @parser({parser: 'DateTime', isReadOnly: true })
    Modified: Date;

    constructor(json?: any) {
        if (!json) { return; }

        const parsers = this.constructor[getSymbol('parser')];
        parsers.forEach(instruction => {
            (new HttpBodyParsers[instruction.parser]()).fromHttpResponse(json, this, instruction);
        });
    }

    static get fieldsForExpand() {
        return getFieldsTagged(this, 'expand');
    }

    static get fieldsForSelect() {
        return getFieldsTagged(this, 'select');
    }

    toHttpRequestBody() {
        const reqBody = {};
        const parsers = this.constructor[getSymbol('parser')];
        parsers.forEach(instruction => {
            if (!instruction.isReadOnly) {
                (new HttpBodyParsers[instruction.parser]()).fromHttpRequest(this, reqBody, instruction);
            }
        });
        return reqBody;
    }

    getByParserType(parserType: string): string[] {
        const fieldNames = [];
        const parsers = this.constructor[getSymbol('parser')];
        parsers.filter(instruction => {
            if (instruction.parser === parserType) {
                fieldNames.push(instruction.propName);
            }
        });
        return fieldNames;
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

export function listName(name: string) {
    return function(target: any) {
        target.listName = name;
    }
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
