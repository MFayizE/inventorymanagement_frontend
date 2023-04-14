import { AssignGuard } from './core/auth/assign.guard';
import { AuthGuard } from './core/auth/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "auth",
  },
  {
    path: "auth",
    loadChildren: () => import("./core/admin/admin.module").then((m) => m.AdminModule),
    canActivate:[AssignGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/layouts/layouts.module').then(m => m.LayoutsModule),
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
