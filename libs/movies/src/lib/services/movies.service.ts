import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { Movie } from '../interfaces/movie.interface';
import { API_BASE_URL, API_BASE_IMAGE_URL } from '../tokens';
import {
  MoviesResponse,
  MoviesResultResponse,
} from '../interfaces/responses/movies.response';

@Injectable({ providedIn: 'root' })
export class MoviesService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);
  private readonly apiBaseImageUrl = inject(API_BASE_IMAGE_URL);

  find(): Observable<Movie[]> {
    const params = new HttpParams().appendAll({
      page: 1,
      sort_by: 'popularity.desc',
    });

    return this.httpClient
      .get<MoviesResponse>(`${this.apiBaseUrl}/movie/popular`, { params })
      .pipe(
        map((response: MoviesResponse) => response.results),
        map((results: MoviesResultResponse[]) =>
          results.map(this.transformResponse.bind(this))
        ),
        catchError(() => [])
      );
  }

  private transformResponse(movie: MoviesResultResponse): Movie {
    return {
      imageUrl: `${this.apiBaseImageUrl}${movie.poster_path}`,
      title: movie.title,
      voteAverage: movie.vote_average,
    };
  }
}
