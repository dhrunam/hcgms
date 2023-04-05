import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-uloader',
  templateUrl: './uloader.component.html',
  styleUrls: ['./uloader.component.css']
})
export class UloaderComponent {
  @Input('loader') loader$: any;
}
