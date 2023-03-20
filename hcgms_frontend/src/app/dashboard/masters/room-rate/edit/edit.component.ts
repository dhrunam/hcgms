import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RoomRateService } from '../room-rate.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  showLoader: boolean = false;
  showSuccess: string = '';
  editMode: boolean = false;
  properties: any = [];
  rooms: any = [];
  id:number = 0;
  cost: string = '';
  start_date: string = '';
  end_date: string = '';
  property: string = 'N/A';
  property_name:string = '';
  room_no:string = '';
  room: string = 'N/A';
  constructor(private roomRateService: RoomRateService, private router: Router, private route: ActivatedRoute){}
  ngOnInit():void {
    this.route.params.subscribe((data: Params) => {
      this.editMode = data['id'] != null;
      if(this.editMode){
        this.showLoader = true;
        this.roomRateService.get_room_rate(data['id']).then((d:any) => {
          this.showLoader = false;
          this.id = d.id;
          this.cost = d.cost;
          this.start_date = d.start_date;
          this.end_date = d.end_date;
          this.property = d.property;
          this.room = d.room;
          this.property_name = d.property_name;
          this.room_no = d.room_no;
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
  onAddRoomTariff(data:any){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      if(this.property === 'N/A' && this.room === 'N/A'){
        alert('Please select a guest house and a room');
      }
      else if(this.property === 'N/A' || this.room === 'N/A'){
        if(this.property === 'N/A'){
          alert('Please select a guest house');
        }
        else{
          alert('Please select a room');
        }
      }
      else{
        this.showLoader = true;
        let fd = new FormData();
        fd.append('cost', this.cost);
        fd.append('start_date', this.start_date);
        fd.append('end_date', this.end_date);
        fd.append('property', this.property);
        fd.append('room', this.room);
        this.roomRateService.add_room_rate(fd).then((d:any) => {
          this.showLoader = false;
          this.showSuccess = d.error ? 'false' : 'true';
        });
      }
    }
    
  }
  onUpdateRoomTariff(data:any){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      if(this.property === 'N/A' && this.room === 'N/A'){
        alert('Please select a guest house and a room');
      }
      else if(this.property === 'N/A' || this.room === 'N/A'){
        if(this.property === 'N/A'){
          alert('Please select a guest house');
        }
        else{
          alert('Please select a room');
        }
      }
      else{
        this.showLoader = true;
        let fd = new FormData();
        fd.append('id', this.id.toString());
        fd.append('cost', this.cost);
        fd.append('start_date', this.start_date);
        fd.append('end_date', this.end_date);
        fd.append('property', this.property);
        fd.append('room', this.room);
        this.roomRateService.update_room_rate(fd).then((d:any) => {
          this.showLoader = false;
          this.showSuccess = d.error ? 'false' : 'true';
        });
      }
    }
  }
  onGoBack(){
    this.editMode ? this.router.navigate(['../../'], {relativeTo: this.route}) : this.router.navigate(['../'], {relativeTo: this.route});
  }
}
