import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../property.service';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent{
  properties: Array<any> = [];
  propertySearch: string = '';
  dtOptions: DataTables.Settings = {};
  showLoader: boolean = false;
  constructor(private router: Router, private route: ActivatedRoute, private propertyService: PropertyService){}
  ngOnInit():void {
    this.getProperties();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    }
  }
  onRouteAddProperty(){
    this.router.navigate(['../new'], { relativeTo: this.route});
  }
  onRouteEditProperty(id:number){
    this.router.navigate(['../',id,'edit'], { relativeTo: this.route});
  }
  onDeleteProperty(id:number, status: boolean){
    let fd = new FormData();
    fd.append('id', id.toString());
    fd.append('is_operational', status.toString())
    this.propertyService.delete_property(fd).subscribe({
      next: () => this.getProperties(),
    });
    
  }
  getProperties(){
    this.showLoader = true;
    this.propertyService.get_properties().subscribe({
      next: data => {
        this.properties = data;
        this.showLoader = false;
      }
    })
  }
}
