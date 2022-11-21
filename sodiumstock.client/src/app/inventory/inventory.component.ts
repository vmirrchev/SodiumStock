import { Component, OnInit } from '@angular/core';
import { EntryService } from '../entry.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  entries: any;

  constructor(private entryService: EntryService) { }

  ngOnInit(): void {
    this.getEntries();
  }
  getEntries() {
    this.entryService.getAll()
    .subscribe({
      next: res => {
      this.entries = res;
      },
      error: () => alert("Error fetching entries")
      })
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
