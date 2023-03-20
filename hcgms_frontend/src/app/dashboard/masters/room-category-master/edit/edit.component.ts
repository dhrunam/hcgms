import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RoomCategoryService } from '../room-category.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  id:number = 0;
  room_category: string = '';
  editMode: boolean = false;
  showSuccess: string = '';
  showLoader: boolean = false;
  constructor(private router: Router, private route: ActivatedRoute, private roomCategoryService: RoomCategoryService){}
  ngOnInit(): void{
    this.route.params.subscribe((data: Params) => {
      this.editMode = data['id'] != null;
      if(this.editMode){
        this.showLoader = true;
        this.roomCategoryService.get_room_category(data['id']).then((d:any) => {
          this.id = d.id;
          this.showLoader = false;
          this.room_category = d.name;
        })
      }
    })
  }
  onAddRoomCategory(data: any){
    this.showSuccess = '';
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      this.showLoader = true;
      let fd = new FormData();
      fd.append('name', this.room_category);
      this.roomCategoryService.add_room_category(fd).then((d:any) => {
        this.showLoader = false;
        this.showSuccess = d.error ? this.showSuccess = 'false' : this.showSuccess = 'true';
      });
    }
  }
  onEditRoomCategory(data:any){
    this.showSuccess = ''
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      this.showLoader = true;
      let fd = new FormData();
      fd.append('id', this.id.toString());
      fd.append('name', this.room_category);
      this.roomCategoryService.update_room_category(fd).then((d:any) => {
        this.showLoader = false;
        this.showSuccess = d.error ? this.showSuccess = 'false' : this.showSuccess = 'true';
      });;
    }
  }
  onGoBack(){
    this.editMode ? this.router.navigate(['../../'], {relativeTo: this.route}) : this.router.navigate(['../'], {relativeTo: this.route});
  }
}
