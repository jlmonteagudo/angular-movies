import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  {
    path: 'movies',
    loadChildren: () =>
      import('@movies-workspace/movies').then((m) => m.moviesRoutes),
  },
];
