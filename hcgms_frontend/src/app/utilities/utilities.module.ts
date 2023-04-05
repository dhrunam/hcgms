import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';
import { SidebarMenusComponent } from './sidebar/sidebar-menus/sidebar-menus.component';
import { UloaderComponent } from './uloader/uloader.component';

@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    LoaderComponent,
    SidebarMenusComponent,
    UloaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    SidebarComponent,
    HeaderComponent,
    LoaderComponent,
    UloaderComponent
  ]
})
export class UtilitiesModule { }
