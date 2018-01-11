import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrudsampleComponent } from './crudsample/crudsample.component';
import { CrudsampleListComponent } from './crudsample-list/crudsample-list.component';
import { CrudsamplesComponent } from './crudsamples.component';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Employee } from './shared/employee';
import { EmployeeDataService } from './shared/employee-data.service';
import { Observable } from 'rxjs/Observable';

export const routedComponents = [CrudsampleComponent, CrudsamplesComponent, CrudsampleListComponent];

@Injectable()
export class EmployeeDataEntryFormResolver implements Resolve<EmployeeDataEntryFormRouteData> {
    constructor(private employeeDataService: EmployeeDataService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = +route.params['id'];

        return Observable.zip(
            (!!id) ? this.employeeDataService.getById(id) : Observable.of(null)
        )
        .map(data => {
            const employee = data[0];

            return {
                employee: employee || new Employee()
            };
        }).first();
    }
}

const routes: Routes = [
  {
    path: '',
    component: CrudsamplesComponent,
    children: [
      {
        path: '',
        component: CrudsampleListComponent
      },
      {
        path: ':id',
        component: CrudsampleComponent,
        resolve: {
          data: EmployeeDataEntryFormResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [EmployeeDataEntryFormResolver]
})
export class CrudsamplesRoutingModule { }

export interface EmployeeDataEntryFormRouteData {
    employee: Employee;
}

