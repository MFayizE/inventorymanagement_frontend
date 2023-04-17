import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryListingComponent } from './inventory-listing/inventory-listing.component';
import { InventoryCreatingComponent } from './inventory-creating/inventory-creating.component';
import { AddProductCategoryComponent } from './add-product-category/add-product-category.component';
import { EditProductComponent } from './edit-product/edit-product.component';


@NgModule({
  declarations: [
    InventoryListingComponent,
    InventoryCreatingComponent,
    AddProductCategoryComponent,
    EditProductComponent
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    SharedModule
  ]
})
export class InventoryModule { }
