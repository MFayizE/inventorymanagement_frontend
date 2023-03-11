import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryListingComponent } from './inventory-listing/inventory-listing.component';

const routes: Routes = [
  {
    path:'',
    component:InventoryListingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
