import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Product } from '../_models/product.model';
import { ApiService } from './api.services';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()

export class ProductService {

  product: BehaviorSubject<Product> = new BehaviorSubject<Product>(null);
  lastPId: number;

  lastProductId: BehaviorSubject<number> = new BehaviorSubject<number>(null);

  constructor(private http: HttpClient, private apiService: ApiService, private router: Router) {
  }

  public getAllProducts() {
    return this.apiService.getAll<Product[]>('api/bussiness/products');
  }

  public getProductById(id: string): Observable<Product> {
    return this.apiService.getByStringId('api/bussiness/products/', id);
  }

  public postProduct(product: Product) {
    return this.apiService.post<Product>('api/bussiness/products', product);
  }

  public putProduct(product: Product) {
    return this.apiService.put<Product>('api/bussiness/products/' + product.id, product);
  }

  public deleteProduct(id: number) {
    return this.apiService.delete('api/bussiness/products/', id);
  }

  changeProducts(productsModel: Product) {
    this.product.next(productsModel);
  }
  
  saveLastProductId(id: number): void {
    this.lastProductId.next(id);
  }
}