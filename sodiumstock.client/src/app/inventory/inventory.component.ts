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
  public tableVisibility: string = 'hidden';
  public messageVisibility: string = 'hidden';

  constructor(public entryService: EntryService) { }

  ngOnInit(): void {
    this.entryService.getAll().subscribe({
      next: (data: Entry[]) => {
        if(data.length > 0) {
          this.entries = data;
          this.tableVisibility = 'visible';
        } else {
          this.messageVisibility = 'visible';
        }
      },
      error: (error: any) => alert("Error fetching data: " + error)
    })
  }
}
