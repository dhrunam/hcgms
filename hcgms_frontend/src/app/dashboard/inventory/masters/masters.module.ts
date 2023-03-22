import { NgModule } from '@angular/core';
import { MastersComponent } from './masters.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { UtilitiesModule } from 'src/app/utilities/utilities.module';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
  { path: '', redirectTo: '/dashboard/inventory/masters/view', pathMatch: 'full'},
  { path: '', component: MastersComponent, children: [
      { path: 'add', component: EditComponent },
      { path: 'edit/:id', component: EditComponent },
      { path: 'view', component: ViewComponent },
    ]
  }
]
@NgModule({
  declarations: [
    MastersComponent,
    ViewComponent,
    EditComponent
  ],
  imports: [
    UtilitiesModule,
    RouterModule.forChild(routes),
  ]
})
export class MastersModule { }
