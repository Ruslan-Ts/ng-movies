import { Component, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  movies!: Movie[];
  isLoading: boolean = false;
  path = 'https://image.tmdb.org/t/p/w500/'
private subscription: Subscription = new Subscription();

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.isLoading = true;
    this.subscription = this.http.get<any>("https://api.themoviedb.org/3/trending/movie/week?api_key=ac5224eaea5eecab8d1620632b5b6c95")
      .subscribe({
        next: (data: any) => {
          this.movies = data.results;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching movies:', error);
          this.isLoading = false;

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