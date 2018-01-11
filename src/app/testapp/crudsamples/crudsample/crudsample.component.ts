import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../shared/employee';
import { EmployeeDataService } from '../shared/employee-data.service';
import * as _ from 'lodash';
import { UserDataService } from '../../shared/user-data.service';
import { CountriesKeywordSearchService } from '../../shared/countries-keyword-search.service';

@Component({
  selector: 'app-crudsample',
  templateUrl: './crudsample.component.html',
  styles: [``]
})
export class CrudsampleComponent implements OnInit {
  itemBeingEdited: Employee;
  sideDishChoices = ['Rice', 'Beans', 'Fries'];
  getMatchingPeople = this.userDataService.search;
  getMatchingCountries = this.countriesKeywordSearchService.search;
  constructor(private route: ActivatedRoute, private router: Router, private employeeDataService: EmployeeDataService,
    private userDataService: UserDataService, private countriesKeywordSearchService: CountriesKeywordSearchService) { }

  ngOnInit() {
    this.subscribeToRouteDataResolution();
  }

  delete() {
    this.employeeDataService.delete(this.itemBeingEdited)
      .subscribe(resp => this.router.navigate(['/crudsample']));
  }

  isNewForm() {
    return this.itemBeingEdited && isNaN(this.itemBeingEdited.Id);
  }

  save() {
    const itemToSave = this.modifyBeforeInvokingDataService(this.itemBeingEdited);
    if (this.isNewForm()) {
      this.employeeDataService.create(itemToSave)
        .subscribe(resp => this.router.navigate(['/crudsample']));
    } else {
      this.employeeDataService.update(itemToSave)
        .subscribe(
          resp => this.router.navigate(['/crudsample']
        ));
    }
  }

  private accommodateNgxTagInput(obj, lookupColumnName) {
    if (_.isArray(obj[lookupColumnName])) {
      obj[lookupColumnName] = obj[lookupColumnName].length ? obj[lookupColumnName][0] : null;
    } else if (_.isObject(obj[lookupColumnName])) {
      obj[lookupColumnName] = [obj[lookupColumnName]];
    }
  }

  createRandomCar() {
    this.itemBeingEdited.Cars.push({
      type: ['Ford', 'BMW', 'Audi'][Math.floor(Math.random() * 3)],
      model: ['800', '350', '228'][Math.floor(Math.random() * 3)],
      color: ['black', 'red', 'white', 'gray'][Math.floor(Math.random() * 4)],
    });
  }

  deleteCar(index) {
    this.itemBeingEdited.Cars.splice(index, 1);
  }

  private modifyBeforeBindingToViewTemplate(employee: Employee) {
    /*
    *  <tag-input [(ngModel)]> expects an array of strings or array of objects, see: https://github.com/Gbuomprisco/ngx-chips
    *   - but 'PrimaryResidenceCountry' is a Country not an Array<Country>
    *   - but 'Supervisor' is a User not an Array<User>
    */
    this.accommodateNgxTagInput(employee, 'PrimaryResidenceCountry');
    this.accommodateNgxTagInput(employee, 'Supervisor');
    return employee;
  }

  private modifyBeforeInvokingDataService(employee: Employee) {
    /* <tag-input [(ngModel)]>  required an array of strings or array of objects, see: https://github.com/Gbuomprisco/ngx-chips
    *   - make clone because property is currently bound to <tag-input>, otherwise <tag-input> will throw error as
    *     soon as we convert to non-array
    */
    const itemToSave = _.cloneDeep(employee);
    this.accommodateNgxTagInput(itemToSave, 'PrimaryResidenceCountry');
    this.accommodateNgxTagInput(itemToSave, 'Supervisor');
    return itemToSave;
  }

  subscribeToRouteDataResolution() {
    this.route.data.subscribe((resolved: { data: any }) => {
      this.itemBeingEdited = this.modifyBeforeBindingToViewTemplate(resolved.data.employee);
    });
  }

}
