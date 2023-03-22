import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  showItems: boolean = false;
  items:Array<{id:number, name: string}> = [];
  constructor(private router: Router, private route: ActivatedRoute){}
  ngOnInit():void{
    this.getItems();
  }
  onRouteAddItems(){
    this.router.navigate(['../add'], { relativeTo: this.route } );
  }
  onRouteEditItems(id:number){
    this.router.navigate(['../edit', id], { relativeTo: this.route } );
  }
  getItems(){
    this.showItems = this.items[0] ? true : false;
  }
}
