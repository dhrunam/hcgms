import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { UtilitiesModule } from '../utilities/utilities.module';
import { ResponsiveDirective } from './responsive.directive';

@NgModule({
  declarations: [
    DashboardComponent,
    ResponsiveDirective
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    UtilitiesModule,
  ]
})
export class DashboardModule { }
