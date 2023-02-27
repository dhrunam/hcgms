import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard/home', pathMatch: 'full'},
  { path: '', component: DashboardComponent, children: [
      { path: 'home', loadComponent: () => import('./home/home.component').then(c => c.HomeComponent)},
      { path: 'users', loadChildren: () => import('./masters/users/users.module').then(m => m.UsersModule) },
      { path: 'property', loadChildren: () => import('./masters/property/property.module').then(m => m.PropertyModule) },
      { path: 'room-category', loadChildren: () => import('./masters/room-category-master/room-category-master.module').then(m => m.RoomCategoryMasterModule) },
      { path: 'room', loadChildren: () => import('./masters/room/room.module').then(m => m.RoomModule)},
      { path: 'room-rate', loadChildren: () => import('./masters/room-rate/room-rate.module').then(m => m.RoomRateModule) },
      { path: 'reservation', loadChildren: () => import('./booking/reservation/reservation.module').then(m => m.ReservationModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
