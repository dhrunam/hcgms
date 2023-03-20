import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertyRoutingModule } from './property-routing.module';
import { PropertyComponent } from './property.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { FormsModule } from '@angular/forms';
import { UtilitiesModule } from 'src/app/utilities/utilities.module';


@NgModule({
  declarations: [
    PropertyComponent,
    ViewComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    PropertyRoutingModule,
    FormsModule,
    UtilitiesModule
  ]
})
export class PropertyModule { }
