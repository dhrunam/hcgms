import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterModule, Routes } from "@angular/router";
import { UtilitiesModule } from "src/app/utilities/utilities.module";
const routes: Routes = [
    { path: 'masters', loadChildren: () => import('./masters/masters.module').then(m => m.MastersModule) },
    { path: 'opertations', loadChildren: () => import('./operations/operations.module').then(m => m.OperationsModule)},
]
@NgModule({
    imports: [
        UtilitiesModule,
        RouterModule.forChild(routes),
        FormsModule
    ]
})
export class InventoryModule{}