import { LayoutsComponent } from './layouts.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "dash",
  },
  {
    path:'',
    component:LayoutsComponent,
    children: [
      {
        path: "dash",
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: "inventory",
        loadChildren: () => import('../components/inventory/inventory.module').then(m => m.InventoryModule)
      },
      {
        path: "income",
        loadChildren: () => import('../components/income/income.module').then(m => m.IncomeModule)
      },
      {
        path: "expenses",
        loadChildren: () => import('../components/expenses/expenses.module').then(m => m.ExpensesModule)
      },
      {
        path: "banking",
        loadChildren: () => import('../components//banking/banking.module').then(m => m.BankingModule)
      },
      {
        path: "reports",
        loadChildren: () => import('../components/reports/reports.module').then(m => m.ReportsModule)
      },
      {
        path: "settings",
        loadChildren: () => import('../components/settings/settings.module').then(m => m.SettingsModule)
      },
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutsRoutingModule { }
