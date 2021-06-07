import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Subject } from 'rxjs';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { takeUntil } from 'rxjs/operators';
import { Product } from 'app/_models/product.model';
import { ProductService } from 'app/_services/product.service';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})

export class NotificationComponent {
    destroySubject: Subject<void> = new Subject();
    products: Product[];
    subscription: Subscription;

    public config: SwiperConfigInterface = {
        cssMode: false,
        direction: 'horizontal',
        slidesPerView: 3,
        spaceBetween: 60,
        speed: 1000,
        pagination: false,
        centeredSlides: false,
        navigation: false,
        loop: true,
        observer: true,
        keyboard: false,
        mousewheel: false,
        scrollbar: false,
        grabCursor: false,
        breakpoints: {
          1200: {
            slidesPerView: 3,
            spaceBetween: 60,
            centeredSlides: false,
          },
          770: {
            slidesPerView: 2,
            spaceBetween: 45,
            centeredSlides: false,
          },
          // when screen >= 320px
          320: {
            slidesPerView: 1,
            spaceBetween: 30,
            centeredSlides: true,
          }
        },
        autoplay: {
          delay: 2000,
        }
    }
    
    constructor(
        private productService: ProductService,
        private toastr: ToastrService
    ) { }

    ngOnInit() {
        this.subscription = this.productService.getAllProducts().pipe(takeUntil(this.destroySubject))
            .subscribe(
                products => {
                this.products = products;
                this.config.loopedSlides = products.length;
                }, error => {
                    if(error.status == "404"){
                        this.toastr.error("Помилка при загрузці продуктів", `Error ${error.status}`);
                    }
        }
      );
    }
}