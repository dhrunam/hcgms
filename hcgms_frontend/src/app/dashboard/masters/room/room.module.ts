import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomRoutingModule } from './room-routing.module';
import { RoomComponent } from './room.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import { FormsModule } from '@angular/forms';
import { UtilitiesModule } from 'src/app/utilities/utilities.module';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    RoomComponent,
    EditComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    RoomRoutingModule,
    FormsModule,
    UtilitiesModule,
    DataTablesModule
  ]
})
export class RoomModule { }
