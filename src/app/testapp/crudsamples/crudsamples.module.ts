import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagInputModule } from 'ngx-chips';

import { CrudsamplesRoutingModule, routedComponents } from './crudsamples-routing.module';
import { EmployeeDataService } from './shared/employee-data.service';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { DatepickerClearButtonComponent } from 'app/testapp/shared/datepicker-clear-button/datepicker-clear-button.component';
import { MultiSelectModule, CalendarModule } from 'primeng/primeng';
import { CheckboxGroupComponent } from 'app/testapp/shared/checkbox-group/checkbox-group.component';

@NgModule({
  imports: [
    CommonModule,
    CrudsamplesRoutingModule,
    FormsModule,
    ClarityModule,
    TagInputModule,
    MultiSelectModule,
    CalendarModule
  ],
  declarations: [routedComponents, DatepickerClearButtonComponent, CheckboxGroupComponent],
  providers: [EmployeeDataService],
})
export class CrudsamplesModule { }
