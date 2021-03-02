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

  public getResources(): Observable<Resource[]> {
    return this.get<Resource[]>('resources/', `http://localhost:8000/api/resources/`);
  }

  public getResource(id: number): Observable<Resource> {
    return this.get<Resource>('resources/', `http://localhost:8000/api/resources/${id}/`);
  }

  public searchResources(searchString: string): Observable<Resource[]> {
    return this.get<Resource[]>('resources/', `http://localhost:8000/api/resources/`, {search: searchString});
  }

  public addResource(resource: Resource): Observable<Resource> {
    return this.post<Resource>('resources/', `http://localhost:8000/api/resources/`, resource);
  }

  public deleteResource(id: number): Observable<any> {
    return this.delete('resources/', `http://localhost:8000/api/resources/${id}/`);
  }

  public updateResource(resource: Resource): Observable<Resource> {
    const id = resource.id;
    return this.put<Resource>('resources/', `http://localhost:8000/api/resources/${id}/`, resource);
  }


  // ========================================================================
  // Support routines
  // ========================================================================

  private get<T>(api: string, uri: string, queryParams: any = null): Observable<T> {
    const params = this.setupParams(queryParams);
    const headers = this.baseHeaders;
    const formattedUri = uri + '?format=json';

    return this.http.get<T>(formattedUri, {headers, params});
  }

  private delete(api: string, uri: string, queryParams: any = null): Observable<any> {
    const params = this.setupParams(queryParams);
    const headers = this.baseHeaders;

    return this.http.delete(uri, {headers, params});
  }

  private post<T>(api: string, uri: string, body: T, queryParams: any = null): Observable<T> {
    const params = this.setupParams(queryParams);
    const headers = this.baseHeaders;

    return this.http.post<T>(uri, body, {headers, params});
  }

  private put<T>(api: string, uri: string, body: any, queryParams: any = null): Observable<T> {
    const params = this.setupParams(queryParams);
    const headers = this.baseHeaders;

    return this.http.put<T>(uri, body, {headers, params});
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
