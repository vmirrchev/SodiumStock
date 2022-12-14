import { Injectable } from '@angular/core';
import { Entry } from './entry';
import { Chart } from 'chart.js/auto';
import { EntryService } from './entry.service';

@Injectable({
  providedIn: 'root',
})
export class ChartService {

  constructor(private entryService : EntryService) { }

  mapStatus(data: Entry[]): Map<string, number> {
    let map = new Map();
    let expiringCompounds: number = 0;
    let expiredCompounds: number = 0;
    let validCompounds: number = 0;

    data.forEach(entry => {
      switch (this.entryService.checkStatus(entry.expirationDate)) {
        case "VALID": validCompounds += 1;
          break;
        case "EXPIRING": expiringCompounds += 1;
          break;
        case "EXPIRED": expiredCompounds += 1;
          break;
      }
    })
    map.set('VALID', validCompounds);
    map.set('EXPIRING', expiringCompounds);
    map.set('EXPIRED', expiredCompounds);
    return map;
  }
  renderChart(repsonse: Entry[], chart: any): void {
    let data = this.mapStatus(repsonse);
    chart = new Chart("entriesChart",
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
              data.get('EXPIRED'),
              data.get('VALID'),
              data.get('EXPIRING')],
            backgroundColor: [
              '#F63E02',
              '#63AC4A',
              '#E57C04'
            ],
            hoverOffset: 4
          }]
        }
      })
  }
}
