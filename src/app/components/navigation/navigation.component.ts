import { Component, OnInit } from '@angular/core';
import { Service } from 'app/_models/service.model';
import { ServiceService } from 'app/_services/service.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { ToastrService } from 'ngx-toastr';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
    destroySubject: Subject<void> = new Subject();
    services: Service[];
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
        private serviceService: ServiceService,
        private toastr: ToastrService
    ) { }

    ngOnInit() {
        this.subscription = this.serviceService.getAllServices().pipe(takeUntil(this.destroySubject))
            .subscribe(
                services => {
                this.services = services;
                this.config.loopedSlides = services.length;
                }, error => {
                    if(error.status == "404"){
                        this.toastr.error("Помилка при загрузці послуг", `Error ${error.status}`);
                }
        }
      );
    }
}
