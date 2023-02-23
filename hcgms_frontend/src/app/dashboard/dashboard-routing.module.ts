import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  //{ path: '', redirectTo: '/dashboard/users', pathMatch: 'full'},
  { path: '', component: DashboardComponent, children: [
    { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) }
  ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
