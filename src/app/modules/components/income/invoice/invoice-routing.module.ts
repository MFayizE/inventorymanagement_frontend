import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListInvoiceComponent } from './list-invoice/list-invoice.component';
import { AddInvoiceComponent } from './add-invoice/add-invoice.component';
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';
import { EditInvoiceComponent } from './edit-invoice/edit-invoice.component';

const routes: Routes = [
  {
    path:'',
    component:ListInvoiceComponent
  },
  {
    path:'add',
    component:AddInvoiceComponent
  },
  {
    path:'view/:id',
    component:ViewInvoiceComponent
  },
  {
    path:'edit/:id',
    component:EditInvoiceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
