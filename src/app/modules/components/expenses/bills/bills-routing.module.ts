import { BillViewComponent } from './bill-view/bill-view.component';
import { BillAddingComponent } from './bill-adding/bill-adding.component';
import { BillListingComponent } from './bill-listing/bill-listing.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillEditingComponent } from './bill-editing/bill-editing.component';

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
  },
  {
    path:'edit/:id',
    component:BillEditingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillsRoutingModule { }
