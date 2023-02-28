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
  listRooms: boolean = false;
  private subscription!: Subscription;
  constructor(private router: Router, private route: ActivatedRoute, private reservationService: ReservationService){}
  ngOnInit(): void{
    this.subscription = this.reservationService.results.subscribe({
      next: data => {
        this.results = data;
      },
      error: err => console.log(err), 
    })
  }
  onEnterBookingDetails(){
    this.router.navigate(['../details'], { relativeTo: this.route } );
  }
  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
