import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginResponse } from '../login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  noSuchUser: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });
  }
  submit(): void {
    this.auth.login(this.form.getRawValue())
      .subscribe({
        next: (response: LoginResponse) => {
          localStorage.setItem('username', response.username);
          localStorage.setItem('id', response.id.toString());
          localStorage.setItem('role', response.roles[0]);
          localStorage.setItem('token', response.token);
          localStorage.setItem('isLoggedIn', 'true');
          this.router.navigate(['/home']);
        },
        error: (error: any) => {this.noSuchUser = true;
        this.form.reset()}
      });
  }
}
