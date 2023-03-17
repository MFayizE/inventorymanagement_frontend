import { BillAddingComponent } from './bill-adding/bill-adding.component';
import { SharedModule } from './../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillsRoutingModule } from './bills-routing.module';
import { BillListingComponent } from './bill-listing/bill-listing.component';


@NgModule({
  declarations: [
    BillListingComponent,
    BillAddingComponent
  ],
  imports: [
    CommonModule,
    BillsRoutingModule,
    SharedModule
  ]
})
export class BillsModule { }
