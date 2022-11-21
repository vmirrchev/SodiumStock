import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: '',
      password: ''
    });
  }
  submit(): void {
    this.auth.login(this.form.getRawValue())
    .subscribe( () => { 
       if(localStorage.getItem('isLoggedIn') && localStorage.getItem('isLoggedIn') == "true") {
        this.router.navigate(['/home']);
       } else {
        alert("There is no user with these credentials. Please try again.");
       }
    });
  }
}
