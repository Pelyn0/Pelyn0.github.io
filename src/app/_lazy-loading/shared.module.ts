import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AdminAddEditPreviewComponent } from "app/components/admin/admin-add-edit-preview/admin-add-edit-preview.component";
import { ConfirmModalComponent } from "app/components/confirm-modal/confirm-modal.component";
import { InvoiceGeneratorComponent } from "app/components/invoice-generator/invoice-generator.component";
import { ProductItemComponent } from "app/components/products/product-item/product-item.component";
import { ProductListComponent } from "app/components/products/product-list/product-list.component";
import { ServiceItemComponent } from "app/components/services/service-item/service-item.component";
import { ServiceListComponent } from "app/components/services/service-list/service-list.component";
import { BsModalRef, ModalModule } from "ngx-bootstrap/modal";

const declarationsAndExports = [
    ProductListComponent,
    ProductItemComponent,
    ConfirmModalComponent,
    AdminAddEditPreviewComponent,
    ServiceListComponent,
    ServiceItemComponent,
    InvoiceGeneratorComponent
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ModalModule.forRoot(),
    ],
      declarations: [
          declarationsAndExports
      ],
      providers:[
        BsModalRef
      ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
    exports: declarationsAndExports
  })
  export class SharedModule { }