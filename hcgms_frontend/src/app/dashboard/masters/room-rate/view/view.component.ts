import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomRateService } from '../room-rate.service';
declare var bootstrap: any;
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  showLoader: boolean = false;
  room_rates: any = [];
  constructor(private roomRateService: RoomRateService, private router: Router, private route: ActivatedRoute){}

  ngOnInit():void{
    this.getRoomRates();
  }
  onRouteAddRoomTariff(){
    this.router.navigate(['../new'], { relativeTo: this.route } );
  }
  onRouteEditRoomTariff(id:number){
    this.router.navigate(['../',id,'edit'], { relativeTo: this.route } );
  }
  onDeleteRoomTariff(id:number){
    this.roomRateService.delete_room_rate(id).subscribe({
      next: () => this.getRoomRates(),
    });
  }
  getRoomRates(){
    this.showLoader = true;
    this.roomRateService.get_room_rates().subscribe({
      next: data => {
        this.showLoader = false;
        this.room_rates = data;
      }
    })
  }
}
