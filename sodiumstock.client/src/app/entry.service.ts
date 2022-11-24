import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Entry } from './entry';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private apiUrl: string = environment.apiURL;
  private _getEntriesUrl: string = this.apiUrl + '/api/auth/entry/getAll';

  constructor(private http: HttpClient) { }

  headers = new HttpHeaders()
    .append('Authorization', 'Bearer ' + localStorage.getItem('token'));

  getAll(): Observable<Entry[]> {
    return this.http.get<Entry[]>(this._getEntriesUrl, { withCredentials: true, 'headers': this.headers })
  }
  checkStatus(date: string): string {
    let dateToCheck = new Date(date)
    let today = new Date();
    let endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);
    if (dateToCheck < today) {
      return "EXPIRED";
    } else if (dateToCheck > endDate) {
      return "VALID";
    } else {
      return "EXPIRING";
    }
  }
}
