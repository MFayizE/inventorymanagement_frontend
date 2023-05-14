import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddInvoiceComponent } from './add-invoice/add-invoice.component';
import { EditInvoiceComponent } from './edit-invoice/edit-invoice.component';
import { ListInvoiceComponent } from './list-invoice/list-invoice.component';
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';
import { CustomersModule } from '../customers/customers.module';
import { AccountsModule } from '../../banking/accounts/accounts.module';


@NgModule({
  declarations: [
    AddInvoiceComponent,
    EditInvoiceComponent,
    ListInvoiceComponent,
    ViewInvoiceComponent
  ],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    SharedModule,
    CustomersModule,
    AccountsModule
  ]
})
export class InvoiceModule { }
