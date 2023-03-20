import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../users.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  showLoader: boolean = false;
  showSuccess: string = '';
  showPswdSuccess: boolean = false;
  editMode: boolean = false;
  id: number = 0;
  properties: any = [];
  roles: any = [];
  first_name: string = '';
  last_name: string = '';
  username: string = '';
  contact: string = '';
  password: string = '';
  password2: string = '';
  property: string = 'N/A';
  role: string = 'N/A';
  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService){}
  ngOnInit():  void{
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.editMode = data['id'] != null;
      this.userService.get_properties().subscribe({
        next: data => this.properties = data,
      });
      this.userService.get_roles().subscribe({
        next: data => this.roles = data,
      });
      if(this.editMode){
        this.showLoader = true;
        this.userService.get_user(this.id).subscribe({
          next: data => {
            this.showLoader = false;
            this.first_name = data.first_name;
            this.contact = data.related_profile[0].contact_number;
            this.username = data.username;
            this.last_name = data.last_name;
            this.property = data.related_profile[0].related_property.id;
            this.role = data.related_groups[0].id;
          }
        })
      }
    })
  }
  onSubmit(data: NgForm){
    this.showSuccess = '';
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      if(this.property === 'N/A' && this.role === 'N/A'){
        alert('Please select a guest house and a role');
      }
      else if(this.property === 'N/A' || this.role === 'N/A'){
        if(this.property === 'N/A'){
          alert('Please select a guest house');
        }
        else{
          alert('Please select a role');
        }
      }
      else{
        let observable: Observable<any>
        this.showLoader = true;
        let fd = new FormData();
        fd.append('first_name', data.value.f_name);
        fd.append('last_name', data.value.l_name);
        fd.append('contact_number', data.value.c_no);
        fd.append('username', data.value.u_name);
        fd.append('property', this.property);
        fd.append('group', this.role);
        if(this.editMode){
          fd.append('id', this.id.toString());
          observable = this.userService.update_user(fd);
        }
        else{
          fd.append('password', data.value.pswd);
          fd.append('password2', data.value.pswd2);
          observable = this.userService.add_user(fd)
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
  }
  onGoBack(){
    this.editMode ? this.router.navigate(['../../'], {relativeTo: this.route}) : this.router.navigate(['../'], {relativeTo: this.route});
  }
  onChangeUserPassword(data: NgForm){
    this.showSuccess = '';
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      let fd = new FormData();
      fd.append('id', this.id.toString());
      fd.append('username', this.username);
      fd.append('password', data.value.chpswd);
      fd.append('password2', data.value.chpswd2);
      this.userService.change_user_password(fd).subscribe((d:any) => {
        this.showPswdSuccess = true;
      });;
    }
  }
}
