import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutsRoutingModule } from './layouts-routing.module';
import { LayoutsComponent } from './layouts.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    LayoutsComponent,
    SidebarComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    LayoutsRoutingModule,
    SharedModule

  ]
})
export class LayoutsModule { }
