import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar,HttpClientModule,CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  template: `<router-outlet></router-outlet>`
})
export class App {
  title = signal('pharmCare');
}
