import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '@app/app.state';
import * as fromAuth from '@auth/state';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public dataLoading = false;
  public dataError = null;
  private authSubscription: Subscription;
  public isAuthenticated = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.authService.autoLogin();
    this.authSubscription = this.store
      .select('auth')
      .subscribe((state: fromAuth.AuthState) => {
        if (state.user) {
          this.isAuthenticated = true;
        } else {
          this.isAuthenticated = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  public onAuthLinkClick = (): void => {
    if (this.isAuthenticated) {
      this.authService.logout();
    } else {
      this.router.navigate(['/auth']);
    }
  };
}
