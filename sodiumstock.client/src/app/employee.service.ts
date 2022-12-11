import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee, EmployeeResponse } from './employee';
import { MessageResponse } from './messageResponse';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl: string = environment.apiURL;
  private _getEmployeesUrl: string = this.apiUrl + '/api/auth/employee/getAll';
  private _createEmployeesUrl: string = this.apiUrl + '/api/auth/employee/create';
  private _deleteEmployeeByUsernameUrl: string = this.apiUrl + '/api/auth/employee/delete?id=';
  constructor(private http: HttpClient) { }

  headers = new HttpHeaders()
    .append('Authorization', 'Bearer ' + localStorage.getItem('token'));

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this._getEmployeesUrl, { withCredentials: true, 'headers': this.headers });
  }
  createEmployee(employee: Employee): Observable<EmployeeResponse> {
    return this.http.post<EmployeeResponse>(this._createEmployeesUrl, employee, { withCredentials: true, 'headers': this.headers });
  }
  removeById(id: number): Observable<MessageResponse> {
    return this.http.delete<MessageResponse>(this._deleteEmployeeByUsernameUrl + id, { withCredentials: true, 'headers': this.headers });
  }
}
