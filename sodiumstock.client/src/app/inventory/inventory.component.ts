import { Component, OnInit } from '@angular/core';
import { EntryService } from '../entry.service';
import { Entry } from '../entry';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  public entries: Entry[] = [];

  constructor(private entryService: EntryService) { }

  ngOnInit(): void {
    this.getEntries();
    console.log(this.entries);
  }
  getEntries() {
    this.entryService.getAll()
    .subscribe(data => this.entries = data)
  }
  checkStatus(date: string): string {
    let dateToCheck = new Date(date)
    let today = new Date();
    let endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);
    if(dateToCheck < today){
      return "EXPIRED";
    } else if (dateToCheck > endDate) {
      return "VALID";
    } else {
      return "EXPIRING";
    }
  }
}
