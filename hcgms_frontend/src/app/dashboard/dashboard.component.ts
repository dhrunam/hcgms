import { Component, ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent {
  onSidebarToggle: boolean = false;
  mobileActive: boolean = false;
  backgroundActive: boolean = false;
  onToggle(status:boolean){
    this.onSidebarToggle = status;
  }
  onGetStatus(data: { mobileActive: boolean, backgroundActive: boolean}){
    this.mobileActive = data.mobileActive;
    this.backgroundActive = data.backgroundActive;
  }
}
