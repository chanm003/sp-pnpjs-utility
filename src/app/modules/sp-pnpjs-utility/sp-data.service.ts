import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import { SharepointContextService } from './sharepointcontext.service';

import { SPDataServiceContract } from './sp-data-service-contract';
import { SPModel } from './sp-model';
import { SPDataServiceParams } from './sp-data-service-params';

@Injectable()
export class SPDataService implements SPDataServiceContract {
    modelClass: typeof SPModel;
    sharepointContextService: SharepointContextService;

    constructor(
        modelClass: typeof SPModel, // Signature of the model class for this list
        contextService: SharepointContextService
    ) {
        this.modelClass = modelClass;
        this.sharepointContextService = contextService;
    }

    // Fetches an array of records from the context list, restricted to the specified parameters
    getItems(params: SPDataServiceParams = new SPDataServiceParams()): Observable<SPModel[]> {
        const query = this.sharepointContextService
            .getWeb().lists
            .getByTitle(this.modelClass.listName).items
            .select(this.modelClass.fieldsForSelect)
            .expand(this.modelClass.fieldsForExpand)
            .top(params.top)
            .orderBy(params.orderBy);

        if (params.expand.length) {
            query.expand(params.expand);
        }

        if (params.filter.length) {
            query.filter(params.filter);
        }

        return Observable
            .fromPromise(query.get())
            .map(items => items.map(item => this.getModelInstance(item)));
    }

    // Fetches the record from the context list that matches the given id
    getById(id): Observable<SPModel> {
        return Observable.fromPromise(
            this.sharepointContextService
                .getWeb().lists
                .getByTitle(this.modelClass.listName).items
                .getById(id)
                .select(this.modelClass.fieldsForSelect)
                .expand(this.modelClass.fieldsForExpand)
                .get())
            .map(item => this.getModelInstance(item));
    }

    // Persists the given record to the list and returns the newly created object
    create(item: SPModel): Observable<SPModel> {
        return Observable.fromPromise(
            this.sharepointContextService
                .getWeb().lists
                .getByTitle(this.modelClass.listName).items
                .add(item.toHttpRequestBody()))
            .map(resp => this.getModelInstance(resp.data));
    }

    // Updates the given record to the list and returns the updated object
    update(item: SPModel): Observable<SPModel> {
        return Observable.fromPromise(
            this.sharepointContextService
                .getWeb().lists
                .getByTitle(this.modelClass.listName).items
                .getById(item.Id)
                .update(item.toHttpRequestBody()))
            .map(resp => this.getModelInstance(resp.data));
    }

    // Deletes the given record from the list
    delete(item: SPModel): Observable<void> {
        return Observable.fromPromise(
            this.sharepointContextService
                .getWeb().lists
                .getByTitle(this.modelClass.listName).items
                .getById(item.Id)
            .delete());
    }

    // Returns an instance of the model given the json data
    getModelInstance(data: any = {}): SPModel {
        return new this.modelClass(data);
    }
}

@Injectable()
export class FakeSPDataService implements SPDataServiceContract {
    public static data: SPModel[] = [
        new SPModel({ Id: 1, Title: 'Test 1' }),
        new SPModel({ Id: 2, Title: 'Test 2' })
    ];

    constructor() {}

    public getItems(): Observable<SPModel[]> {
        return Observable.of(FakeSPDataService.data);
    }

    public getById(id): Observable<SPModel> {
        return Observable.of(FakeSPDataService.data[0]);
    }
    public create(item: SPModel): Observable<SPModel> {
        return Observable.of(item);
    }

    public update(tag: SPModel): Observable<SPModel> {
        return Observable.of(tag);
    }

    public delete(item: SPModel): Observable<void> {
        return Observable.of(null);
    }
}
