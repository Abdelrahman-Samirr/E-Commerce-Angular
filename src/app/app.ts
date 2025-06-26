import { Component } from '@angular/core';
import { Nav } from './nav/nav';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Nav, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'online';
}
