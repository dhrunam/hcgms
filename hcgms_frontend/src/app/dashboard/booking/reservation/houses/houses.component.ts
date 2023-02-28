import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ReservationService } from '../reservation.service';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.css']
})
export class HousesComponent {
  results: any = [];
  rooms: any = [];
  listRooms: boolean = false;
  checkin_date!: Date;
  checkout_date!: Date;
  property: number = 0;
  roomDetails !: {property: number, checkin_date: Date, checkout_date: Date, rooms: Array<any>};
  private subscription!: Subscription;
  constructor(private router: Router, private route: ActivatedRoute, private reservationService: ReservationService){}
  ngOnInit(): void{
    this.subscription = this.reservationService.results.subscribe({
      next: data => {
        this.listRooms = data.data[0] ? true : false;
        this.results = data.data;
        this.checkin_date = data.checkin_date;
        this.checkout_date = data.checkout_date;
        this.property = data.property
      },
      error: err => console.log(err), 
    })
    this.results = [];
  }
  onStatusCheck(event: any, id:number, rate: number){
    if(event.target.checked){
      const data = {
        'room': id,
        'room_rate': rate,
      }
      this.rooms.push(data);
    }
    else{
      this.rooms.splice(this.rooms.indexOf(id));
    }
  }
  onEnterBookingDetails(){
    this.roomDetails = { property: this.property, checkin_date: this.checkin_date, checkout_date: this.checkout_date, rooms: this.rooms};
    this.reservationService.roomDetails.next(this.roomDetails);
    this.router.navigate(['../details'], { relativeTo: this.route } );
  }
  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
