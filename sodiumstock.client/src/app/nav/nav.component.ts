import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  username: string = localStorage.getItem('username')!;

  constructor(
    private router: Router,
    private auth: AuthService) { }

  ngOnInit(): void {
  }
  logoutUser(){
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
