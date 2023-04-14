import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { CreateAccountComponent } from './create-account/create-account.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListAccountsComponent } from './list-accounts/list-accounts.component';


@NgModule({
  declarations: [
    CreateAccountComponent,
    ListAccountsComponent
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    SharedModule,
    
  ],
  exports: [
    CreateAccountComponent
  ]
})
export class AccountsModule { }
