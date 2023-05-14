import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddCustomerComponent } from './add-customer/add-customer.component';


@NgModule({
  declarations: [
    AddCustomerComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    SharedModule
  ],
  exports : [
    AddCustomerComponent
  ]
})
export class CustomersModule { }
