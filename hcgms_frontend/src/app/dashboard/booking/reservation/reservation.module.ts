import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ReservationRoutingModule } from './reservation-routing.module';
import { ReservationComponent } from './reservation.component';
import { SearchComponent } from './search/search.component';
import { DetailsComponent } from './details/details.component';
import { FormsModule } from '@angular/forms';
import { HousesComponent } from './houses/houses.component';
import { AcknowledgmentComponent } from './acknowledgment/acknowledgment.component';
import { UtilitiesModule } from 'src/app/utilities/utilities.module';


@NgModule({
  declarations: [
    ReservationComponent,
    SearchComponent,
    DetailsComponent,
    HousesComponent,
    AcknowledgmentComponent,
  ],
  imports: [
    CommonModule,
    ReservationRoutingModule,
    FormsModule,
    UtilitiesModule
  ],
  providers: [DatePipe]
})
export class ReservationModule { }
