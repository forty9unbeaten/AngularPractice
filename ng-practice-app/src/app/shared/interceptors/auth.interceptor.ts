import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { take, map, exhaustMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AuthService } from '@services/auth.service';
import { User } from '@models/user.model';
import { AppState } from '@app/app.state';
import * as fromAuth from '@auth/state';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(
      take(1),
      exhaustMap((authState: fromAuth.AuthState) => {
        if (authState.user) {
          const reqClone = request.clone({
            params: new HttpParams().set('auth', authState.user.token),
          });
          return next.handle(reqClone);
        }
        return next.handle(request);
      })
    );
  }
}
