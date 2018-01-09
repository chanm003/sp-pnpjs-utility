import { Observable } from 'rxjs/Observable';
import { SPModel } from './sp-model';
import { SPDataServiceParams } from './sp-data-service-params';

export interface SPDataServiceContract {
    getItems(params?: SPDataServiceParams): Observable<SPModel[]>;
    getById(id: Number): Observable<SPModel>;
    create(item: SPModel): Observable<SPModel>;
    update(item: SPModel): Observable<SPModel>;
    delete(item: SPModel): Observable<void>;
}
