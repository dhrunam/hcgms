import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';
import { SidebarMenusComponent } from './sidebar/sidebar-menus/sidebar-menus.component';



@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    LoaderComponent,
    SidebarMenusComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SidebarComponent,
    HeaderComponent,
    LoaderComponent,
  ]
})
export class UtilitiesModule { }
