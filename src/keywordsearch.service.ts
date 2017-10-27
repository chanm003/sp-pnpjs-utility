import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';

export interface ODataQueryConfiguration {
    http: Http;
    fieldsToSelect: string[];
    fieldsToSearch: string[];
    url: string;
    mapFunc: (resp: Response) => any;
}

@Injectable()
export class KeywordSearchService {
    constructor() {}
    search = (text: string, configuration: ODataQueryConfiguration): Observable<Response> => {
        const selectOperation = configuration.fieldsToSelect.map(field => field).join(',');
        const filterOperation = configuration.fieldsToSearch.map(field => {
            return `substringof('${text}',${field})`;
        }).join(' or ');

        const url = `${configuration.url}?$select=${selectOperation}&$filter=${filterOperation}`;
        return configuration.http.get(url).map(configuration.mapFunc);
      }
}
