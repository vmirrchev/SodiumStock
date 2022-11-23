import { Component, OnInit } from '@angular/core';
import { EntryService } from '../entry.service';
import { Entry } from '../entry';
import { ChartService } from '../chart.service';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  public entriesChart: any;

  constructor(
    private entryService: EntryService,
    private chartService: ChartService
  ) { }

  ngOnInit(): void {
    this.entryService.getAll().subscribe({
      next: (data: Entry[]) => {
        data.length > 0 ?
        this.chartService.renderChart(this.chartService.mapStatus(data), this.entriesChart) :
        this.chartService.renderDummyChart(this.entriesChart);
      },
      error: (error: any) => alert("Error fetching data: " + error)
    })
  }
}
