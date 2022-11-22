import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { EntryService } from '../entry.service';
import { InventoryComponent } from '../inventory/inventory.component';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  providers: [InventoryComponent]
})
export class StatisticsComponent implements OnInit {
  public entriesChart: any;

  constructor(private entryService: EntryService, private inventoryComponent: InventoryComponent) { }

  ngOnInit(): void {
    this.renderChart();
  }
  renderChart(): void {
    let expiringCompounds: number = 0;
    let expiredCompounds: number = 0;
    let validCompounds: number = 0;

    this.entryService.getAll()
      .subscribe(data => {
          data.forEach(entry => {
          switch (this.inventoryComponent.checkStatus(entry.expirationDate)) {
            case "VALID": validCompounds += 1;
              break;
            case "EXPIRING": expiringCompounds += 1;
              break;
            case "EXPIRED": expiredCompounds += 1;
              break;
          }
        })
        this.entriesChart = new Chart("entriesChart",
      {
        type: 'pie',
        data: {
          labels: [
            'EXPIRED',
            'VALID',
            'EXPIRING'
          ],
          datasets: [{
            label: 'Compounds in stock',
            data: [
              expiredCompounds,
              validCompounds,
              expiringCompounds],
            backgroundColor: [
              '#F63E02',
              '#63AC4A',
              '#E57C04'
            ],
            hoverOffset: 4
          }]
        }
      })
  });
  }
}
