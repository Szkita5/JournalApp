import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Resource } from '../app/journal/models/resource.model';

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
    return this.get<Resource[]>('resources/', `http://localhost:8000/api/resources/`);
  }

  public getResource(id: number) {
    return this.get<Resource>('resources/', `http://localhost:8000/api/resources/${id}/`);
  }

  public postResource(resource: Resource) {
    console.log('posting', resource);
    return this.post<Resource>('resources/', `http://localhost:8000/api/resources/`, resource);
  }

  public deleteResource(id: number) {
    return this.delete('resources/', `http://localhost:8000/api/resources/${id}/`);
  }


  // ========================================================================
  // Support routines
  // ========================================================================

  private get<T>(api: string, uri: string, queryParams: any = null): Observable<T> {
    const params = this.setupParams(queryParams);
    const headers = this.baseHeaders;
    const formattedUri = uri + '?format=json';

    return this.http.get<T>(formattedUri, {headers, params}).pipe(
      catchError(err => this.handleError<T>(api, err))
    );
  }

  private delete(api: string, uri: string, queryParams: any = null): Observable<any> {
    const params = this.setupParams(queryParams);
    const headers = this.baseHeaders;

    return this.http.delete(uri, {headers, params}).pipe(
      catchError(err => this.handleError(api, err))
    );
  }

  private post<T>(api: string, uri: string, body: T, queryParams: any = null): Observable<T> {
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
