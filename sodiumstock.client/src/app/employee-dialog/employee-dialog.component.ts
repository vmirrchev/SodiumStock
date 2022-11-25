import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../employee.service';
import { MessageResponse } from '../messageResponse';

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.css']
})
export class EmployeeDialogComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private employeeService: EmployeeService,
    private formBuilder : FormBuilder,
    public dialogRef: MatDialogRef<EmployeeDialogComponent>
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10)]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      role: new FormControl('', [Validators.required]),
    });
  }
  submit(): void {
    this.employeeService.createEmployee(this.form.getRawValue())
    .subscribe({
      next: (messageResponse: MessageResponse) => {console.log(messageResponse.message)},
      error: (error: any) => {alert("Error creating employee: " + error)}
    })
  }

}
