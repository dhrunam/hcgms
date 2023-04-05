import { Component, ViewEncapsulation } from '@angular/core';
import { LoaderService } from './services/loader-service/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  loader$ = this.loadingService.loading$;
  constructor(private loadingService: LoaderService){}
}
