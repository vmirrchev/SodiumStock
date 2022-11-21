import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompoundService {

  private _getCompoundsUrl = 'http://localhost:8081/api/auth/compound/getAll';

  constructor(private http: HttpClient) { }

  headers = new HttpHeaders()
    .append('Authorization','Bearer ' + localStorage.getItem('token'));

  getAll() {
    return this.http.get(this._getCompoundsUrl, {withCredentials: true, 'headers': this.headers})
  }
}
