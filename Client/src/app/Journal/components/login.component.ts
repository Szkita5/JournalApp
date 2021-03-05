import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLoginForm, UserRegisterForm } from '../models/user.model';

@Component({
  template: `
    <journal-header></journal-header>
    <div class="login-form container">
      <h2 class="px-3 mb-0">Login</h2>
      <form class="modal-body mb-5" [formGroup]="loginForm" (ngSubmit)="onLoginSubmit()">
        <div class="row pb-2">
          <label class="col-sm-3 col-form-label">Username</label>
          <div class="col-sm-9">
            <input class="py-1 w-100" formControlName="username" type="text" placeholder="Name">
          </div>
        </div>
        <div class="row pb-2">
          <label class="col-sm-3 col-form-label">Password</label>
          <div class="col-sm-9">
            <input class="py-1 w-100" formControlName="password" type="password" placeholder="Password">
          </div>
        </div>
        <button class="btn btn-primary float-end login-button" type="submit" [disabled]="!loginForm.valid">Login</button>
      </form>
    </div>

    <div class="login-form container">
      <h2 class="px-3 mb-0">Register</h2>
      <form class="modal-body mb-5" [formGroup]="registerForm" (ngSubmit)="onRegisterSubmit()">
        <div class="row pb-2">
          <label class="col-sm-3 col-form-label">Username</label>
          <div class="col-sm-9">
            <input class="py-1 w-100" formControlName="username" type="text" placeholder="Name">
          </div>
        </div>
        <div class="row pb-2">
          <label class="col-sm-3 col-form-label">Email</label>
          <div class="col-sm-9">
            <input class="py-1 w-100" formControlName="email" type="email" placeholder="email@example.com">
          </div>
        </div>
        <div class="row pb-2">
          <label class="col-sm-3 col-form-label">Password</label>
          <div class="col-sm-9">
            <input class="py-1 w-100" formControlName="password" type="password" placeholder="Password">
          </div>
        </div>
        <div class="row pb-2">
          <label class="col-sm-3 col-form-label">Password</label>
          <div class="col-sm-9">
            <input class="py-1 w-100" formControlName="confirm_password" type="password" placeholder="Confirm password">
          </div>
        </div>
        <button class="btn btn-primary float-end" type="submit" [disabled]="!registerForm.valid">Register</button>
      </form>
    </div>
  `,
  styles: [`
    .login-form {
      max-width: 30rem;
      border: solid #0d6efd 2px;
      border-radius: 5px;
      margin-top: 2rem;
    }
    .login-button {
      width: 5rem;
    }
  `]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.maxLength(80)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(80)]),
    });

    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.maxLength(80)]),
      email: new FormControl('', [Validators.required, Validators.maxLength(80)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(80)]),
      confirm_password: new FormControl('', [Validators.required, Validators.maxLength(80)]),
    });
  }

  onLoginSubmit() {
    this.auth.login(<UserLoginForm>this.loginForm.value).subscribe(response => {
      console.log(response);
      if (response.user) {
        this.router.navigate(['/journal']);
      }
    });
  }

  onRegisterSubmit() {
    this.auth.register(<UserRegisterForm>this.registerForm.value).subscribe(response => {
      console.log(response);
      if (response.user) {
        this.router.navigate(['/journal']);
      }
    });
  }
}
