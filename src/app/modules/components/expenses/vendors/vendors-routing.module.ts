import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddVendorComponent } from './add-vendor/add-vendor.component';

const routes: Routes = [
  {
    path: 'add',
    component:AddVendorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorsRoutingModule { }
