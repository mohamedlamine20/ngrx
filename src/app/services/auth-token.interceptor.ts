import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, exhaustMap, map, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { getToken } from '../auth/state/auth.selector';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor(private store:Store<AppState>) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

   return this.store.select(getToken).pipe(
    take(1),
    exhaustMap((token) => {    
      if (!token) {
        return next.handle(request);
      }
      let modified = request.clone({
        headers:request.headers.append('Authorization','Bearer '+token)
      });
      return next.handle(modified);
    }));
  }
}
