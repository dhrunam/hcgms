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
      },
      error: err => console.log(err), 
    })
    this.results = [];
  }
  onStatusCheck(event: any, id:number, rate: number){
    if(event.target.checked){
      const data = {
        'room_id': id,
        'room_rate': rate,
      }
      this.rooms.push(data);
    }
    else{
      this.rooms.splice(this.rooms.indexOf(id));
    }
  }
  onEnterBookingDetails(){
    this.router.navigate(['../details'], { relativeTo: this.route } );
  }
  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
