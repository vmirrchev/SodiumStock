import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Compound } from './compound';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompoundService {

  private apiUrl: string = environment.apiURL;
  private _getCompoundsUrl = this.apiUrl + '/api/auth/compound/getAll';

  constructor(private http: HttpClient) { }

  headers = new HttpHeaders()
    .append('Authorization','Bearer ' + localStorage.getItem('token'));

  getAll(): Observable<Compound[]> {
    return this.http.get<Compound[]>(this._getCompoundsUrl, {withCredentials: true, 'headers': this.headers})
  }
}
