import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MoviesComponent } from './components/movies/movies.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { NotFoundComponent } from './components/404/404.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { CastComponent } from './components/cast/cast.component';
import { ReviewsComponent } from './components/reviews/reviews.component';

const moviesRouts = [
        { path: "cast", component: CastComponent },
        { path: "reviews", component: ReviewsComponent }
    ]

export const routes: Routes = [
{ path: '', component: HomeComponent},
{ path: 'movies', component: MoviesComponent},
{ path: 'favorites', component: FavoritesComponent },
{ path: "movies/:id", component: MovieDetailsComponent},
{ path: "movies/:id", component: MovieDetailsComponent,  children: moviesRouts},
{ path: "**", component: NotFoundComponent }
];
