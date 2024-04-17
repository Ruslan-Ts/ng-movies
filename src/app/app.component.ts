import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet]
})
export class AppComponent {
  title = 'movies';

  constructor(private router: Router) { }
  
  routeMovies() {
    this.router.navigate(['movies']);
  }
  routeFavorites() {
    this.router.navigate(['favorites']);
  }
  routeHome() {
    this.router.navigate(['']);
  }
}
