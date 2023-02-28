import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../property.service';
declare var bootstrap: any;
declare var $:any;
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent{
  properties: any = [];
  constructor(private router: Router, private route: ActivatedRoute, private propertyService: PropertyService){}
  ngOnInit():void {
    this.getProperties();
    // setTimeout(() => {
    //   const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    //   const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    // }, 200)
  }
  onRouteAddProperty(){
    this.router.navigate(['../new'], { relativeTo: this.route});
  }
  onRouteEditProperty(id:number){
    this.router.navigate(['../',id,'edit'], { relativeTo: this.route});
  }
  onDeleteProperty(id:number){
    this.propertyService.delete_property(id);
    this.getProperties();
  }
  getProperties(){
    this.propertyService.get_properties().then(d => {
      this.properties = d;
    })
  }
}
