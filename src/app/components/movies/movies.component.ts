import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Movie } from '../../models/movie';
import { Subscription } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent implements OnDestroy {
  filter: string = '';
  foundedMovies!: Movie[];
  path = 'https://image.tmdb.org/t/p/w500/'
private subscription: Subscription = new Subscription();

  constructor(private http: HttpClient) {}
  
  
  searchMovies() {
  this.subscription = this.http.get<any>(`https://api.themoviedb.org/3/search/movie?query=${this.filter}&api_key=ac5224eaea5eecab8d1620632b5b6c95`)
      .subscribe({
        next: (data: any) => {
          this.foundedMovies = data.results;
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
