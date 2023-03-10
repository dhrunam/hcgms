import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ReportingRoutingModule } from './reporting-routing.module';
import { ReportingComponent } from './reporting.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ReportingComponent
  ],
  imports: [
    CommonModule,
    ReportingRoutingModule,
    FormsModule
  ],
  providers: [DatePipe]
})
export class ReportingModule { }
