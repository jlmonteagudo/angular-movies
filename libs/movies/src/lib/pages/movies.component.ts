import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from '../services/movies.service';
import { Observable } from 'rxjs';
import { Movie } from '../interfaces/movie.interface';
import { StarRatingModule } from 'angular-star-rating';

@Component({
  selector: 'movies-workspace-movies',
  standalone: true,
  imports: [CommonModule, StarRatingModule],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviesComponent {
  movies$: Observable<Movie[]> = this.moviesService.find();
  constructor(private moviesService: MoviesService) {}
}
