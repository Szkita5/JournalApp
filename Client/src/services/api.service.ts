import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public getHeroes() {
    return this.http.get<any>('http://localhost:8000/heroes/', ).subscribe(data => {
      console.log(data);
    });
  }
}
