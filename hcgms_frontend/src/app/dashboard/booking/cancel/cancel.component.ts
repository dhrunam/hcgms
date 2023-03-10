import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from 'src/app/services/local-storage-service/local-storage.service';
import { TimeCardService } from 'src/app/dashboard/booking/time-card/timecard-service/timecard.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CancelComponent {
  date: string = '';
  bookingId:string = '';
  resv_id: string = '';
  checkin_data: any = [];
  rooms:any = [];
  property: string = '';
  send_data: any = [];
  showCheckIn: boolean = false;
  showData: string = '';
  constructor(private localStorageService: LocalStorageService, private timeCardService: TimeCardService){
    this.property = localStorageService.getPropertyId();
  }
  ngOnInit():void{}
  onGetRooms(r_id:string,booking_id:string, data: any){
    this.resv_id = r_id;
    this.bookingId = booking_id;
    this.rooms = data;
  }
  onCheckin(){
    let fd = new FormData();
    fd.append('rooms', JSON.stringify(this.send_data));
    this.timeCardService.on_checkin(fd).then((d:any) => {
      this.getBooking();
    });
  }
  getBooking(){
    this.timeCardService.get_checkin_reservations(this.date).then((d:any) => {
      this.showData = d[0] ? 'true' : 'false';
      this.checkin_data = d;
    });
  }
}
