import { Component, OnInit } from '@angular/core';

import { SPModel } from './sp-model';
import { SPDataService } from './sp-data.service';
import { SPDataServiceParams } from './sp-data-service-params';

@Component({
    selector: 'app-sp-pnpjs-utility-base-list',
    template: `sp-pnpjs-utility base list component`
})
export class BaseSPListComponent implements OnInit {
    data: SPModel[];

    constructor(
        public dataService: SPDataService, // The service that manages the data in the list
        public listParams: SPDataServiceParams = new SPDataServiceParams()
    ) {}

    ngOnInit() {
        this.listItems();
    }

    // Fetches the values in the list from the data service
    listItems(): void {
        this.dataService
            .getItems(this.listParams)
            .subscribe(data => {
                this.data = data;
            });
    }

    setItemsPerPage(val: number) {
        this.listParams.top = val;
    }

    setOrderBy(val: string) {
        this.listParams.orderBy = val;
    }

    setExpand(val: string) {
        this.listParams.expand = val;
    }

    setFilter(val: string) {
        this.listParams.filter = val;
    }
}
