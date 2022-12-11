import { Component, OnInit } from '@angular/core';
import { EntryService } from '../entry.service';
import { Entry } from '../entry';
import { MessageResponse } from '../messageResponse';
import { MatDialog } from '@angular/material/dialog';
import { EntryDialogComponent } from '../entry-dialog/entry-dialog.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  public entries: Entry[] = [];
  public renderMessage: boolean = true;

  constructor(public entryService: EntryService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getEntries();
  }
  getEntries(): void {
    this.entryService.getAll().subscribe({
      next: (data: Entry[]) => {
        if(data.length > 0) {
          this.entries = data;
          this.renderMessage = false;
        }
      },
      error: (error: any) => alert("Error fetching data: " + error)
    })
  }
  removeEntry(id: number): void {
    this.entryService.removeById(id)
      .subscribe({
        next: (message: MessageResponse) => { this.getEntries() },
        error: (error: any) => { alert("Error deleting employee: " + error.message) }
      })
  }
  openDialog(){
    this.dialog.open(EntryDialogComponent, {
      width: '450px',
    }).
    afterClosed().
    subscribe(() => this.getEntries())
  }
}
