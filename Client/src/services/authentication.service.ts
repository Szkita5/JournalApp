import { Injectable } from '@angular/core';
import { User, UserLoginForm, UserLoginResponse } from '../app/journal/models/user.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user: User;
  private readonly baseUrl = 'http://localhost:8000/';

  constructor(private http: HttpClient) {
    this.user = new User();
    this.loadCachedUser();
  }

  getCurrentUser(): User {
    return this.user;
  }

  public login(loginDetails: UserLoginForm): Observable<UserLoginResponse> {
    return this.sendLoginRequest(loginDetails).pipe(
      tap(response => {
        if (response.user) {
        console.log(response);
        this.user.id = response.user.id;
        this.user.username = response.user.username;
        this.user.token = response.token;

        this.saveUserToStorage(response);
        this.calculateTokenExpiry(response);
        return Promise.resolve();
        } else {
          return Promise.reject();
        }
      })
    );
  }

  public logout(): void {
    this.user = new User();
    this.removeUserFromStorage();
  }

  private saveUserToStorage(response): void {
    localStorage.setItem('userId', response.user.id);
    localStorage.setItem('username', response.user.username);
    localStorage.setItem('authToken', response.token);
  }

  private loadUserFromStorage(): void {
    this.user.id = localStorage.getItem('userId');
    this.user.username = localStorage.getItem('username');
    this.user.token = localStorage.getItem('authToken');
  }

  private removeUserFromStorage(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('authToken');
    localStorage.removeItem('authTokenExpiry');
  }

  private calculateTokenExpiry(response: any): void {
    let expiresIn = response.expires_in;
    const now = new Date();
    expiresIn = expiresIn.split('.')[0];
    const expiryDate = new Date(now.getTime() + Number(expiresIn) * 1000);
    console.log(expiryDate.toString());
    localStorage.setItem('authTokenExpiry', expiryDate.toString());
  }

  private sendLoginRequest(loginDetails: UserLoginForm): Observable<UserLoginResponse> {
    return this.http.post<UserLoginResponse>(this.baseUrl + 'auth/login/', loginDetails);
  }

  private loadCachedUser(): void {
    const tokenExpiry = localStorage.getItem('authTokenExpiry');
    if (tokenExpiry) {
      const expiryDate = new Date(tokenExpiry);
      if (expiryDate > new Date()) {
        this.loadUserFromStorage();
      }
    }
  }

  public getAuthToken(): string {
    if (this.user.token) {
      return this.user.token;
    } else {
      return '';
    }
  }
}
