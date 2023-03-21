import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
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
      this.id = data['id'];
      if(this.editMode){
        this.showLoader = true;
        this.roomCategoryService.get_room_category(data['id']).subscribe({
          next: data => {
            this.showLoader = false;
            this.room_category = data.name;
          }
        })
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
      fd.append('name', data.value.category);
      if(this.editMode){
        fd.append('id', this.id.toString());
        observable = this.roomCategoryService.update_room_category(fd);
      }
      else{
        observable = this.roomCategoryService.add_room_category(fd);
      }
      observable.subscribe({
        next: data => {
          this.showLoader = false;
          this.showSuccess = 'true';
        },
        error: err => {
          this.showLoader = false;
          this.showSuccess = 'false';
        }
      })
    }
  }
  onGoBack(){
    this.editMode ? this.router.navigate(['../../'], {relativeTo: this.route}) : this.router.navigate(['../'], {relativeTo: this.route});
  }
}
