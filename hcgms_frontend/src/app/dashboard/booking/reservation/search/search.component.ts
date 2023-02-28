import { Component } from '@angular/core';
import { ReservationService } from '../reservation.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  property: string = 'N/A';
  properties: any = [];
  constructor(private reservationService: ReservationService){}
  ngOnInit(): void{
    this.reservationService.getProperties().then((d:any) => this.properties = d);
  }
  onSearchRooms(data: any){
    if(data.value.start_date > data.value.end_date){
      alert('Invalid Date Range');
    }
    else{
      this.reservationService.search_rooms(data.value.start_date, data.value.end_date, data.value.property).then((d:any) => { 
        this.reservationService.results.next({data: d, checkin_date: data.value.start_date, checkout_date: data.value.end_date, property: data.value.property});
      });
    } 
  }
}
