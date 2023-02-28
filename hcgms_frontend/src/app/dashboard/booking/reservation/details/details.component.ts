import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReservationService } from '../reservation.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  acknowledgement: boolean = false;
  private subscription!: Subscription;
  constructor(private reservationService: ReservationService){}
  ngOnInit(): void {
    this.subscription = this.reservationService.roomDetails.subscribe({
      next: data => console.log(data)
    })
  }
  onToggle(){
    this.acknowledgement = !this.acknowledgement;
  }
  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
