import { Component } from '@angular/core';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {
  showSearch: boolean = true;
  showHouses: boolean = false;
  showDetails: boolean = false;
  showAck: boolean = false;

  onShowHouses(data: { status: boolean}){
    this.showHouses = data.status;
    this.showAck = !data.status;
    this.showDetails = !data.status;
    this.showSearch = data.status;
  }
  onShowAck(data: { status: boolean}){
    this.showHouses = !data.status;
    this.showAck = data.status;
    this.showDetails = !data.status;
    this.showSearch = !data.status;
  }
  onShowDetails(data: { status: boolean}){
    this.showHouses = !data.status;
    this.showAck = !data.status;
    this.showDetails = data.status;
  }
}
