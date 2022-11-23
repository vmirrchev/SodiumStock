import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginCredentials } from './LoginCredentials';
import { LoginResponse } from './loginResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = environment.apiURL;
  private _loginUrl = this.apiUrl + '/api/all/login';

  constructor(private http: HttpClient) { }

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this._loginUrl, credentials, {withCredentials: true})
  }
  logout(): void {
    localStorage.clear(); 
    }
}
