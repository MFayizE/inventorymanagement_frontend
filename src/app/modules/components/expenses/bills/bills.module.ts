import { BillAddingComponent } from './bill-adding/bill-adding.component';
import { SharedModule } from './../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillsRoutingModule } from './bills-routing.module';
import { BillListingComponent } from './bill-listing/bill-listing.component';
import { MatDatepickerModule } from '@angular/material/datepicker';


@NgModule({
  declarations: [
    BillListingComponent,
    BillAddingComponent
  ],
  imports: [
    CommonModule,
    BillsRoutingModule,
    SharedModule,
    MatDatepickerModule
  ]
})
export class BillsModule { }
