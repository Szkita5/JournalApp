import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {Resource} from "../app/journal/models/resource.model";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly baseHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.baseHeaders = new HttpHeaders({
    });
  }

  public getResources() {
    return this.get<Resource>('heroes/', `http://localhost:8000/api/resources/`).subscribe(data => {
      console.log(data);
    });
  }

  public getHero(id: number) {
    return this.get<Resource>('heroes/', `http://localhost:8000/api/resources/${id}`).subscribe(data => {
      console.log(data);
    });
  }


  // ========================================================================
  // Support routines
  // ========================================================================

  private get<T>(api: string, uri: string, queryParams: any = null): Observable<T> {
    const params = this.setupParams(queryParams);
    const headers = this.baseHeaders;

    return this.http.get<T>(uri, {headers, params}).pipe(
      catchError(err => this.handleError<T>(api, err))
    );
  }

  private delete<T>(api: string, uri: string, queryParams: any = null): Observable<T> {
    const params = this.setupParams(queryParams);
    const headers = this.baseHeaders;

    return this.http.delete<T>(uri, {headers, params}).pipe(
      catchError(err => this.handleError<T>(api, err))
    );
  }

  private post<T>(api: string, uri: string, body: any, queryParams: any = null): Observable<T> {
    const params = this.setupParams(queryParams);
    const headers = this.baseHeaders;

    return this.http.post<T>(uri, body, {headers, params}).pipe(
      catchError(err => this.handleError<T>(api, err))
    );
  }

  private put<T>(api: string, uri: string, body: any, queryParams: any = null): Observable<T> {
    const params = this.setupParams(queryParams);
    const headers = this.baseHeaders;

    return this.http.put<T>(uri, body, {headers, params}).pipe(
      catchError(err => this.handleError<T>(api, err))
    );
  }


  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of<T>(result);
    };
  }

  private setupParams(queryParams: any): HttpParams {
    let params = new HttpParams();
    if (queryParams) {
      for (const key of Object.keys(queryParams)) {
        if (queryParams[key] !== undefined) {
          params = params.append(key, queryParams[key]);
        }
      }
    }
    return params;
  }
}
