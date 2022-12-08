import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { StarRatingModule } from 'angular-star-rating';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { environment } from './environments/environment';
import {
  API_ACCESS_KEY,
  API_BASE_IMAGE_URL,
  API_BASE_URL,
  tokenInterceptor,
} from '@movies-workspace/movies';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    { provide: API_BASE_URL, useValue: environment.api_base_url },
    { provide: API_BASE_IMAGE_URL, useValue: environment.api_base_image_url },
    { provide: API_ACCESS_KEY, useValue: environment.api_access_key },
    importProvidersFrom(StarRatingModule.forRoot()),
  ],
}).catch((err) => console.error(err));
