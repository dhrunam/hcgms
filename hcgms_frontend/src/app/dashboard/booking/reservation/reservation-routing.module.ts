import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { ReservationComponent } from './reservation.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard/reservation/search', pathMatch: 'full'},
    { path: '', component: ReservationComponent, children: [
        { path: 'search', component: SearchComponent},
        { path: 'details', component: DetailsComponent},
      ] 
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationRoutingModule { }
