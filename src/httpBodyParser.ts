import * as _ from 'lodash';

export interface IHttpBodyParseInstruction {
    propName?: string;
    parser?: string;
    isReadOnly?: boolean;
    dbColumnName?: string;
    lookupColumnName?: string;
    parseLookupColumnAsArray?: boolean;
}

export function parser(instruction: IHttpBodyParseInstruction = { parser: 'Default', isReadOnly: false }):
    PropertyDecorator {   // this is the decorator factory
    return function (target: any, propertyKey: string): void {      // this is the decorator
        if (!instruction.parser) { instruction.parser = 'Default'; }
        if (instruction.isReadOnly === undefined) { instruction.isReadOnly = false; }

        const sym: string = getSymbol('parser');
        let currentValues: { propName: string, parser: string, isReadOnly: boolean, dbColumnName: string, lookupColumnName: string,
            parseLookupColumnAsArray: boolean }[] =
            target.constructor[sym];
        if (currentValues !== undefined) {
            currentValues =
                currentValues.concat([{
                    propName: propertyKey,
                    parser: instruction.parser,
                    isReadOnly: instruction.isReadOnly,
                    dbColumnName: instruction.dbColumnName,
                    lookupColumnName: instruction.lookupColumnName,
                    parseLookupColumnAsArray: instruction.parseLookupColumnAsArray
                }]);
        } else {
            currentValues = [].concat({
                propName: propertyKey,
                parser: instruction.parser,
                isReadOnly: instruction.isReadOnly,
                dbColumnName: instruction.dbColumnName,
                lookupColumnName: instruction.lookupColumnName,
                parseLookupColumnAsArray: instruction.parseLookupColumnAsArray
            });
        }

        target.constructor[sym] = currentValues;
    };
}

export namespace HttpBodyParsers {
    export interface IHttpBodyParser {
        fromHttpResponse(source: any, destination: any, instruction: IHttpBodyParseInstruction);
        fromHttpRequest(source: any, destination: any, instruction: IHttpBodyParseInstruction);
    }

    export class Default implements IHttpBodyParser {
        fromHttpResponse(source: any, destination: any, instruction: IHttpBodyParseInstruction) {
            destination[instruction.propName] = source[instruction.dbColumnName || instruction.propName];
        }

        fromHttpRequest(source: any, destination: any, instruction: IHttpBodyParseInstruction) {
            destination[instruction.dbColumnName || instruction.propName] = source[instruction.propName];
        }
    }

    export class DateTime implements IHttpBodyParser {
        fromHttpResponse(source: any, destination: any, instruction: IHttpBodyParseInstruction) {
            const sourceValue = source[instruction.dbColumnName || instruction.propName];
            destination[instruction.propName] = (!!sourceValue) ? new Date(sourceValue) : null;
        }

        fromHttpRequest(source: any, destination: any, instruction: IHttpBodyParseInstruction) {
            const dt = source[instruction.propName] as Date;
            destination[instruction.dbColumnName || instruction.propName] = (dt) ? dt.toISOString() : source[instruction.propName];
        }
    }

    export class JSON implements IHttpBodyParser {
        fromHttpResponse(source: any, destination: any, instruction: IHttpBodyParseInstruction) {
            const sourceValue = source[instruction.dbColumnName || instruction.propName];
            let parsedValue;
            try {
                parsedValue = (<any>window).JSON.parse(sourceValue || null);
            } catch (e) {
                parsedValue = null;
            }
            destination[instruction.propName] = parsedValue;
        }

        fromHttpRequest(source: any, destination: any, instruction: IHttpBodyParseInstruction) {
            let window: any;
            const sourceValue = source[instruction.propName];
            destination[instruction.dbColumnName || instruction.propName] =
                (_.isArray(sourceValue) || _.isObject(sourceValue)) ? (<any>window).JSON.stringify(sourceValue) : null;
        }
    }

    export class Lookup implements IHttpBodyParser {
        fromHttpResponse(source: any, destination: any, instruction: IHttpBodyParseInstruction) {
            const sourceValue: any = source[instruction.dbColumnName || instruction.propName];
            if  (sourceValue) {
                if (sourceValue.__deferred) {
                    destination[instruction.propName] = null;
                } else {
                    sourceValue.display = sourceValue[instruction.lookupColumnName || 'Id'];
                    sourceValue.value = sourceValue['Id'];
                    destination[instruction.propName] = instruction.parseLookupColumnAsArray ? [sourceValue] : sourceValue;
                }
            }
        }

        fromHttpRequest(source: any, destination: any, instruction: IHttpBodyParseInstruction) {
            const sourceValue: any = source[instruction.propName];
            let lookupId: number;

            if (instruction.parseLookupColumnAsArray) {
                lookupId = (!!sourceValue && _.isArray(sourceValue) && sourceValue.length) ? sourceValue[0].Id : null;
            } else {
                lookupId = (!!sourceValue) ? sourceValue.Id : null;
            }

            const columnName = (instruction.dbColumnName || instruction.propName) + 'Id';
            destination[columnName] = lookupId;
        }
    }

    export class LookupMulti implements IHttpBodyParser {
        fromHttpResponse(source: any, destination: any, instruction: IHttpBodyParseInstruction) {
            const sourceValue: any = source[instruction.dbColumnName || instruction.propName];

            if (sourceValue && sourceValue.results) {
                destination[instruction.propName] = _.map(sourceValue.results, (item: any) => {
                    item.display = item[instruction.lookupColumnName || 'Id'];
                    item.value = item['Id'];
                    return item;
                });
            }
        }

        fromHttpRequest(source: any, destination: any, instruction: IHttpBodyParseInstruction) {
            const sourceValue: any = source[instruction.propName];
            const lookupValues = _.map(sourceValue, (item: any) => item.Id);
            const columnName = (instruction.dbColumnName || instruction.propName) + 'Id';
            destination[columnName] = { results: lookupValues };
        }
    }

    export class MultiChoice implements IHttpBodyParser {
        fromHttpResponse(source: any, destination: any, instruction: IHttpBodyParseInstruction) {
            const sourceValue = source[instruction.dbColumnName || instruction.propName];
            destination[instruction.propName] = (sourceValue && sourceValue.results) ? sourceValue.results : [];
        }

        fromHttpRequest(source: any, destination: any, instruction: IHttpBodyParseInstruction) {
            destination[instruction.dbColumnName || instruction.propName] = {
                results: source[instruction.propName] || []
            };
        }
    }
}

function getSymbol(key: string): string {
    // symbol not supported on IE, maybe try with polyfill
    // const sym: symbol = Symbol.for(key);
    return '__' + key + '__';
}
