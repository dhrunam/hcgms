import { Component, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReservationService } from '../reservation.service';
declare var bootstrap: any;
@Component({
  selector: 'app-acknowledgment',
  templateUrl: './acknowledgment.component.html',
  styleUrls: ['./acknowledgment.component.css']
})
export class AcknowledgmentComponent {
  acknowledge: any = [];
  details = {
    booking_id: '',
    checkin_date: '',
    checkout_date: '',
    contact_no: '',
    guest_name: '',
    booking_date: '',
    address: '',
    property: '',
  }
  totalCost: number = 0;
  rooms: any = [];
  private subscription!: Subscription;
  constructor(private reservationService: ReservationService, private cdr: ChangeDetectorRef){}
  ngOnInit(): void{
    this.reservationService.acknowledgement.subscribe((d:any) => {
      this.details.booking_id = d.reservation_no;
      this.details.checkin_date = d.checkin_date;
      this.details.checkout_date = d.checkout_date;
      this.details.contact_no = d.contact_no;
      this.details.guest_name = d.guest_name;
      this.details.booking_date = d.created_at;
      this.details.address = d.address;
      this.details.property = d.property;
      this.rooms = d.reservation_room_details;
      this.totalCost = d.totalCost;
    });
  }
}
