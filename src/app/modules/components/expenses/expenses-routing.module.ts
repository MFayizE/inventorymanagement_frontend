import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "bills",
    loadChildren: () => import('./bills/bills.module').then(m => m.BillsModule)
  },
  {
    path: "vendors",
    loadChildren: () => import('./vendors/vendors.module').then(m => m.VendorsModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpensesRoutingModule { }
