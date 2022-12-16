import { Component, OnInit } from '@angular/core';
import { CompoundService } from '../compound.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  compounds: any;
  selectedCompound: any;

  constructor(private componentService: CompoundService) { }

  ngOnInit(): void {
    this.getCompounds();
  }
  getCompounds() {
    this.componentService.getAll()
      .subscribe({
        next: res => {
          this.compounds = res;
        },
        error: () => alert("Error fetching compounds")
      })
  }
  isNumber(character: any): boolean {
    if (character.charCodeAt(0) >= 50 && character.charCodeAt(0) <= 57) {
      return true;
    } else {
      return false;
    }
  }
}
