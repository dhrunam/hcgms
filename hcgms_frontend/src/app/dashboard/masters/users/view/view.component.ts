import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../users.service';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  users: any = [];
  showLoader: boolean = false;
  dtOptions: DataTables.Settings = {};
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute){}
  ngOnInit(): void{
    this.getUser();
    this.dtOptions = {
      pageLength: 10,
      pagingType: 'full_numbers',
      processing: true,
    }
  }
  onRouteAddUser(){
    this.router.navigate(['../new'], { relativeTo: this.route } );
  }
  onRouteEditUser(id:number){
    this.router.navigate(['../',id,'edit'], { relativeTo: this.route } );
  }
  onDeleteUser(id:number){
    this.userService.delete_user(id).subscribe({
      next: data => this.getUser(),
    })
    
  }
  getUser(){
    this.showLoader = true;
    this.userService.get_users().subscribe({
      next: data => {
        this.showLoader = false;
        this.users = data;
      }
    })
  }
}
