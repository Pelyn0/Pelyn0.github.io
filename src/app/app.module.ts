import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { ComponentsModule } from './components/components.module';
import { ServiceService } from './_services/service.service';
import { ApiService } from './_services/api.services';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ProductService } from './_services/product.service';
import { AuthenticationService } from './_services/authentication.service';
import { AuthGuard } from './_guards/auth.guard';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { SharedModule } from './_lazy-loading/shared.module';
import { LoginComponent } from './examples/login/login.component';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AddEditProductComponent } from './components/products/add-edit-product/add-edit-product.component';
import { AddEditServiceComponent } from './components/services/add-edit-service/add-edit-service.component';
import { ProductPageComponent } from './components/products/product-page/product-page.component';
import { NoSanitizePipe } from './_pipes/no-sanitize.pipe';
import { AdminAddEditPreviewComponent } from './components/admin/admin-add-edit-preview/admin-add-edit-preview.component';
import { ServicePageComponent } from './components/services/service-page/service-page.component';
import { InvoiceGeneratorComponent } from './components/invoice-generator/invoice-generator.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 3
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    AddEditProductComponent,
    ProductPageComponent,
    ServicePageComponent,
    AddEditServiceComponent,
    NoSanitizePipe
  ],
  imports: [
    BrowserModule,
    NgbModule,
    NgxPageScrollModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    ComponentsModule,
    AppRoutingModule,
    NgxSpinnerModule,
    ModalModule.forRoot(),
    HttpClientModule,
    SwiperModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true,
      positionClass: "toast-bottom-right"
    }),
    BrowserAnimationsModule
  ],
  providers: [
    ApiService,
    ServiceService,
    ProductService,
    AuthenticationService,
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    },
    AuthGuard,
    BsModalService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
