import { InventoryCreatingComponent } from './inventory-creating/inventory-creating.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryListingComponent } from './inventory-listing/inventory-listing.component';
import { EditProductComponent } from './edit-product/edit-product.component';

const routes: Routes = [
  {
    path:'',
    component:InventoryListingComponent
  },
  {
    path:'create',
    component:InventoryCreatingComponent
  },
  {
    path:'update/:id',
    component:EditProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
