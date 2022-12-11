import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Entry, EntryRequest } from './entry';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MessageResponse } from './messageResponse';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private apiUrl: string = environment.apiURL;
  private _getEntriesUrl: string = this.apiUrl + '/api/auth/entry/getAll';
  private _createEntriesUrl: string = this.apiUrl + '/api/auth/entry/create';
  private _deleteEmployeeByUsernameUrl: string = this.apiUrl + '/api/auth/entry/delete?id=';

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
  createEntry(entryRequest: EntryRequest):  Observable<MessageResponse> {
    return this.http.post<MessageResponse>(this._createEntriesUrl, entryRequest, { withCredentials: true, 'headers': this.headers });
  }
  removeById(id: Number): Observable<MessageResponse> {
      return this.http.delete<MessageResponse>(this._deleteEmployeeByUsernameUrl + id, { withCredentials: true, 'headers': this.headers });
    }
}
