import { Component, OnInit } from '@angular/core';
import { EmployeeDataService } from '../shared/employee-data.service';
import { Employee } from '../shared/employee';

@Component({
  selector: 'app-crudsample-list',
  templateUrl: './crudsample-list.component.html',
  styles: [``]
})
export class CrudsampleListComponent implements OnInit {
  items: Employee[];
  constructor(private employeeDataService: EmployeeDataService) { }

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.employeeDataService.getItems()
      .subscribe(data => {
        this.items = data;
      });
  }
}
