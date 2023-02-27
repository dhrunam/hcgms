import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from '../reservation.service';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.css']
})
export class HousesComponent {
  test:any = [
    {
      id: 1,
      room_no: 'GH1234',
      room_type: 'VIP',
      room_rate: 2000
    }
  ]
  constructor(private router: Router, private route: ActivatedRoute, private reservationService: ReservationService){}
  onEnterBookingDetails(){
    this.reservationService.selectedRooms.next(this.test);
    this.router.navigate(['../details'], { relativeTo: this.route } );
  }
}
