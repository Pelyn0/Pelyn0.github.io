import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../../../_services/product.service';
//import { UpdateProperty } from '../../../_models/update-property.model';
import { Product } from '../../../_models/product.model';
import { AuthenticationService } from '../../../_services/authentication.service';
import { Router } from '@angular/router';
//import { MessageModalErrorComponent } from '../../../components/modal-windows/message-modal-error/message-modal-error.component';

@Component({
  selector: 'volur-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  isAuthenticated: boolean;
  @Input() product: Product;
  @Output() deletedProduct = new EventEmitter<Product>();

  constructor(
    private productService: ProductService,
    private authenticationService: AuthenticationService,
    public router: Router) {
    this.isAuthenticated = this.authenticationService.isAuthenticated();
  }

  deleteProduct(event: any) {
    event.stopPropagation();
    this.deletedProduct.emit(this.product);
  }
  
  stopPropagation(event: MouseEvent): void {
    event.stopPropagation();
  }
}