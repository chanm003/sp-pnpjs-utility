import { SharePointItem, select, parser, expand, listName } from '../../../../../public_api';
import * as moment from 'moment';

@listName('CrudSample')
export class Employee extends SharePointItem {

    @select()
    @parser()
    Name: string;

    @select()
    @parser()
    Biography: string;

    @select()
    @parser()
    Married: boolean;

    // SPField has internal name of 'BirthDate', but we want to map to Typescript property called 'DateOfBirth'
    @select('BirthDate')
    @parser({ parser: 'DateTime', dbColumnName: 'BirthDate' })
    DateOfBirth: Date;

    @select()
    @parser()
    NumberOfDependents: number;

    @select()
    @parser()
    MainCourse: string;

    @select()
    @parser()
    Dessert: string;

    @select()
    @parser({ parser: 'MultiChoice' })
    SideDishes: string[];

    @select('PrimaryResidenceCountry/Id,PrimaryResidenceCountry/Title')
    @expand('PrimaryResidenceCountry')
    @parser({ parser: 'Lookup', lookupColumnName: 'Title' })
    PrimaryResidenceCountry: Country;

    @select('CountriesVisited/Id,CountriesVisited/Title')
    @expand('CountriesVisited')
    @parser({ parser: 'LookupMulti', lookupColumnName: 'Title' })
    CountriesVisited: Country[];

    @select('Supervisor/EMail,Supervisor/Id,Supervisor/Title')
    @expand('Supervisor')
    @parser({ parser: 'Lookup', lookupColumnName: 'Title' })
    Supervisor: User;

    @select('Colleagues/Id,Colleagues/Title')
    @expand('Colleagues')
    @parser({ parser: 'LookupMulti', lookupColumnName: 'Title' })
    Colleagues: User[];

    @select()
    @parser({ parser: 'JSON' })
    Cars: any[];

    // not written, or read from SPList, just helpers
    calculatedColumns?: any;

    constructor(data?: Object) {
        super(data);
        this.populateCalculatedColumns();
        this.populateWithDefaultValues();
    }

    populateCalculatedColumns() {
        this.calculatedColumns = {
            DateOfBirthString: this.DateOfBirth ? moment(this.DateOfBirth).format('M/D/YYYY') : ''
        };
    }

    populateWithDefaultValues() {
        /* at the moment, this is not handled by library's JSON parser due to in ability to reflect data type
        *  i.e.  we want the multiple lines of text of field to hold an array
        *       @select()
        *       @parser({ parser: 'JSON' })
        *       Cars: any[];
        */
        this.Cars = this.Cars || [];
    }
}

export class Country {
    Id: number;
    Title: string;
}

export interface User {
    Id: number;
    Title: string;
    EMail?: string;
    value?: number;
    display?: string;
}
