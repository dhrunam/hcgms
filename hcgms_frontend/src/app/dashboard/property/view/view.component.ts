import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
declare var bootstrap: any;
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  constructor(private router: Router, private route: ActivatedRoute){}
  ngOnInit():void {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
  }
  onRouteAddProperty(){
    this.router.navigate(['../new'], { relativeTo: this.route});
  }
  onRouteEditProperty(){
    this.router.navigate(['../',1,'edit'], { relativeTo: this.route});
  }
}
