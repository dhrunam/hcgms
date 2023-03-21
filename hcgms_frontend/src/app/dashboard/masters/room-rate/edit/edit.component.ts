import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
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
      this.id = data['id'];
      if(this.editMode){
        this.showLoader = true;
        this.roomRateService.get_room_rate(data['id']).subscribe({
          next: data => {
            console.log(data);
            this.showLoader = false;
            this.cost = data.cost;
            this.start_date = data.start_date;
            this.end_date = data.end_date;
            this.property = data.property;
            this.room = data.room;
            this.property_name = data.related_property.name;
            this.room_no = data.related_room.room_no;
          }
        })
      }
    })
    this.roomRateService.get_properties().subscribe({
      next: data => {
        this.properties = data;
      }
    })
  }
  onGetRooms(event:any){
    let property_id:number = parseInt(event.target.value);
    this.roomRateService.get_rooms(property_id).subscribe({
      next: data => {
        this.rooms = data;
      }
    })
  }
  onSubmit(data: NgForm){
    this.showSuccess = '';
    let observable: Observable<any>;
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      this.showLoader = true;
      let fd = new FormData();
      fd.append('cost', data.value.c);
      fd.append('start_date', data.value.start);
      fd.append('end_date', data.value.end);
      if(this.editMode){
        fd.append('property', this.property);
        fd.append('room', this.room);
        fd.append('id', this.id.toString());
        observable = this.roomRateService.update_room_rate(fd);
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
          fd.append('property', this.property);
          fd.append('room', this.room);
        }
        observable = this.roomRateService.add_room_rate(fd);
      }
      observable.subscribe({
        next: data => {
          this.showSuccess = 'true';
          this.showLoader = false;
        },
        error: err => {
          this.showSuccess = 'false';
          this.showLoader = false;
        }
      })
    }
  }
  onGoBack(){
    this.editMode ? this.router.navigate(['../../'], {relativeTo: this.route}) : this.router.navigate(['../'], {relativeTo: this.route});
  }
}
