import { Component, OnInit } from '@angular/core';
import { SPDataServiceContract } from './sp-data-service-contract';
import { SPModel } from './sp-model';

@Component({
  selector: 'app-sp-pnpjs-utility-base-form',
  template: `sp-pnpjs-utility base form component`
})
export class BaseSPFormComponent implements OnInit {
  itemBeingEdited: SPModel = null;

  constructor(
    public dataService: SPDataServiceContract
  ) {}

  ngOnInit() {}

  isNewForm() {
    return this.itemBeingEdited && isNaN(this.itemBeingEdited.Id);
  }

  // Deletes the record and calls onDeleteSuccess()
  delete() {
    this.dataService
      .delete(this.itemBeingEdited)
      .subscribe(() => {
        this.onDeleteSuccess();
      });
  }

  // Persists the record
  save(item: SPModel) {
    if (this.validateForm()) {
      if (this.isNewForm()) {

        // Create the record and call onCreateSuccess()
        this.dataService
          .create(item)
          .subscribe(() => {
            this.onCreateSuccess();
          });
      } else {

        // Update the record
        this.dataService
          .update(item)
          .subscribe(() => {
            this.onUpdateSuccess();
          });
      }
    }
  }

  validateForm() {
    return true;
  }

  onCreateSuccess() {
    console.log('Create Success');
  }

  onUpdateSuccess() {
    console.log('Update Success');
  }

  onDeleteSuccess() {
    console.log('Delete Success');
  }
}
