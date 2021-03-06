import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {
  public URL = 'https://api.themoviedb.org/3/movie/';
  public URL_CATEGORIES = 'https://api.themoviedb.org/3/';
  public TOKEN = 'aa031ed471a4250c5a6cc55678ff4083';
  public LANGUAGE = `&language=fr-FR`;
  public URL_MOVIES_BY_CATEGORIES = `https://api.themoviedb.org/3/discover/movie?api_key=`;
  public GENRE = `&with_genres=`;
  public OPTION = `&sort_by=popularity.desc`;
  public URL_SEARCH = 'https://api.themoviedb.org/3/search/movie?api_key=';

  constructor(private httpClient: HttpClient) {}

  getPopular(): Observable<any> {
    return this.httpClient.get(
      this.URL + `popular?api_key=` + this.TOKEN + this.LANGUAGE
    );
  }

  getnowPLaying(): Observable<any> {
    return this.httpClient.get(
      this.URL + `now_playing?api_key=` + this.TOKEN + this.LANGUAGE
    );
  }

  getBestRated(): Observable<any> {
    return this.httpClient.get(
      this.URL + `top_rated?api_key=` + this.TOKEN + this.LANGUAGE
    );
  }
  getUpcoming(): Observable<any> {
    return this.httpClient.get(
      this.URL + `upcoming?api_key=` + this.TOKEN + this.LANGUAGE
    );
  }

  getMovie(movieId: number): Observable<any> {
    return this.httpClient.get(
      this.URL + `${movieId}?api_key=` + this.TOKEN + this.LANGUAGE
    );
  }

  getVideo(movieId: number): Observable<any> {
    return this.httpClient.get(
      this.URL + `${movieId}/videos?api_key=` + this.TOKEN + this.LANGUAGE
    );
  }
  getCategories(): Observable<any> {
    return this.httpClient.get(
      this.URL_CATEGORIES + `genre/movie/list?api_key=` + this.TOKEN + this.LANGUAGE
    );
  }
  getTheMostPopularMovieByCategories(genre: string): Observable<any> {
    return this.httpClient.get(
      this.URL_MOVIES_BY_CATEGORIES + this.TOKEN + this.LANGUAGE + this.GENRE + genre + this.OPTION
    );
  }
  getCategory(genreId: number): Observable<any>{
    return this.httpClient.get(
      this.URL_CATEGORIES + `genre/movie/list?api_key=` + this.TOKEN + this.LANGUAGE + `&with_genre=` + genreId
    );
  }
  getMovies(value: string){
    return this.httpClient.get(
      this.URL_SEARCH + this.TOKEN + this.OPTION + `&language=fr-FR&page=1&include_adult=false` + `&query=` + value
    );
  }
}
