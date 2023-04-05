import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from 'src/app/services/local-storage-service/local-storage.service';
import { TimeCardService } from 'src/app/dashboard/booking/time-card/timecard-service/timecard.service';

@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent {
  @ViewChild('close', { static: true } ) close!:ElementRef; 
  todayDate: string = '';
  bookingId:string = '';
  resv_id: string = '';
  date = new Date();
  checkout_data: any = [];
  rooms:any = [];
  property: string = '';
  showResv: boolean = false;
  constructor(private localStorageService: LocalStorageService, private timeCardService: TimeCardService){
    this.property = localStorageService.getPropertyId();
  }
  ngOnInit():void{
    this.todayDate = `${this.date.getFullYear()}-${this.date.getMonth()< 10 ? '0':''}${this.date.getMonth()+1}-${this.date.getDate()< 10 ? '0':''}${this.date.getDate()}`;
    //this.todayDate = `${this.date.getFullYear()}-${this.date.getMonth()< 10 ? '0':''}${this.date.getMonth()+1}-14`;
    this.getBooking();
  }
  onGetRooms(r_id:string,booking_id:string, data: any){
    this.resv_id = r_id;
    this.bookingId = booking_id;
    data.forEach((d:any) => {
      if(d.status === 'checkin'){
        this.rooms.push(d);
      }
    })
  }
  onCheckout(){
    let fd = new FormData();
    fd.append('rooms', JSON.stringify(this.rooms));
    fd.append('reservation', this.rooms[0]['reservation']);
    fd.append('property', this.property);
    this.timeCardService.on_checkout(fd).subscribe({
      next: () => {
        this.getBooking();
        this.close.nativeElement.click();
      }
    });;
  }
  getBooking(){
    this.timeCardService.get_checkout_reservations(this.todayDate).subscribe({
      next: data => {
        this.showResv =data[0] ? true : false;
        this.checkout_data = data;
      }
    });
  }
}
