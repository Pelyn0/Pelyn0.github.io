import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
import { ProfileComponent } from './examples/profile/profile.component';
import { LoginComponent } from './examples/login/login.component';
import { LandingComponent } from './examples/landing/landing.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { AuthGuard } from './_guards/auth.guard';
import { AddEditProductComponent } from './components/products/add-edit-product/add-edit-product.component';
import { AddEditServiceComponent } from './components/services/add-edit-service/add-edit-service.component';
import { ProductPageComponent } from './components/products/product-page/product-page.component';
import { AdminAddEditPreviewComponent } from './components/admin/admin-add-edit-preview/admin-add-edit-preview.component';
import { ServicePageComponent } from './components/services/service-page/service-page.component';
import { InvoiceGeneratorComponent } from './components/invoice-generator/invoice-generator.component';

const routes: Routes =[
    { path: '', component: ComponentsComponent },
    { 
      path: 'user-profile',
      canActivate: [AuthGuard],
      loadChildren: () => import('./_lazy-loading/management.module').then(m => m.ManagementModule),
    },
    { path: 'add-product',          component: AddEditProductComponent },
    { path: 'edit-product/:id',          component: AddEditProductComponent },
    { path: 'service',          component: AdminAddEditPreviewComponent },
    { path: 'add-service',          component: AddEditServiceComponent },
    { path: 'edit-service/:id',          component: AddEditServiceComponent },
    { path: 'product/:id',          component: ProductPageComponent },
    { path: 'product',          component: ProductPageComponent },
    { path: 'service',          component: ServicePageComponent },
    { path: 'service/:id',          component: ServicePageComponent },
    { path: 'landing',          component: LandingComponent },
    { path: 'nucleoicons',      component: NucleoiconsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'invoice-generator', component: InvoiceGeneratorComponent },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {anchorScrolling: 'enabled', onSameUrlNavigation: 'reload'})
  ],
  exports: [
  ],
})
export class AppRoutingModule { }