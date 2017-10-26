import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';

export interface ODataQueryConfiguration {
    fieldsToSelect: string[];
    fieldsToSearch: string[];
    url: string;
    mapFunc: (item: any) => any;
}

@Injectable()
export class KeywordSearchService {
    http: Http;
    configuration: ODataQueryConfiguration;

    constructor() {}
    setup = (http: Http, configuration: ODataQueryConfiguration) => {
        this.http = http;
        this.configuration = configuration;
    }

    search = (text: string): Observable<Response> => {
        const selectOperation = this.configuration.fieldsToSelect.map(field => field).join(',');
        const filterOperation = this.configuration.fieldsToSearch.map(field => {
            return `substringof('${text}',${field})`;
        }).join(' or ');

        const url = `${this.configuration.url}?$select=${selectOperation}&$filter=${filterOperation}`;
        return this.http.get(url).map((resp: Response) => {
          const results = resp.json().d.results;
          const mappedData = results.map(this.configuration.mapFunc);
          return mappedData;
        });
      }
} 