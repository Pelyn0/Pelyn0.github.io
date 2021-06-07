import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../../_services/service.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PublishTypeEnum } from '../../../_enums/publish-type';
import { ProductService } from '../../../_services/product.service';
//import { convertModelToPublish } from '../../../_helpers/concat-key-words.helper';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'volur-admin-add-edit-preview',
  templateUrl: './admin-add-edit-preview.component.html'
})

export class AdminAddEditPreviewComponent implements OnInit, OnDestroy {

  @Input() typeToPublish: PublishTypeEnum;

  destroySubject: Subject<void> = new Subject();
  baseModalService: BsModalService;
  messageModal: BsModalRef;
  isPublishClicked = false;
  modelToPublish: any = {};
  error = {
    statusText: ''
  };
  product: any = {};
  service: any = {};

  constructor(
    private router: Router,
    private serviceService: ServiceService,
    modalService: BsModalService,
    private productService: ProductService,
    private toastr: ToastrService) {
    this.baseModalService = modalService;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroySubject.next();
  }

  edit() {
    window.history.back();
  }

  publish() {
    this.isPublishClicked = true;
    switch (this.typeToPublish) {
      case PublishTypeEnum.Product: {
        this.publishProduct();
    
        setTimeout(() => {
          this.router.navigate(['/user-profile/products']);
        }
        , 1000);
        break;
      }
      case PublishTypeEnum.Service: {
        this.publishService();
    
        setTimeout(() => {
          this.router.navigate(['/user-profile/services']);
        }
        , 1000);
        break;
      }
    }
  }

  publishProduct() {
    const model = this.productService.product.getValue();
    if (model && model.id) {
      this.productService.putProduct(model).pipe(takeUntil(this.destroySubject))
        .subscribe(() => {
          this.toastr.success('Продукт оновлено', `Успішно оновлено`);
          this.productService.changeProducts(null);
        },
          () => { this.isPublishClicked = false; }
        );
    } else {
      this.productService.postProduct(model).pipe(takeUntil(this.destroySubject))
        .subscribe(() => {
          this.toastr.success('Продукт створено', `Успішно додано`);
          this.productService.changeProducts(null);
        },
          () => { this.isPublishClicked = false; }
        );
    }
  }

  publishService() {
    const model = this.serviceService.service.getValue();
    if (model && model.id) {
      this.serviceService.putService(model).pipe(takeUntil(this.destroySubject))
        .subscribe(() => {
          this.toastr.success('Послугу оновлено', `Успішно оновлено`);
          this.serviceService.changeServices(null);
        },
          () => { this.isPublishClicked = false; }
        );
    } else {
      this.serviceService.postService(model).pipe(takeUntil(this.destroySubject))
        .subscribe(() => {
          this.toastr.success('Послугу створено', `Успішно додано`);
          this.serviceService.changeServices(null);
        },
          () => { this.isPublishClicked = false; }
        );
    }
  }
}
