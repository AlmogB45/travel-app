import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'travel-app';

  constructor(private router: Router) {}

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    this.router.navigate(['/']);
  }
}
