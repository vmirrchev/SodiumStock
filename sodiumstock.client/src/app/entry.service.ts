import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private _getEntriesUrl = 'http://localhost:8081/api/auth/entry/getAll';

  constructor(private http: HttpClient) { }

    headers = new HttpHeaders()
    .append('Authorization','Bearer ' + localStorage.getItem('token'));

  getAll() {
    return this.http.get(this._getEntriesUrl, {withCredentials: true, 'headers': this.headers})
  }
}
