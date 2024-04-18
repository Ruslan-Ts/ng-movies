import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MoviesComponent } from './components/movies/movies.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { NotFoundComponent } from './components/404/404.component';

export const routes: Routes = [
{ path: '', component: HomeComponent},
{ path: 'movies', component: MoviesComponent},
{ path: 'favorites', component: FavoritesComponent },
{ path: "**", component: NotFoundComponent }
];
