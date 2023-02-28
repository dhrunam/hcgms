import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from '../users.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
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
      this.id = +data['id'];
      this.editMode = data['id'] != null;
      this.userService.get_properties().then((d:any) => this.properties = d);
      this.userService.get_roles().then((d:any) => this.roles = d);
    })
  }
  ngAfterViewInit(){
    if(this.editMode){
      this.userService.get_user(this.id).then((d: any) => {
        this.first_name = d.first_name;
        this.contact = d.contact;
        this.username = d.username;
        this.last_name = d.last_name;
        this.property = d.property;
        this.role = d.role;
      })
    }
  }
  onAddUser(){
    let fd = new FormData();
    fd.append('first_name', this.first_name);
    fd.append('last_name', this.last_name);
    fd.append('contact_number', this.contact);
    fd.append('username', this.username);
    fd.append('property', this.property);
    fd.append('group', this.role);
    fd.append('password', this.password);
    fd.append('password2', this.password2);
    this.userService.add_user(fd);
  }
  onUpdateUser(){
    let fd = new FormData();
    fd.append('id', this.id.toString());
    fd.append('first_name', this.first_name);
    fd.append('last_name', this.last_name);
    fd.append('contact_number', this.contact);
    fd.append('username', this.username);
    fd.append('property', this.property);
    fd.append('group', this.role);
    this.userService.update_user(fd);
  }
  onGoBack(){
    this.editMode ? this.router.navigate(['../../'], {relativeTo: this.route}) : this.router.navigate(['../'], {relativeTo: this.route});
  }
  onChangeUserPassword(){
    let fd = new FormData();
    fd.append('id', this.id.toString());
    fd.append('username', this.username);
    fd.append('password', this.password);
    fd.append('password2', this.password2);
    this.userService.change_user_password(fd);
  }
}
