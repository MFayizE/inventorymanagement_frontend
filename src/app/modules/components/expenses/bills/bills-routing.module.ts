import { BillViewComponent } from './bill-view/bill-view.component';
import { BillAddingComponent } from './bill-adding/bill-adding.component';
import { BillListingComponent } from './bill-listing/bill-listing.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    component:BillListingComponent
  },
  {
    path:'add',
    component:BillAddingComponent
  },
  {
    path:'view/:id',
    component:BillViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillsRoutingModule { }
