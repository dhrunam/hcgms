import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PropertyService } from '../property.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  editMode: boolean = false;
  id:number = 0;
  prop_name: string = '';
  prop_address: string = '';
  prop_short_name: string = '';
  prop_description: string = '';
  private routeSubscription!: Subscription;
  constructor(private router: Router, private route: ActivatedRoute, private propertyService: PropertyService) {}
  ngOnInit(): void{
    this.routeSubscription = this.route.params.subscribe((param:Params) => {
      this.editMode = param['id'] != null;
      if(this.editMode){
        this.propertyService.get_property(param['id']).then((d:any) => { 
          this.id = d.id;
          this.prop_name = d.name;
          this.prop_address = d.address;
          this.prop_short_name = d.short_name;
          this.prop_description = d.description;
        });
      }
    })
  }
  onAddProperty(){
    let fd = new FormData();
    fd.append('name', this.prop_name);
    fd.append('description', this.prop_description);
    fd.append('address', this.prop_address);
    fd.append('short_name', this.prop_short_name);
    fd.append('code', 'SHC03');
    this.propertyService.add_property(fd);
  }
  onUpdateProperty(){
    let fd = new FormData();
    fd.append('id', this.id.toString());
    fd.append('name', this.prop_name);
    fd.append('description', this.prop_description);
    fd.append('address', this.prop_address);
    fd.append('short_name', this.prop_short_name);
    fd.append('code', 'SHC03');
    this.propertyService.update_property(fd);
  }
  onGoBack(){
    this.editMode ? this.router.navigate(['../../'], {relativeTo: this.route}) : this.router.navigate(['../'], {relativeTo: this.route});
  }
  ngOnDestroy(){
    this.routeSubscription.unsubscribe();
  }
}
