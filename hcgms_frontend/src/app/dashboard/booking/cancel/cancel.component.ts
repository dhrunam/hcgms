import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CancelService } from './cancel.service';
import { TimeCardService } from '../time-card/timecard-service/timecard.service';
@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CancelComponent {
  @ViewChild('close', {static: false}) close!: ElementRef;
  date: string = '';
  checkin_data: any = [];
  rooms:any = [];
  property: string = '';
  send_data: any = [];
  showCheckIn: boolean = false;
  showData: string = '';
  booking_id:string = '';
  booking: number = 0;
  constructor(private cancelService: CancelService, private timeCardService: TimeCardService){}
  getBookingDetails(r_id:number, r_booking_id:string){
    this.booking_id = r_booking_id;
    this.booking = r_id;
  }
  getBooking(){
    this.cancelService.get_checkin_reservations(this.date).subscribe({
      next: data => {
        this.showData = 'true';
        this.checkin_data = data;
      },
      error: err => {
        this.showData = 'false';
      }
    });
  }
  onCancel(){
    let fd = new FormData();
    fd.append('id', this.booking.toString());
    fd.append('operation', 'cancelled');
    this.cancelService.on_cancellation(fd).subscribe({
      next: data => {
        this.getBooking();
        this.close.nativeElement.click();
      },
    });
  }
}
