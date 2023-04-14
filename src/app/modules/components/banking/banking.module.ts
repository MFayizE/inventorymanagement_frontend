import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankingRoutingModule } from './banking-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    BankingRoutingModule,
    SharedModule
  ]
})
export class BankingModule { }
