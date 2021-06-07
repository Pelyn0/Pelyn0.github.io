import { Component, OnInit, OnDestroy, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { debounceTime, take, takeUntil } from 'rxjs/operators';
import * as _ from 'lodash';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AuthenticationService } from '../../../_services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'app/_models/product.model';
import { ProductService } from 'app/_services/product.service'
import { Subscription } from 'rxjs';
import { ConfirmModalComponent } from 'app/components/confirm-modal/confirm-modal.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'volur-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  destroySubject: Subject<void> = new Subject();
  private messageModal: BsModalRef;

  products: Product[] = [];
  keyWords: string = null;
  userFilter = [];
  inputModelChanged: Subject<string> = new Subject<string>();
  subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private baseModalService: BsModalService,
              public productService: ProductService,
              public router: Router,
              private authenticationService: AuthenticationService,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService) {
  }
  
  ngOnInit() {
    this.subscription = this.productService.getAllProducts().pipe(takeUntil(this.destroySubject))
    .subscribe(
        products => {
        this.products = products;
        }, error => {
            if(error.status == "404"){
                this.toastr.error("Помилка при загрузці продуктів", `Error ${error.status}`);
            }
        }
    );
  }

  deleteProduct(product: Product) {
      this.messageModal = this.baseModalService.show(ConfirmModalComponent,
        {class: 'h-100 d-flex align-items-center justify-content-center'});
      this.messageModal.content.message = 'товар: ' + product.title;
      (<ConfirmModalComponent>this.messageModal.content).close.pipe(takeUntil(this.destroySubject)).subscribe(result => {
        if (result) {
          this.spinner.show();
          this.productService.deleteProduct(product.id).pipe(takeUntil(this.destroySubject)).subscribe(() => {
              const index: number = this.products.indexOf(product);
              if (index !== -1) {
                this.products.splice(index, 1);
              }
            },
            error => {
              if (error.error.message) {
                this.spinner.hide();
                this.toastr.error(error.error.message, `Error ${error.status}`);
              }
            });
        }
        this.spinner.hide();
      });
  }

  ngOnDestroy() {
    this.destroySubject.next();
  }
}
