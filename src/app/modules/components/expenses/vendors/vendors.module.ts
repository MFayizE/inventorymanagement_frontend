import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorsRoutingModule } from './vendors-routing.module';
import { AddVendorComponent } from './add-vendor/add-vendor.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AddVendorComponent
  ],
  imports: [
    CommonModule,
    VendorsRoutingModule,
    SharedModule
  ],
  exports: [
    AddVendorComponent
  ]
})
export class VendorsModule { }
