import { Component, OnDestroy, OnInit } from '@angular/core';
import { Review } from '../../models/movie';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { TransportIdService } from '../../transport-id.service';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent implements OnInit, OnDestroy  {
   id!: number;
  reviews!: Review[];
  isLoading: boolean = false;
  path = 'https://image.tmdb.org/t/p/w500/'

private subscription: Subscription = new Subscription();
  
  constructor(private http: HttpClient, private idService: TransportIdService) {   
    this.id = idService.getMovieId();
  }



  ngOnInit() {
    this.isLoading = true;
    this.subscription = this.http.get<any>(`https://api.themoviedb.org/3/movie/${this.id}/reviews?api_key=ac5224eaea5eecab8d1620632b5b6c95`)
      .subscribe({
        next: (data: any) => {
          this.reviews = data.results;
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
