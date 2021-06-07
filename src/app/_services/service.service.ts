import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Service } from '../_models/service.model';
import { ApiService } from './api.services';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()

export class ServiceService {

  service: BehaviorSubject<Service> = new BehaviorSubject<Service>(null);
  lastSId: number;

  lastServiceId: BehaviorSubject<number> = new BehaviorSubject<number>(null);

  constructor(private http: HttpClient, private apiService: ApiService, private router: Router) {
  }

  public getAllServices() {
    return this.apiService.getAll<Service[]>('api/bussiness/services');
  }

  public getServiceById(id: string): Observable<Service> {
    return this.apiService.getByStringId('api/bussiness/services/', id);
  }

  public postService(service: Service) {
    return this.apiService.post<Service>('api/bussiness/services', service);
  }

  public putService(service: Service) {
    return this.apiService.put<Service>('api/bussiness/Services/' + service.id, service);
  }

  public deleteService(id: number) {
    return this.apiService.delete('api/bussiness/services/', id);
  }

  changeServices(serviceModel: Service) {
    this.service.next(serviceModel);
  }
  
  saveLastServiceId(id: number): void {
    this.lastServiceId.next(id);
  }
}