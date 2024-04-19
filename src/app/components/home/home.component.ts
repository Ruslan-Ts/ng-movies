import { Component, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  movies!: Movie[];
  path = 'https://image.tmdb.org/t/p/w500/'
private subscription: Subscription = new Subscription();

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.subscription = this.http.get<any>("https://api.themoviedb.org/3/trending/movie/week?api_key=ac5224eaea5eecab8d1620632b5b6c95")
      .subscribe({
        next: (data: any) => {
          this.movies = data.results;
        },
        error: (error) => {
          console.error('Error fetching movies:', error);

        }
      });
  }
    trackById(index: number, movie: Movie): number {
    return movie.id;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}