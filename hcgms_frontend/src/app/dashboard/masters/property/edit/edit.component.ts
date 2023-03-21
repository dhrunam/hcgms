import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PropertyService } from '../property.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  showLoader: boolean = false;
  editMode: boolean = false;
  id:number = 0;
  prop_name: string = '';
  prop_address: string = '';
  prop_short_name: string = '';
  prop_description: string = '';
  showSuccess: string = '';
  prop_code: string = '';
  constructor(private router: Router, private route: ActivatedRoute, private propertyService: PropertyService) {}
  ngOnInit(): void{
    this.route.params.subscribe((param:Params) => {
      this.id = param['id'];
      this.editMode = param['id'] != null;
      if(this.editMode){
        this.showLoader = true;
        this.propertyService.get_property(param['id']).subscribe({
          next: data => { 
            this.showLoader = false;
            this.prop_name = data.name;
            this.prop_address = data.address;
            this.prop_short_name = data.short_name;
            this.prop_description = data.description;
            this.prop_code = data.code;
          }
        });
      }
    })
  }
  onSubmit(data: NgForm){
    let observable: Observable<any>;
    this.showSuccess = '';
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      this.showLoader = true;
      let fd = new FormData();
      fd.append('name', data.value.name);
      fd.append('description', data.value.description);
      fd.append('address', data.value.address);
      fd.append('short_name', data.value.short_name.toUpperCase());
      fd.append('code', data.value.code);
      if(this.editMode){
        fd.append('id', this.id.toString());
        observable = this.propertyService.update_property(fd);
      }
      else{
        fd.append('is_operational', 'true');
        observable = this.propertyService.add_property(fd);
      }
      observable.subscribe({
        next: data => {
          this.showSuccess = 'true';
          this.showLoader = false;
        },
        error: err => {
          this.showSuccess = 'false';
          this.showLoader = false;
        },
      })
    }
  }
  onGoBack(){
    this.editMode ? this.router.navigate(['../../'], {relativeTo: this.route}) : this.router.navigate(['../'], {relativeTo: this.route});
  }
}
