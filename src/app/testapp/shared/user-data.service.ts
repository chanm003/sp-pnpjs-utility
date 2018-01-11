import { Injectable } from '@angular/core';
import { SharepointContextService } from '../../../../public_api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserDataService {
  constructor(private http: HttpClient, private sharepointContextService: SharepointContextService) { }

  search = (text: string): Observable<Response> => {
    const mapSearchResult = (resp: any) => {
      return resp.d.results.map((item: any) => {
        return {
          Id: item.Id,
          Title: item.Name,
          Email: item.WorkEmail,
          display: item.Name,
          value: item.Id
        };
      });
    };

    const webUrl = this.sharepointContextService.getInfo().webAbsoluteUrl;
    const restEndpoint = '_vti_bin/ListData.svc/UserInformationList';
    const selectFields = ['Id', 'Name', 'WorkEmail'];
    const substringFilters = ['Name'].map(field => `substringof('${text}',${field})`);
    const url = `${webUrl}/${restEndpoint}?$select=${selectFields.join(',')}&$filter=${substringFilters.join(' or ')}`;
    return this.http.get(url)
      .map(mapSearchResult);
  }
}
