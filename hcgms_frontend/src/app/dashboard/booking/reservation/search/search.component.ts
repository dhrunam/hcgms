import { Component } from '@angular/core';
import { ReservationService } from '../reservation.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  property: string = 'N/A'
  properties: any = [];
  constructor(private reservationService: ReservationService){}

  ngOnInit(): void{
    // this.reservationService.getProperties().then((d:any) => this.properties = d);
  }
}
