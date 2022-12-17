import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Compound } from '../compound';
import { CompoundService } from '../compound.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  compounds?: Compound[];
  selectedCompound?: Compound;
  public isFetching: boolean = false;
  public renderMessage: boolean = false;
  public renderError: boolean = false;
  public error?: string;

  constructor(private componentService: CompoundService) { }

  ngOnInit(): void {
    this.getCompounds();
  }
  getCompounds() {
    this.isFetching = true;
    this.componentService.getAll().subscribe({
      next: (data: Compound[]) => {
        if(data.length > 0) {
          this.compounds = data;
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
}
