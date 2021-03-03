import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLoginForm } from '../models/user.model';

@Component({
  selector: 'app-login',
  template: `
    <journal-header></journal-header>
    <div class="login-form container-fluid d-flex">
      <form class="modal-body" [formGroup]="loginForm" (ngSubmit)="onSubmit()">
         <div class= "row pb-2">
          <label class="col-sm-3 col-form-label">Username</label>
          <div class="col-sm-9">
            <input class="py-1 w-100" formControlName="username" type="text" placeholder="Name">
          </div>
        </div>
        <div class= "row pb-2">
          <label class="col-sm-3 col-form-label">Password</label>
          <div class="col-sm-9">
            <input class="py-1 w-100" formControlName="password" type="password" placeholder="Password">
          </div>
        </div>
        <button class="btn btn-primary float-end" type="submit" [disabled]="!loginForm.valid">Login</button>
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
  `]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private auth: AuthenticationService, private router: Router) { }

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.maxLength(80)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(80)]),
    });
  }

  onSubmit() {
    this.auth.login(<UserLoginForm>this.loginForm.value).subscribe(response => {
      console.log(response);
      if (response.user) {
        this.router.navigate(['/journal']);
      }
    });
  }
}
