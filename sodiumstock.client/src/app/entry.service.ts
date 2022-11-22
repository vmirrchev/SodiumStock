import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Entry } from './entry';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private _getEntriesUrl = 'http://localhost:8081/api/auth/entry/getAll';

  constructor(private http: HttpClient) { }

    headers = new HttpHeaders()
    .append('Authorization','Bearer ' + localStorage.getItem('token'));

  getAll(): Observable<Entry[]> {
    return this.http.get<Entry[]>(this._getEntriesUrl, {withCredentials: true, 'headers': this.headers})
  }
}
