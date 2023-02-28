import { Component } from '@angular/core';
import { ReservationService } from '../reservation.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  property: string = 'N/A'
  // properties: any = [];
  constructor(private reservationService: ReservationService){}
  ngOnInit(): void{
    // this.reservationService.getProperties().then((d:any) => this.properties = d);
  }
  onSearchRooms(data: any){
    if(data.value.start_date > data.value.end_date){
      alert('Invalid Date Range');
    }
    this.reservationService.search_rooms(data.value.start_date, data.value.end_date).then((d:any) => {
      console.log(d);
      this.reservationService.results.next(d);
    });
  }
}
