import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slider } from '../utilities/router-animation/router-animation';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    slider,
  ]
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
  prepareOutlet(outlet: RouterOutlet){
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
