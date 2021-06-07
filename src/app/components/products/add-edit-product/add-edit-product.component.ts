import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../_services/product.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Product } from '../../../_models/product.model';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'volur-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss']
})
export class AddEditProductComponent implements OnInit, OnDestroy {
  destroySubject: Subject<void> = new Subject();
  isPreviewSubmitted = false;
  settedProduct: Product;
  id: string;
  newProduct: FormGroup;
  baseModalService: BsModalService;
  messageModal: BsModalRef;
  error: string[] = [];
  isCreatedFormGroup = false;
  isPublishClicked = false;
  jsonText: any;
  currentDateMinutes: any;

  get invalidForm() {
    return this.newProduct.controls;
  }

  product: any = {};

  constructor(private productService: ProductService,
              private router: Router,
              modalService: BsModalService,
              private activeRoute: ActivatedRoute,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService) {
    this.baseModalService = modalService;
  }

  ngOnInit() {
    this.currentDateMinutes = new Date().getMinutes();
    this.isCreatedFormGroup = false;
    this.activeRoute.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.spinner.show();
        this.settedProduct = this.productService.product.getValue();
        this.settedProduct ? this.init(this.settedProduct) : this.getExistedModel(this.id);
        this.productService.saveLastProductId(+this.id);
      } else {
        this.settedProduct = this.productService.product.getValue();
        this.init(this.settedProduct);
      }
    });
  }
I
  createFromGroup(settedProduct: Product) {
    this.newProduct = new FormGroup({
      title: new FormControl(settedProduct ? settedProduct.title : '', [Validators.required]),
      description: new FormControl(settedProduct ? settedProduct.description : ''),
      tags: new FormControl(settedProduct ? settedProduct.tags : null, [Validators.required])
    });
    this.isCreatedFormGroup = true;
  }

  getExistedModel(id: string) {
    this.productService.getProductById(id).pipe(takeUntil(this.destroySubject)).subscribe(data => {
      if (data) {
        this.settedProduct = data;
        this.init(this.settedProduct);
        this.settedProduct.id = parseInt(id, 10);
      }
    });
  }

  init(model: Product) {
    this.createFromGroup(model);
    this.spinner.hide();
  }

  preview() {
    this.isPreviewSubmitted = true;
    if (this.newProduct.invalid) {
      return;
    }
    this.productService.changeProducts(new Product(
      this.settedProduct ? this.settedProduct.id ? this.settedProduct.id : null : null,
      this.newProduct.value.title,
      this.newProduct.value.description,
      this.newProduct.value.tags));
    this.router.navigate(['/product']);
  }

  backButton() {
    this.productService.changeProducts(null);
    this.router.navigate(['/user-profile/products']);
  }

  publish() {
    this.spinner.show();
    this.product = new Product(
      null,
      this.newProduct.value.title,
      this.newProduct.value.description,
      this.newProduct.value.tags);
    this.isPublishClicked = true;
    if (this.settedProduct && this.settedProduct.id) {
      this.product.id = this.settedProduct.id;
      this.updateProduct(this.product);
    } else {
      this.createNewProduct(this.product);
    }
    this.productService.changeProducts(null);
    
    setTimeout(() => {
      this.router.navigate(['/user-profile/products']);
    }
    , 1000);
  }

  updateProduct(modelToUpdate: Product) {
    this.productService.putProduct(modelToUpdate).pipe(takeUntil(this.destroySubject))
      .subscribe(() => {
          this.isPublishClicked = false;
          this.spinner.hide();
          this.toastr.success('Продукт оновлено', `Успішно оновлено`);
        },
        error => {
          this.isPublishClicked = false;
          this.spinner.hide();
          this.toastr.error(error.error.message, `Error ${error.status}`);
          this.setErrorMessage(error.error);
        }
      );
  }

  createNewProduct(modelToCreate: Product) {
    this.productService.postProduct(modelToCreate).pipe(takeUntil(this.destroySubject))
      .subscribe(() => {
          this.isPublishClicked = false;
          this.spinner.hide();
          this.toastr.success('Продукт створено', `Успішно створено`);
        },
        error => {
          this.isPublishClicked = false;
          this.spinner.hide();
          this.toastr.error(error.error.message, `Error ${error.status}`);
          this.setErrorMessage(error.error);
        }
      );
  }

  setErrorMessage(errors: any) {
    this.error = [];
    for (const key in errors) {
      if (Array.isArray(errors[key])) {
        errors[key].forEach(errorMes =>
          this.error.push(key + ' : ' + errorMes));
      } else {
        this.error.push(errors.message);
      }
    }
  }

  resetForm() {
    this.newProduct.get('title').reset();
    this.newProduct.get('description').reset();
    this.newProduct.get('tags').reset();
  }

  ngOnDestroy() {
    this.destroySubject.next();
  }
}
