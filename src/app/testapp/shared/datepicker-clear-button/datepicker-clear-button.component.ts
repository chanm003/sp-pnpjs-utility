import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-datepicker-clear-button',
  template: `
    <a *ngIf="showClearButton" (click)="onClearButtonClicked()" class="absolute-right"
        style="right:0px;position:absolute; top: 0px; text-decoration:underline; cursor:pointer; z-index:10000;">clear</a>`,
  styles: [
      `
      .absolute-right {
        -moz-transform: translateX(-100%);
        -ms-transform: translateX(-100%);
        -webkit-transform: translateX(-100%);
        -o-transform: translateX(-100%);
        transform: translateX(-100%);
      }
      `
  ]
})
export class DatepickerClearButtonComponent implements OnInit {
  @Input()
  showClearButton: boolean;

  @Output()
  clearDate: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClearButtonClicked() {
    this.clearDate.emit(null);
  }
}
