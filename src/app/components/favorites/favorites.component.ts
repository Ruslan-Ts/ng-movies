import { Component, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { LocalStorageService } from '../../local-storage.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [HttpClientModule, RouterLink],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnInit {
  favorites: Movie[] = [];
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
    this.isLoading = false;
  }
checkFavorite(id: number) {
    return this.favorites.some(item => item.id == id)
  }
  switchFavorite(id: number) {

    const movieToAdd = this.favorites.find((item: Movie | undefined) => item?.id === id);
    if (movieToAdd) {
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

}
