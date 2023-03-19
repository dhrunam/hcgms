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
  @HostListener('window:resize', ['$event'])  
  onResize(event:any) {  
    this.screenWidth = window.innerWidth;  
    this.screenHeight = window.innerHeight;
    if(this.screenWidth > 1136 || this.screenWidth < 1136){
      this.toggleValue = false;
    }
    this.sendToggleValue.emit(this.toggleValue);
  }
  onToggle(){
    this.toggleValue = !this.toggleValue;
    this.sendToggleValue.emit(this.toggleValue);
  }
  onClose(){
    this.toggleValue = false;
    this.sendToggleValue.emit(this.toggleValue);
  }
}
