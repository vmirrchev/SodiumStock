import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeResponse } from '../employee';
import { EmployeeService } from '../employee.service';
import { MessageResponse } from '../messageResponse';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];

  constructor(
    private employeeService: EmployeeService,
    public dialog: MatDialog) { }


  ngOnInit(): void {
    this.getEmployees();
  }
  removeEmployee(id: number): void {
    this.employeeService.removeByUsername(id)
      .subscribe({
        next: (message: MessageResponse) => { this.getEmployees() },
        error: (error: any) => { alert("Error deleting employee: " + error.message) }
      })
  }
  getEmployees(): void {
    this.employeeService.getAll().subscribe({
      next: (employees: Employee[]) => { this.employees = employees },
      error: (error: any) => { alert("Error fetching employees: " + error.message) }
    })
  }
  openDialog(){
    this.dialog.open(EmployeeDialogComponent, {
      height: '400px',
      width: '600px',
    });
  }
}
