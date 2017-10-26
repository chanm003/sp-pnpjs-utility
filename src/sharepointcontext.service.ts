import { Injectable } from '@angular/core';
import pnp, { Web } from 'sp-pnp-js';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class SharepointContextService {
    environment: {production: boolean, webAbsoluteUrl?: string, userId?: number};

    constructor(private http: Http) {
    }

    setup(environment: {production: boolean, webAbsoluteUrl?: string, userId?: number}) {
        this.environment = environment;
        pnp.setup({
            sp: {
                headers: {
                    'Accept': 'application/json; odata=verbose'
                },
                baseUrl: this.getInfo().webAbsoluteUrl
            }
        });
    }

    getInfo(): SpPageContextInfo {
        if (this.environment.production) {
            const spPage = (<any>window);
            return {
                webAbsoluteUrl: spPage._spPageContextInfo.webAbsoluteUrl,
                userId: spPage._spPageContextInfo.userId
            };
        } else {
            return {
                webAbsoluteUrl: this.environment.webAbsoluteUrl,
                userId: this.environment.userId
            };
        }
    }

    getWeb(): Web {
        return new Web(this.getInfo().webAbsoluteUrl);
    }

    searchUserDirectory = (text: string): Observable<Response> => {
        const fieldsToSelect = 'Id,Name,WorkEmail';
        const webUrl = this.getInfo().webAbsoluteUrl;
        const url = `${webUrl}/_vti_bin/ListData.svc/UserInformationList?$select=${fieldsToSelect}&$filter=substringof('${text}',Name)`;
        return this.http.get(url).map((resp: Response) => {
          const results = resp.json().d.results;
          const mappedData = results.map(item => {
              /*make it look like data that comes back from /_api/web/siteusers*/
              return {
                Id: item.Id,
                Title: item.Name,
                Email: item.WorkEmail,
                display: item.Name,
                value: item.Id
              };
            });
          return mappedData;
        });
      }
}

export class SpPageContextInfo {
    webAbsoluteUrl: string;
    userId: number;
}
