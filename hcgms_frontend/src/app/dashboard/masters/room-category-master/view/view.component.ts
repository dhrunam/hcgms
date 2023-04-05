import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomCategoryService } from '../room-category.service';
declare var bootstrap:any;
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  categories: any = [];
  showLoader: boolean = false;
  dtOptions: DataTables.Settings = {};
  constructor(private router: Router, private route: ActivatedRoute, private roomCategoryService: RoomCategoryService){}
  ngOnInit(): void{
    this.getCategories();
    this.dtOptions = {
      pageLength: 10,
      pagingType: 'full_numbers',
      processing: true,
    }
  }
  onRouteAddRoomCategory(){
    this.router.navigate(['../new'], { relativeTo: this.route } );
  }
  onRouteEditRoomCategory(id:number){
    this.router.navigate(['../',id,'edit'], { relativeTo: this.route } );
  }
  onDeleteRoomCategory(id:number){
    this.roomCategoryService.delete_room_category(id).subscribe({
      next: () => this.getCategories(),
    });
  }
  getCategories(){
    this.showLoader = true;
    this.roomCategoryService.get_room_categories().subscribe({
      next: data => {
        this.showLoader = false;
        this.categories = data;
      }
    });
  }
}
