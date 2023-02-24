import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  editMode: boolean = false;
  private routeSubscription!: Subscription;
  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void{
    this.routeSubscription = this.route.params.subscribe((param:Params) => {
      this.editMode = param['id'] != null;
      console.log(this.editMode);
    })
  }
}
