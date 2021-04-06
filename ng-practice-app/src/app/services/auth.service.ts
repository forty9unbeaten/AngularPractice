import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, throwError, Subject } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';

import { firebaseAPIKey } from '../../environments/environment';
import { AuthResponse } from '../models/auth-response.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private signupURL: string = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseAPIKey}`;
  private loginURL: string = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseAPIKey}`;
  private tokenExpTimer: any;

  public user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) {}

  public signUpNewUser = (
    email: string,
    password: string
  ): Observable<AuthResponse> => {
    const requestBody = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    return this.http.post<AuthResponse>(this.signupURL, requestBody).pipe(
      catchError((err) => {
        if (!err.error || !err.error.error.message) {
          return throwError({
            type: 'general',
            message:
              'There was a problem registering your new account, try again',
          });
        }
        return this.handleSignUpErrors(err.error.error.message);
      }),
      tap((res: AuthResponse) => {
        this.handleAuthentication(
          res.email,
          res.localId,
          res.idToken,
          Number(res.expiresIn)
        );
      })
    );
  };

  public login = (
    email: string,
    password: string
  ): Observable<AuthResponse> => {
    const requestBody = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    return this.http.post<AuthResponse>(this.loginURL, requestBody).pipe(
      catchError((err) => {
        if (!err.error || !err.error.error.message) {
          return throwError({
            type: 'general',
            message: 'There was a problem logging in, try again',
          });
        }
        return this.handleLoginErrors(err.error.error.message);
      }),
      tap((res: AuthResponse) => {
        this.handleAuthentication(
          res.email,
          res.localId,
          res.idToken,
          Number(res.expiresIn)
        );
      })
    );
  };

  public autoLogin = (): void => {
    const userData: string = localStorage.getItem('userData');
    if (!userData) {
      return;
    }
    const { email, id, _token, _tokenExpDate } = JSON.parse(userData);
    const loadedUser = new User(email, id, _token, new Date(_tokenExpDate));
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expiration =
        new Date(_tokenExpDate).getTime() - new Date().getTime();
      this.autoLogout(expiration / 1000);
    }
  };

  public logout = (): void => {
    if (this.tokenExpTimer) {
      this.tokenExpTimer = null;
    }
    localStorage.removeItem('userData');
    this.user.next(null);
    this.router.navigate(['/auth']);
  };

  autoLogout = (time: number): void => {
    this.tokenExpTimer = setTimeout(() => {
      this.logout();
    }, time * 1000);
  };

  private handleSignUpErrors = (
    errorMessage: string
  ): Observable<{ type: string; message: string }> => {
    switch (errorMessage) {
      case 'EMAIL_EXISTS':
        return throwError({
          type: 'email',
          message: 'The email you entered is already registered',
        });
      case 'OPERATION_NOT_ALLOWED':
        return throwError({
          type: 'not-allowed',
          message:
            'Password sign-in has been disabled for now, try again later',
        });
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        return throwError({
          type: 'attempts',
          message: `Can't create a new account now, try again later`,
        });
      default:
        return throwError({
          type: 'general',
          message: 'There was a problem creating your account, try again',
        });
    }
  };

  private handleLoginErrors = (
    errorMessage: string
  ): Observable<{ type: string; message: string }> => {
    switch (errorMessage) {
      case 'EMAIL_NOT_FOUND' || 'INVALID_PASSWORD':
        return throwError({
          type: 'credentials',
          message: 'Invalid email/password',
        });
      case 'USER_DISABLED':
        return throwError({
          type: 'disabled',
          message: 'Account has been disabled, try again later',
        });
      default:
        return throwError({
          type: 'general',
          message: 'There was a problem signing in, try again',
        });
    }
  };

  private handleAuthentication = (
    email: string,
    firebaseId: string,
    token: string,
    expiration: number
  ): void => {
    const tokenExpire: Date = new Date(
      new Date().setSeconds(new Date().getSeconds() + expiration)
    );
    const authUser: User = new User(email, firebaseId, token, tokenExpire);
    localStorage.setItem('userData', JSON.stringify(authUser));
    this.user.next(authUser);
    this.autoLogout(expiration);
  };
}
