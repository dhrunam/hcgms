import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomRateRoutingModule } from './room-rate-routing.module';
import { RoomRateComponent } from './room-rate.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import { FormsModule } from '@angular/forms';
import { UtilitiesModule } from 'src/app/utilities/utilities.module';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    RoomRateComponent,
    EditComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    RoomRateRoutingModule,
    FormsModule,
    UtilitiesModule,
    DataTablesModule
  ]
})
export class RoomRateModule { }
