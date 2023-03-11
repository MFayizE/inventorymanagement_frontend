import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutsRoutingModule } from './layouts-routing.module';
import { LayoutsComponent } from './layouts.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    LayoutsComponent,
    SidebarComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    LayoutsRoutingModule
  ]
})
export class LayoutsModule { }
