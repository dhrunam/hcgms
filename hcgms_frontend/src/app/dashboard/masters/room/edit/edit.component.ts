import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RoomService } from '../room.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  showLoader: boolean = false;
  properties: any = [];
  categories: any = [];
  editMode: boolean = false;
  id:number = 0;
  room_no: string = '';
  occupancy: string = '';
  description: string = '';
  property_id: string = 'N/A';
  room_category_id: string = 'N/A';
  room_is_operational: boolean = false;
  showSuccess:string = '';
  constructor(private roomService: RoomService, private router: Router, private route: ActivatedRoute){}
  ngOnInit():void{
      this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.editMode = data['id'] != null;
      if(this.editMode){
        this.showLoader = true;
        this.roomService.get_room(data['id']).subscribe({
          next: data => {
            this.showLoader = false;
            this.room_no = data.room_no;
            this.occupancy = data.occupancy;
            this.description = data.description;
            this.property_id = data.property;
            this.room_category_id = data.room_category;
          }
        })
      }
    });
    this.roomService.get_properties().subscribe({
      next: data => this.properties = data,
    });
    this.roomService.get_room_categories().subscribe({
      next: data => this.categories = data,
    });
  }
  onGoBack(){
    this.editMode ? this.router.navigate(['../../'], {relativeTo: this.route}) : this.router.navigate(['../'], {relativeTo: this.route});
  }
  onSubmit(data:NgForm){
    this.showSuccess = '';
    let observable: Observable<any>;
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      if(this.property_id === 'N/A' && this.room_category_id === 'N/A'){
        alert('Please select a guest house and a room category');
      }
      else if(this.property_id === 'N/A' || this.room_category_id === 'N/A'){
        if(this.property_id === 'N/A'){
          alert('Please select a guest house');
        }
        else{
          alert('Please select a room category');
        }
      }
      else{
        this.showLoader = true;
        let fd = new FormData();
        fd.append('room_no', data.value.no);
        fd.append('occupancy', data.value.occ);
        fd.append('description', data.value.descp);
        fd.append('property', this.property_id);
        fd.append('room_category', this.room_category_id);
        if(this.editMode){
          fd.append('id', this.id.toString());
          observable = this.roomService.update_room(fd);
        }
        else{
          fd.append('is_operational', 'true');
          observable = this.roomService.add_room(fd);
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
  }
}