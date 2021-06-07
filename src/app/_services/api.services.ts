import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
//import { UpdateProperty } from '../_models/update-property.model';

@Injectable()
export class ApiService {

  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseApi;
  }

  public getAll<T>(actionURL: string): Observable<T> {
    return this.http.get<T>(this.baseUrl + actionURL);
  }

  public getWithParam<T>(actionURL: string, params: HttpParams): Observable<T> {
    return this.http.get<T>(this.baseUrl + actionURL, {params: params});
  }

  public get<T>(actionURL: string, id: number): Observable<T> {
    return this.http.get<T>(this.baseUrl + actionURL + id);
  }

  public getByStringId<T>(actionUrl: string, id: string): Observable<T> {
    return this.http.get<T>(this.baseUrl + actionUrl + id);
  }

  public getById<T>(actionUrl: string, id: number): Observable<T> {
    return this.http.get<T>(this.baseUrl + actionUrl + id);
  }

  public post<T>(actionUrl: string, model: T): Observable<T> {
    return this.http.post<T>(this.baseUrl + actionUrl, model);
  }

  public put<T>(actionUrl: string, itemToUpdate: any): Observable<T> {
    return this.http.put<T>(this.baseUrl + actionUrl, itemToUpdate);
  }

  public delete<T>(actionUrl: string, id: number): Observable<T> {
    return this.http.delete<T>(this.baseUrl + actionUrl + id);
  }

  public deleteByGuid<T>(actionUrl: string, id: string): Observable<T> {
    return this.http.delete<T>(this.baseUrl + actionUrl + id);
  }

  public getPage<T>(actionURL: string, page: number = 0, count?: number): Observable<T> {
    let params = new HttpParams();
    params = params.append('count', `${count}`);
    params = params.append('page', `${page}`);
    return this.http.get<T>(this.baseUrl + actionURL, {params: params});
  }
  /*public getVacancyPage<T>(actionURL: string, page: number = 0, count?: number, isForTrainingCenter?: boolean): Observable<T> {
    let params = new HttpParams();
    params = params.append('count', `${count}`);
    params = params.append('page', `${page}`);
    params = params.append('isForTrainingCenter', `${isForTrainingCenter}`);
    return this.http.get<T>(this.baseUrl + actionURL, {params: params});
  }

  public updateProperty<T>(actionUrl: string, updateProperty: UpdateProperty): Observable<T> {
    return this.http.patch<T>(this.baseUrl + actionUrl, [updateProperty]);
  }*/

  public updateModel<T>(actionUrl: string, model: any): Observable<T> {
    return this.http.put<T>(this.baseUrl + actionUrl, model);
  }

  public updateIsShownProperty<T>(actionUrl: string, isShownValue: boolean): Observable<T> {
    return this.http.put<T>(this.baseUrl + actionUrl, {isShown: isShownValue});
  }

  /*public updatePartnerOrderProperty<T>(actionUrl: string, model: { previousItemId: number, nextItemId }) {
    return this.http.put<T>(this.baseUrl + actionUrl, model);
  }

  public updateRewardOrderProperty<T>(actionUrl: string, model: { previousItemId: number, nextItemId }) {
    return this.http.put<T>(this.baseUrl + actionUrl, model);
  }*/

}
