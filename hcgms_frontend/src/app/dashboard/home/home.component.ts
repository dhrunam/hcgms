import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilitiesModule } from 'src/app/utilities/utilities.module';
import { HomeService } from './home.service';
import { LocalStorageService } from 'src/app/services/local-storage-service/local-storage.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, UtilitiesModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  properties: string = '';
  rooms: string = '';
  bookings: string = '';
  date: string = '';
  checkin: string = '';
  checkout: string = '';
  total: number = 0;
  username: string = '';
  role: number = 0;
  constructor(private homeService: HomeService, private localStorageService: LocalStorageService){
    this.username = this.localStorageService.getUserName();
    this.role = this.localStorageService.getRoleId();
    let date = new Date();
    this.date = `${date.getFullYear()}-${date.getMonth() < 10 ? '0' : ''}${date.getMonth()}-${date.getDate() < 10 ? '0' : ''}${date.getDate()}`;
  }

  ngOnInit(): void{
    this.homeService.getPropertiesCount().subscribe({
      next: data => this.properties = data,
    });
    this.homeService.getRoomsCount().subscribe({
      next: data => this.rooms = data,
    });
    this.homeService.getBookingsCount().subscribe({
      next: data => this.bookings = data,
    });
    this.homeService.getCheckinCount(this.date).subscribe({
      next: data => this.checkin = data,
    })
    this.homeService.getCheckoutCount(this.date).subscribe({
      next: data => this.checkout = data,
    })
    this.total = this.homeService.getTotalCheckInOutCount();
  }
}
