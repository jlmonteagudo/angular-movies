import {
  HttpRequest,
  HttpEvent,
  HttpHeaders,
  HttpHandlerFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ACCESS_KEY } from '../tokens';

export const tokenInterceptor = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const token = inject(API_ACCESS_KEY);

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });

  request = request.clone({
    headers,
  });

  return next(request);
};
