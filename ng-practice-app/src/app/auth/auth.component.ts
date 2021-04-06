import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/auth-response.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  @ViewChild('authForm') authForm: NgForm;
  @ViewChild('emailField') emailField: ElementRef;
  public loginMode = true;
  public password: string = '';
  public passwordConfirm: string;
  public errorMessage: string;
  public loading = false;

  constructor(
    private currentRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.currentRoute.queryParams.subscribe((queryParams: Params) => {
      if (queryParams.mode === 'signup') {
        this.loginMode = false;
      } else {
        this.loginMode = true;
        this.router.navigate(['/auth'], { queryParams: { mode: 'login' } });
      }
    });
  }

  public switchModes = (): void => {
    if (this.loginMode) {
      this.router.navigate(['/auth'], { queryParams: { mode: 'signup' } });
    } else {
      this.router.navigate(['/auth'], { queryParams: { mode: 'login' } });
    }
  };

  public onFormSubmit = (): void => {
    if (!this.authForm.valid) {
      return;
    }
    console.log();

    this.errorMessage = null;
    this.loading = true;
    let authObservable: Observable<AuthResponse>;

    if (this.loginMode) {
      //login request
      authObservable = this.authService.login(
        this.authForm.value.email,
        this.authForm.value.password
      );
    } else {
      // sign up request
      authObservable = this.authService.signUpNewUser(
        this.authForm.value.email,
        this.authForm.value.password
      );
    }

    authObservable.subscribe(
      (res: AuthResponse) => {
        this.loading = false;
        this.router.navigate(['/recipes']);
      },
      (error: { type: string; message: string }) => {
        this.loading = false;
        this.errorMessage = error.message;
        if (error.type === 'email') {
          this.highlightBadEmail();
        } else {
          this.authForm.reset();
        }
      }
    );
  };

  private highlightBadEmail = (): void => {
    this.renderer.addClass(this.emailField.nativeElement, 'badEmail');
    this.authForm.controls.email.reset();
    this.emailField.nativeElement.focus();
    this.passwordConfirm = '';
    this.passwordConfirm = '';
  };

  public onAlertClose = (): void => {
    this.errorMessage = null;
  };
}
