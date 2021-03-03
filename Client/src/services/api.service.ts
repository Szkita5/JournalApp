import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resource } from '../app/journal/models/resource.model';
import { UserLoginForm } from '../app/journal/models/user.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly baseUrl = 'http://localhost:8000/';

  constructor(private http: HttpClient, private auth: AuthenticationService) {
  }

  public getResources(): Observable<Resource[]> {
    return this.get<Resource[]>('resources/', `api/resources/`);
  }

  public getResource(id: number): Observable<Resource> {
    return this.get<Resource>('resources/', `api/resources/${id}/`);
  }

  public searchResources(searchString: string): Observable<Resource[]> {
    return this.get<Resource[]>('resources/', `api/resources/`, {search: searchString});
  }

  public addResource(resource: Resource): Observable<Resource> {
    return this.post<Resource>('resources/', `api/resources/`, resource);
  }

  public deleteResource(id: number): Observable<any> {
    return this.delete('resources/', `api/resources/${id}/`);
  }

  public updateResource(resource: Resource): Observable<Resource> {
    const id = resource.id;
    return this.put<Resource>('resources/', `api/resources/${id}/`, resource);
  }

  public login(loginDetails: UserLoginForm): Observable<any> {
    return this.post<UserLoginForm>('auth/login/', `auth/login/`, loginDetails);
  }


  // ========================================================================
  // Support routines
  // ========================================================================

  private get<T>(api: string, uri: string, queryParams: any = null): Observable<T> {
    const params = this.setupParams(queryParams);
    const headers = {'Authorization': 'Token ' + this.auth.getAuthToken()};
    const formattedUri = this.baseUrl + uri + '?format=json';

    return this.http.get<T>(formattedUri, {headers, params});
  }

  private delete(api: string, uri: string, queryParams: any = null): Observable<any> {
    const params = this.setupParams(queryParams);
    const headers = {'Authorization': 'Token ' + this.auth.getAuthToken()};
    const formattedUri = this.baseUrl + uri;

    return this.http.delete(formattedUri, {headers, params});
  }

  private post<T>(api: string, uri: string, body: T, queryParams: any = null): Observable<T> {
    const params = this.setupParams(queryParams);
    const headers = {'Authorization': 'Token ' + this.auth.getAuthToken()};
    const formattedUri = this.baseUrl + uri;

    return this.http.post<T>(formattedUri, body, {headers, params});
  }

  private put<T>(api: string, uri: string, body: any, queryParams: any = null): Observable<T> {
    const params = this.setupParams(queryParams);
    const headers = {'Authorization': 'Token ' + this.auth.getAuthToken()};
    const formattedUri = this.baseUrl + uri;

    return this.http.put<T>(formattedUri, body, {headers, params});
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
