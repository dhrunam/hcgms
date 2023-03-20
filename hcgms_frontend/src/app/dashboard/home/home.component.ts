import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilitiesModule } from 'src/app/utilities/utilities.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, UtilitiesModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

}
