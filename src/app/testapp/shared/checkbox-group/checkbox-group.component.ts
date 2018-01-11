import { Component, OnInit, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-checkbox-group',
  template: `
    <clr-checkbox *ngFor="let option of selectable" (change)="onChange($event)" [clrChecked]="isChecked(option)" [name]="option">
        {{option}}
    </clr-checkbox>
  `,
  styles: [],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: CheckboxGroupComponent, multi: true }
  ]
})
export class CheckboxGroupComponent implements ControlValueAccessor {
  @Input()
  selectable: string[];
  selected: string[];

  constructor() { }

  private propagateChange = (_: any) => { };
  
  public writeValue(obj: any) {
    if (obj) {
      this.selected = obj;
    }
  }

  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }
  
  registerOnTouched() { }
  
  onChange(event) {
    if (event.target.checked) {
      if (!_.isArray(this.selected)) {
        this.selected = [];
      } 

      this.selected.push(event.target.name);
    } else {
      this.selected = _.remove(this.selected, (item) => item !== event.target.name);
    }
    this.propagateChange(this.selected);
  }

  isChecked(item: string) {
    return _.includes(this.selected, item);
  }
}