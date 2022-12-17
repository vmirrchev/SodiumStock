import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeResponse } from '../employee';
import { EmployeeService } from '../employee.service';
import { MessageResponse } from '../messageResponse';
import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  public isFetching: boolean = false;
  public renderMessage: boolean = false;
  public renderError: boolean = false;
  public error?: string;

  constructor(
    private employeeService: EmployeeService,
    public dialog: MatDialog) { }


  ngOnInit(): void {
    this.getEmployees();
  }
  getEmployees(): void {
    this.isFetching = true;
    this.employeeService.getAll().subscribe({
      next: (data: Employee[]) => {
        if(data.length > 0) {
          this.employees = data;
        } else {
          this.renderMessage = true;
        }
        this.isFetching = false;
      },
      error: (error: HttpErrorResponse) => 
      {
        this.isFetching = false;
        this.renderError = true;
        this.error = error.error.message;
      }
    })
  }
  removeEmployee(id: number): void {
    this.employeeService.removeById(id)
      .subscribe({
        next: (message: MessageResponse) => { this.getEmployees() },
        error: (error: any) => { alert("Error deleting employee: " + error.message) }
      })
  }
  openDialog(){
    this.dialog.open(EmployeeDialogComponent, {
      width: '450px',
    }).
    afterClosed().
    subscribe(() => this.getEmployees())
  }
}
