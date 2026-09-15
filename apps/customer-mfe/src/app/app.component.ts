import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-customer-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <h1>Customer Micro-Frontend</h1>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {}
