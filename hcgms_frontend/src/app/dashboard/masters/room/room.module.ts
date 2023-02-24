import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomRoutingModule } from './room-routing.module';
import { RoomComponent } from './room.component';
import { EditComponent } from './edit/edit.component';
import { CiewComponent } from './ciew/ciew.component';
import { ViewComponent } from './view/view.component';


@NgModule({
  declarations: [
    RoomComponent,
    EditComponent,
    CiewComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    RoomRoutingModule
  ]
})
export class RoomModule { }
