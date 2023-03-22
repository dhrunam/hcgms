import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';

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
  constructor(private route: ActivatedRoute, private router: Router){}
  ngOnInit():void{
    this.route.params.subscribe({
      next: (param: Params) => {
        this.editMode = param['id'] != null;
        this.id = +param['id'];
        if(this.editMode){

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
      }
      // observable.subscribe({
      //   next: data => {
      //     this.showSuccess = 'true';
      //   },
      //   error: err => {
      //     this.showSuccess = 'false';
      //   }
      // })
    }
  }
  onGoBack(){
    this.editMode ? this.router.navigate(['../../'], { relativeTo: this.route}) : this.router.navigate(['../'], {relativeTo: this.route});
  }
}
