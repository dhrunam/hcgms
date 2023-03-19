import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service/auth-service';
import { LocalStorageService } from 'src/app/services/local-storage-service/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  username:string = '';
  localStorage: any;
  screenWidth:any;
  screenHeight:any;
  @Output() onToggle = new EventEmitter<boolean>();
  @Input() toggleValue: boolean = false;
  constructor(private authService: AuthService, private localStorageService: LocalStorageService){
    this.username = this.localStorageService.getUserName();
  }
  @HostListener('window:resize', ['$event'])
  onResize(event:any) {  
    this.screenWidth = window.innerWidth;  
    this.screenHeight = window.innerHeight;
    if(this.screenWidth > 1136 || this.screenWidth < 1136){
      this.toggleValue = false;
    }
    this.onToggle.emit(this.toggleValue);
  }
  onInitToggle(){
    this.toggleValue = !this.toggleValue;
    this.onToggle.emit(this.toggleValue);
  }
  onLogout(){
    this.authService.logout().subscribe({
      next: () => window.location.href = '/',
    });
  }
}
