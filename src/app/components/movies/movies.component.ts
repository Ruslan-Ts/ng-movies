import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Movie } from '../../models/movie';
import { Subscription } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { LocalStorageService } from '../../local-storage.service';


@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterLink],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent implements OnInit, OnDestroy {
  filter: string = '';
  isLoading: boolean = false;
  foundedMovies!: Movie[];
  favorites: Movie[] = [];
  path = 'https://image.tmdb.org/t/p/w500/'
private subscription: Subscription = new Subscription();

  constructor(private http: HttpClient, private localeService: LocalStorageService) {}
  
  ngOnInit() {
    const favoritesData = this.localeService.getData('favorites');
    if (favoritesData) {
      this.favorites = favoritesData;
    }
  }
  searchMovies() {
    this.isLoading = true;
  this.subscription = this.http.get<any>(`https://api.themoviedb.org/3/search/movie?query=${this.filter}&api_key=ac5224eaea5eecab8d1620632b5b6c95`)
      .subscribe({
        next: (data: any) => {
          this.foundedMovies = data.results;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching movies:', error);

        }
      });
  }
    trackById(index: number, movie: Movie): number {
    return movie.id;
    }
   checkFavorite(id: number) {
    return this.favorites.some(item => item.id == id)
  }
  switchFavorite(id: number) {

    const movieToDel = this.favorites.find((item: Movie | undefined) => item?.id === id);
   const movieToAdd = this.foundedMovies.find((item: Movie | undefined) => item?.id === id);
    if (movieToDel) {
      const index = this.favorites.findIndex(movie => movie.id == id);
      this.favorites.splice(index, 1);
       this.localeService.saveData('favorites', this.favorites);
    } else if(movieToAdd) {
    this.favorites.push(movieToAdd);
    this.localeService.saveData('favorites', this.favorites);
   
    } else {
      throw new Error;
  }
  }
   ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
