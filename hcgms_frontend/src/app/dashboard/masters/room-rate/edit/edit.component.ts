import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RoomRateService } from '../room-rate.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  private subscription!: Subscription;
  editMode: boolean = false;
  properties: any = [];
  rooms: any = [];
  id:number = 0;
  cost: string = '';
  start_date: string = '';
  end_date: string = '';
  property: string = 'N/A';
  room: string = 'N/A';
  constructor(private roomRateService: RoomRateService, private router: Router, private route: ActivatedRoute){}
  ngOnInit():void {
    this.subscription = this.route.params.subscribe((data: Params) => {
      this.editMode = data['id'] != null;
      if(this.editMode){
        this.roomRateService.get_room_rate(data['id']).then((d:any) => {
          this.id = d.id;
          this.cost = d.cost;
          this.start_date = d.start_date;
          this.end_date = d.end_date;
          this.property = d.property;
          this.room = d.room;
        })
      }
    })
    this.roomRateService.get_properties().then((d:any) => {
      this.properties = d;
    })
    
  }
  onGetRooms(event:any){
    let property_id:number = parseInt(event.target.value);
    this.roomRateService.get_rooms(property_id).then((d:any) => {
      this.rooms = d;
    })
  }
  onAddRoomTariff(){
    let fd = new FormData();
    fd.append('cost', this.cost);
    fd.append('start_date', this.start_date);
    fd.append('end_date', this.end_date);
    fd.append('property', this.property);
    fd.append('room', this.room);
    this.roomRateService.add_room_rate(fd);
  }
  onUpdateRoomTariff(){
    let fd = new FormData();
    fd.append('id', this.id.toString());
    fd.append('cost', this.cost);
    fd.append('start_date', this.start_date);
    fd.append('end_date', this.end_date);
    fd.append('property', this.property);
    fd.append('room', this.room);
    this.roomRateService.update_room_rate(fd);
  }
  onGoBack(){
    this.editMode ? this.router.navigate(['../../'], {relativeTo: this.route}) : this.router.navigate(['../'], {relativeTo: this.route});
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
