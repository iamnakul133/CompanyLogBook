import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public details: any ={};
  constructor(private _DashboardService: DashboardService) { }
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        display: true,
        ticks: {
          beginAtZero: true,
          steps: 1,
          stepValue: 1,
          max: 3.5
        }
      }]
    },
  };
  public barChartLabels = ['Quality', 'Maintenance', 'HR',  'Strategy', 'Stores', 'Finance'];
  public barChartType = 'bar';
  public barChartLegend = true;
  ngOnInit(): void {
    this._DashboardService.dashboard().subscribe(data=> this.details=data);
    console.log(this.details);
  }



}
