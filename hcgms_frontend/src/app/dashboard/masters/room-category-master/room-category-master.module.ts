import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomCategoryMasterRoutingModule } from './room-category-master-routing.module';
import { RoomCategoryMasterComponent } from './room-category-master.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { FormsModule } from '@angular/forms';
import { UtilitiesModule } from 'src/app/utilities/utilities.module';


@NgModule({
  declarations: [
    RoomCategoryMasterComponent,
    ViewComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    RoomCategoryMasterRoutingModule,
    FormsModule,
    UtilitiesModule
  ]
})
export class RoomCategoryMasterModule { }
