import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-compound',
  templateUrl: './compound.component.html',
  styleUrls: ['./compound.component.css']
})
export class CompoundComponent implements OnInit {

  @Input() compound: any = null;

  ngOnInit(): void {
  }
  isNumber(character: any): boolean {
    if (character.charCodeAt(0) >= 50 && character.charCodeAt(0) <= 57) {
      return true;
    } else {
      return false;
    }
  }

}
