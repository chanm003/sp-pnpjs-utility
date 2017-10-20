export interface IHttpBodyParseInstruction {
    propName?: string;
    parser?: string;
    isReadOnly?: boolean;
    dbColumnName?: string;
}

export function parser(instruction: IHttpBodyParseInstruction = { parser: 'Default', isReadOnly: true }):
    PropertyDecorator {   // this is the decorator factory
    return function (target: any, propertyKey: string): void {      // this is the decorator
        if (!instruction.parser) { instruction.parser = 'Default'; }
        if (instruction.isReadOnly === undefined) { instruction.isReadOnly = true; }

        const sym: string = getSymbol('parser');
        let currentValues: { propName: string, parser: string, isReadOnly: boolean, dbColumnName: string }[] = target.constructor[sym];
        if (currentValues !== undefined) {
            currentValues =
                currentValues.concat([{
                    propName: propertyKey,
                    parser: instruction.parser,
                    isReadOnly: instruction.isReadOnly,
                    dbColumnName: instruction.dbColumnName
                }]);
        } else {
            currentValues = [].concat({
                propName: propertyKey,
                parser: instruction.parser,
                isReadOnly: instruction.isReadOnly,
                dbColumnName: instruction.dbColumnName
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
            destination[instruction.propName] = new Date(source[instruction.dbColumnName || instruction.propName]);
        }

        fromHttpRequest(source: any, destination: any, instruction: IHttpBodyParseInstruction) {
            const dt = source[instruction.propName] as Date;
            destination[instruction.dbColumnName || instruction.propName] = (dt) ? dt.toISOString() : source[instruction.propName];
        }
    }
}

function getSymbol(key: string): string {
    // symbol not supported on IE, maybe try with polyfill
    // const sym: symbol = Symbol.for(key);
    return '__' + key + '__';
}
