import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MastersService } from '../masters.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  showItems: boolean = false;
  items:Array<{id:number, name: string}> = [];
  constructor(private router: Router, private route: ActivatedRoute, private mastersService: MastersService){}
  ngOnInit():void{
    this.getItems();
  }
  onRouteAddItem(){
    this.router.navigate(['../add'], { relativeTo: this.route } );
  }
  onRouteEditItem(id:number){
    this.router.navigate(['../edit', id], { relativeTo: this.route } );
  }
  getItems(){
    this.mastersService.get_items().subscribe({
      next: data => {
        this.showItems = data[0] ? true : false;
        this.items = data;
      },
    })
    
  }
}
