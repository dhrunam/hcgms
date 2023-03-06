import { Component, EventEmitter, Output } from '@angular/core';
import { ReservationService } from '../reservation.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Output('switchHouses') houses = new EventEmitter<{status: boolean}>();
  property: string = 'N/A';
  properties: any = [];
  constructor(private reservationService: ReservationService){}
  ngOnInit(): void{
    this.reservationService.getProperties().then((d:any) => this.properties = d);
  }
  onSearchRooms(data: any){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      if(data.value.start_date > data.value.end_date){
        alert('Invalid Date Range');
      }
      else if(this.property === 'N/A'){
        alert('Please select a guest house')
      }
      else{
        this.reservationService.search_rooms(data.value.start_date, data.value.end_date, data.value.property_id).then((d:any) => {
          if(!d[0]){
            this.houses.emit({status: false});
          }
          else{
            this.reservationService.results.next({data: d, checkin_date: data.value.start_date, checkout_date: data.value.end_date, property: data.value.property_id});
            this.houses.emit({status: true});
          }
        });
      } 
    }
  }
}
