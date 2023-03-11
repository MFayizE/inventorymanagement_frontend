import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  exports: [
    ReactiveFormsModule,
    HttpClientModule,

  ]
})
export class SharedModule { }
