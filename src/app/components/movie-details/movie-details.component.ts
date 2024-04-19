import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet, RouterLink, RouterLinkActive} from '@angular/router';

import { Movie } from '../../models/movie';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { TransportIdService } from '../../transport-id.service';


@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [HttpClientModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
    
  id!: number;
  movie!: Movie;
  isLoading: boolean = false;
  path = 'https://image.tmdb.org/t/p/w500/'
private subscription: Subscription = new Subscription();
  
  constructor(private http: HttpClient, private route: ActivatedRoute, private idService: TransportIdService) {   
    route.params.subscribe(params => this.id = params["id"]);
    this.idService.setMovieId(this.id);
  }


  ngOnInit() {
    this.isLoading = true;
    this.subscription = this.http.get<any>(`https://api.themoviedb.org/3/movie/${this.id}?api_key=ac5224eaea5eecab8d1620632b5b6c95`)
      .subscribe({
        next: (data: any) => {
          this.movie = data;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching movies:', error);
          this.isLoading = false;
        }
      });

  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
