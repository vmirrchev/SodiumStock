import { Component, OnInit } from '@angular/core';
import { EntryService } from '../entry.service';
import { Entry } from '../entry';
import { MessageResponse } from '../messageResponse';
import { MatDialog } from '@angular/material/dialog';
import { EntryDialogComponent } from '../entry-dialog/entry-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  public entries: Entry[] = [];
  public isFetching: boolean = false;
  public renderMessage: boolean = false;
  public renderError: boolean = false;
  public error?: string;

  constructor(public entryService: EntryService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getEntries();
  }
  getEntries(): void {
    this.isFetching = true;
    this.entryService.getAll().subscribe({
      next: (data: Entry[]) => {
        if(data.length > 0) {
          this.entries = data;
        } else {
          this.renderMessage = true;
        }
        this.isFetching = false;
      },
      error: (error: HttpErrorResponse) => 
      {
        this.isFetching = false;
        this.renderError = true;
        this.error = error.error.message;
      }
    })
  }
  removeEntry(id: number): void {
    this.entryService.removeById(id)
      .subscribe({
        next: (message: MessageResponse) => { this.getEntries() },
        error: (error: any) => { alert("Error deleting entry: " + error.message) }
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
