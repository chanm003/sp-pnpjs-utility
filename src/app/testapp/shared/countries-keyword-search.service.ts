import { Injectable } from '@angular/core';
import { SharepointContextService } from '../../../../public_api';
import * as _ from 'lodash';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CountriesKeywordSearchService {

  constructor(private http: HttpClient, private sharepointContextService: SharepointContextService) {}

  search = (text: string): Observable<Response> => {
    const mapSearchResult = (resp: any) => {
      return resp.d.results.map((item: any) => {
        return {
          Id: item.Id,
          Title: item.Title,
          Capital: item.Capital,
          display: item.Title,
          value: item.Id
        };
      });
    };

    const webUrl = this.sharepointContextService.getInfo().webAbsoluteUrl;
    const restEndpoint = '_vti_bin/ListData.svc/Country';
    const selectFields = ['Id', 'Title', 'Capital'];
    const substringFilters = ['Title'].map(field => `substringof('${text}',${field})`);
    const url = `${webUrl}/${restEndpoint}?$select=${selectFields.join(',')}&$filter=${substringFilters.join(' or ')}`;
    return this.http.get(url)
      .map(mapSearchResult);
  }
}

@Injectable()
export class FakeCountriesKeywordSearchService {
  search(searchTerm: string): Observable<Response[]> {
    return Observable.of([]);
  }
}
