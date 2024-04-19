import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransportIdService {

  movieId: number = 0;
  constructor() { }

  setMovieId(id:number) {
    this.movieId = id;
  }

  getMovieId() {
    return this.movieId;
  }
}
