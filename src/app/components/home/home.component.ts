import { Component, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { LocalStorageService } from '../../local-storage.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  movies!: Movie[];
  favorites: Movie[] = [];
  
  // [{  id: 9999999999,
  //   poster_path: 'string',
  //   original_title: 'string',
  //   overview: 'string',
  //   release_date: 'string',
  //   vote_average: 4444,
  //   backdrop_path: 'string',
  //   genres: [{  id: 999999999,
  //   name: 'string'}],
  //   production_companies: [{  id: 999999999,
  //   name: 'string',
  //     logo_path: 'string'
  //   }]
  // }]

  isLoading: boolean = false;
  path = 'https://image.tmdb.org/t/p/w500/'
private subscription: Subscription = new Subscription();

  constructor(private http: HttpClient, private localeService: LocalStorageService) {}

  ngOnInit() {
    this.isLoading = true;
    const favoritesData = this.localeService.getData('favorites');
    if (favoritesData) {
      this.favorites = favoritesData;
    }
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
  checkFavorite(id: number) {
    return this.favorites.some(item => item.id == id)
  }
  switchFavorite(id: number) {

    const movieToDel = this.favorites.find((item: Movie | undefined) => item?.id === id);
   const movieToAdd = this.movies.find((item: Movie | undefined) => item?.id === id);
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