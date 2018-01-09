import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/zip';
import 'rxjs/add/observable/of';
import { SPRouteResolverContract } from './sp-route-resolver-contract';
import { SPDataService } from './sp-data.service';
import { SPModel } from './sp-model';

@Injectable()
export class SPRouteResolver implements Resolve<{item: SPModel}> {
  service: SPDataService;
  router: Router;
  constructor(service: SPDataService, router: Router) {
      this.service = service;
      this.router = router;
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = +route.params['id'];

    return Observable.zip(
              (!!id)
              ? this.service.getById(id)
              : Observable.of(this.service.getModelInstance())
            ).map(data => {
              const item = data[0];

              return {
                item: item || this.service.getModelInstance()
              };
            }).first();
  }
}
