import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
