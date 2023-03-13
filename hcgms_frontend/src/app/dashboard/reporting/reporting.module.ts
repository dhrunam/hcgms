import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ReportingRoutingModule } from './reporting-routing.module';
import { ReportingComponent } from './reporting.component';
import { FormsModule } from '@angular/forms';
import { UtilitiesModule } from 'src/app/utilities/utilities.module';


@NgModule({
  declarations: [
    ReportingComponent
  ],
  imports: [
    CommonModule,
    ReportingRoutingModule,
    FormsModule,
    UtilitiesModule
  ],
  providers: [DatePipe]
})
export class ReportingModule { }
