import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cast } from '../../models/movie';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { TransportIdService } from '../../transport-id.service';

@Component({
  selector: 'app-cast',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './cast.component.html',
  styleUrl: './cast.component.scss'
})
export class CastComponent implements OnInit, OnDestroy {
    
  id!: number;
  casts!: Cast[];
  isLoading: boolean = false;
  path = 'https://image.tmdb.org/t/p/w500/'

private subscription: Subscription = new Subscription();
  
  constructor(private http: HttpClient, private idService: TransportIdService) {   
    this.id = idService.getMovieId();
  }



  ngOnInit() {
    this.isLoading = true;
    this.subscription = this.http.get<any>(`https://api.themoviedb.org/3/movie/${this.id}/credits?api_key=ac5224eaea5eecab8d1620632b5b6c95`)
      .subscribe({
        next: (data: any) => {
          this.casts = data.cast;
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
