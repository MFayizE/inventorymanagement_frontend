import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule
  ],
  exports: [
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule

  ]
})
export class SharedModule { }
