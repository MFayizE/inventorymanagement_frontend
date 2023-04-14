import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ListAccountsComponent } from './list-accounts/list-accounts.component';

const routes: Routes = [
  {
    path:'',
    component:ListAccountsComponent
  },
  {
    path:'add',
    component:CreateAccountComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
