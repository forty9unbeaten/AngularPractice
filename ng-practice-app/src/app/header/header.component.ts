import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public dataLoading = false;
  public dataError = null;
  private authSubscription: Subscription;
  public isAuthenticated = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.authService.autoLogin();
    
    this.authSubscription = this.authService.user.subscribe(
      (user: User) => {
        if (user) {
          this.isAuthenticated = true;
        } else {
          this.isAuthenticated = false;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  public onAuthLinkClick = (): void => {
    if (this.isAuthenticated) {
      this.authService.logout();
    } else {
      this.router.navigate(['/auth'])
    }
  }
}
