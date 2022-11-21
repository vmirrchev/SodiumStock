import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;
  private _loginUrl = 'http://localhost:8081/api/all/login';
  private data: any;

  constructor(private http: HttpClient) { }

  isAuthenticated() {
    return this.isLoggedIn;
  }

  login(loginCredentials: { username: string; password: string }): Observable<any> {
    this.http.post(this._loginUrl, loginCredentials, {withCredentials: true})
    .subscribe({
      next: res => {
        this.data = res;
        this.isLoggedIn = true;
        localStorage.setItem('isLoggedIn', this.isLoggedIn ? "true" : "false");
        localStorage.setItem('username', this.data.username);
        localStorage.setItem('role', this.data.roles[0]);
        localStorage.setItem('token', this.data.token);
      },
      error: err => this.isLoggedIn = false
    })
    return of(this.isLoggedIn).pipe(
      delay(1000),
      tap(val => { 
         console.log("Is User Authentication is successful: " + val); 
      })
    );
  }
  logout(): void {
    this.isLoggedIn = false;
    localStorage.clear(); 
    }
}
