import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from 'src/app/services/local-storage-service/local-storage.service';
import { TimeCardService } from 'src/app/services/timecard-service/timecard.service';

@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent {
  todayDate: string = '';
  bookingId:string = '';
  resv_id: string = '';
  date = new Date();
  checkin_data: any = [];
  rooms:any = [];
  property: string = ''
  constructor(private localStorageService: LocalStorageService, private timeCardService: TimeCardService){
    this.property = localStorageService.getPropertyId();
  }
  ngOnInit():void{
    this.todayDate = `${this.date.getFullYear()}-${this.date.getMonth()< 10 ? '0':''}${this.date.getMonth()+1}-${this.date.getDate()< 10 ? '0':''}${this.date.getDate()}`;
    this.timeCardService.get_checkin_reservations(this.todayDate).then((d:any) => {
      this.checkin_data = d;
    });
  }
  onGetRooms(r_id:string,booking_id:string, data: any){
    this.resv_id = r_id;
    this.bookingId = booking_id;
    this.rooms = data;
  }
  onCheckin(room_id: number){
    let fd = new FormData();
    fd.append('reservation', this.resv_id);
    fd.append('property', this.property);
    fd.append('room', room_id.toString());
    fd.append('checkin_date', this.todayDate);
    this.timeCardService.on_checkin(fd);
  }
}
