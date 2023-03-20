import { Component,Input, HostListener, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  role: number = 0;
  screenWidth:any;
  screenHeight:any;
  @Input() toggleValue: boolean = false;
  @Output() sendToggleValue = new EventEmitter<boolean>();
  onToggle(){
    this.toggleValue = !this.toggleValue;
    this.sendToggleValue.emit(this.toggleValue);
  }
}
