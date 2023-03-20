import { Component, ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent {
  onSidebarToggle: boolean = false;
  onToggle(status:boolean){
    this.onSidebarToggle = status;
  }
}
