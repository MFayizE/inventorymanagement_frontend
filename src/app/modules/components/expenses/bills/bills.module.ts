import { BillAddingComponent } from './bill-adding/bill-adding.component';
import { SharedModule } from './../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillsRoutingModule } from './bills-routing.module';
import { BillListingComponent } from './bill-listing/bill-listing.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BillViewComponent } from './bill-view/bill-view.component';

@NgModule({
  declarations: [
    BillListingComponent,
    BillAddingComponent,
    BillViewComponent
  ],
  imports: [
    CommonModule,
    BillsRoutingModule,
    SharedModule,

  ]
})
export class BillsModule { }
