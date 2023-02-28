import { Component } from '@angular/core';
import { ReservationService } from '../reservation.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  roomDetails: any = [];
  acknowledgement: boolean = false;
  constructor(private reservationService: ReservationService){}
  ngOnInit(): void {
    this.reservationService.room_details().then((d:any) => {
      this.roomDetails = d;
    })
  }
  onConfirmReservation(data: any){
    let fd = new FormData();
    fd.append('property',this.roomDetails.property);
    fd.append('lead_guest_name', data.value.guest_name);
    fd.append('reservation_for', data.value.resv_for);
    fd.append('reservation_from', data.value.resv_from);
    fd.append('address', data.value.address);
    fd.append('contact_no', data.value.contact);
    fd.append('remarks', data.value.remarks);
    fd.append('checkin_date', this.roomDetails.checkin_date);
    fd.append('checkout_date', this.roomDetails.checkout_date);
    fd.append('rooms', JSON.stringify(this.roomDetails.rooms));
    this.reservationService.confirm_reservation(fd);
  }
  onToggle(){
    this.acknowledgement = !this.acknowledgement;
  }
}
