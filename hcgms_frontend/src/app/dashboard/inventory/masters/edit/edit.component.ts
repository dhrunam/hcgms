import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MastersService } from '../masters.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  editMode: boolean = false;
  id: number = 0;
  item_name: string = '';
  showSuccess: string = '';
  constructor(private route: ActivatedRoute, private router: Router, private mastersService: MastersService){}
  ngOnInit():void{
    this.route.params.subscribe({
      next: (param: Params) => {
        this.editMode = param['id'] != null;
        this.id = +param['id'];
        if(this.editMode){
          this.mastersService.get_item(param['id']).subscribe({
            next: data => {
              this.item_name = data.name;
            }
          })
        }
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
      let fd = new FormData();
      fd.append('name', data.value.name);
      if(this.editMode){
        fd.append('id', this.id.toString());
        observable = this.mastersService.update_item(fd);
      }
      else{
        observable = this.mastersService.add_item(fd);
      }
      observable.subscribe({
        next: data => {
          this.showSuccess = 'true';
        },
        error: err => {
          this.showSuccess = 'false';
        }
      })
    }
  }
  onGoBack(){
    this.editMode ? this.router.navigate(['../../'], { relativeTo: this.route}) : this.router.navigate(['../'], {relativeTo: this.route});
  }
}
