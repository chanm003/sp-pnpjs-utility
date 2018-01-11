import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { SharepointContextService } from '../../../../../public_api';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EmployeeDataService {

  constructor(private sharepointContextService: SharepointContextService) { }

  create(item: Employee): Observable<Employee> {
    return Observable.fromPromise(this.sharepointContextService.getWeb().lists.getByTitle(Employee.listName).items
      .add(item.toHttpRequestBody()))
      .map(resp => new Employee(resp.data));
  }

  delete(item: Employee) {
    return Observable.fromPromise(this.sharepointContextService.getWeb().lists.getByTitle(Employee.listName).items
      .getById(item.Id)
      .delete());
  }

  getById(id): Observable<Employee> {
    return Observable.fromPromise(this.sharepointContextService.getWeb().lists.getByTitle(Employee.listName).items
      .getById(id)
      .select(Employee.fieldsForSelect)
      .expand(Employee.fieldsForExpand)
      .get())
      .map(item => new Employee(item));
  }

  getItems(): Observable<Employee[]> {
    return Observable.fromPromise(this.sharepointContextService.getWeb().lists.getByTitle(Employee.listName).items
      .select(Employee.fieldsForSelect)
      .expand(Employee.fieldsForExpand)
      .top(300)
      .orderBy('Id')
      .get())
      .map(items => items.map(item => new Employee(item)));
  }

  update(item: Employee): Observable<Employee> {
    return Observable.fromPromise(this.sharepointContextService.getWeb().lists.getByTitle(Employee.listName).items
      .getById(item.Id)
      .update(item.toHttpRequestBody()))
      .map(resp => new Employee(resp.data));
  }
}