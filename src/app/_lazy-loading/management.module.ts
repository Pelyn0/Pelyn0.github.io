import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LandingComponent } from '../examples/landing/landing.component';
import { ProfileComponent } from '../examples/profile/profile.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/_guards/auth.guard';
import { ProductListComponent } from 'app/components/products/product-list/product-list.component';
import { SharedModule } from './shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ServiceListComponent } from 'app/components/services/service-list/service-list.component';

const profileRoutes: Routes = [
    { 
        path: '',
        component: ProfileComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'products', component: ProductListComponent
            },
            {
                path: 'services', component: ServiceListComponent
            }
        ]     
            
    }
  ];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        SharedModule,
        NgxSpinnerModule,
        RouterModule.forChild(profileRoutes),
    ],
    declarations: [
        LandingComponent,
        ProfileComponent
    ],
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA
    ],
})
export class ManagementModule { }
