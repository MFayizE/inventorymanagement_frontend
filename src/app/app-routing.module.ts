import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "admin",
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/layouts/layouts.module').then(m => m.LayoutsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
