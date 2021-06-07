import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../../_services/product.service';
import { Product } from '../../../_models/product.model';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { PublishTypeEnum } from 'app/_enums/publish-type';
//import { ModalAskTheRecruiterComponent } from '../../../components/modal-windows/ask-the-recruiter/modal-ask-the-recruiter.component';
//import { ApplyNowModalComponent } from '../../../components/modal-windows/apply-now-modal/apply-now-modal.component';

@Component({
  selector: 'volur-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  public aboutProduct: string;
  public id: string;
  public description: string;
  public product: Product;
  public productPage: Product[];
  public repoUrl: string;
  public isPreview: boolean;
  public hide;
  public isAdmin;
  private bsModalRef: BsModalRef;
  currentDateMinutes: any;
  typeToPublish = PublishTypeEnum;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router,
    private modalService: BsModalService, private meta: Meta) {
    this.route.params.subscribe(params => this.id = params['id']);
    this.isPreview = !this.id;
    this.router.events.subscribe((event: NavigationStart) => {
      if (event.navigationTrigger === 'popstate' && this.bsModalRef) {
        this.bsModalRef.hide();
      }
    });
  }

  getProducts() {
    this.subscription = this.productService.getAllProducts()
      .subscribe(data => {
        this.productPage = data;
        this.product = this.productPage.find(item => item.id === parseInt(this.id, 10));
          this.productService.saveLastProductId(this.product.id);
        if (!this.product) {
          this.router.navigate(['/']);
        } else {
          this.aboutProduct = `${this.product.title} \n${this.product.tags}`;
          this.meta.addTag({ name: 'description', content: this.aboutProduct });
        }
      }
      );
  }

  showPreviewProduct() {
    this.product = this.productService.product.getValue();
  }

  ngOnInit() {
    this.currentDateMinutes = new Date().getMinutes();
    //if (localStorage.getItem('currentUser')) {
      this.isAdmin = true;
    //}
    if (this.isPreview) {
      this.hide = true;
      this.showPreviewProduct();
    } else {
      this.hide = false;
      this.getProducts();
      this.repoUrl = window.location.origin + this.router.url;
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public askRecruiterModal(): void {
    //this.bsModalRef = this.modalService.show(ModalAskTheRecruiterComponent);
    this.bsModalRef.content.messageType = 'default';
    this.bsModalRef.content.vacancyId = this.id;
  }

  public applyNowModal(): void {
    //this.bsModalRef = this.modalService.show(ApplyNowModalComponent);
    this.bsModalRef.content.vacancyId = this.id;
  }
}
