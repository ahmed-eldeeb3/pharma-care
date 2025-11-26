import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserrequestComponent } from './userrequest/userrequest.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,UserrequestComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent {
  title = 'pharmacare';
}
