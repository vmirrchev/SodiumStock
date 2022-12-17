import { Component, OnInit } from '@angular/core';
import { EntryService } from '../entry.service';
import { Entry } from '../entry';
import { ChartService } from '../chart.service';
import { Chart } from 'chart.js';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  public entriesChart?: Chart;
  public isFetching: boolean = false;
  public renderMessage: boolean = false;
  public renderError: boolean = false;
  public error?: string;

  constructor(
    private entryService: EntryService,
    private chartService: ChartService
  ) { }

  ngOnInit(): void {
    this.isFetching = true;
    this.entryService.getAll().subscribe({
      next: (data: Entry[]) => {
        if(data.length > 0) {
        this.chartService.renderChart(data, this.entriesChart)
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
