import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { ChartConfiguration, ChartData, ChartEvent, ChartType, LineController } from 'chart.js';
import { Options } from 'selenium-webdriver';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit {

  constructor(public generalServ: GeneralService) { }
  dateSelectedEvents
  getEvents(a) {
    this.dateSelectedEvents = a
  }
  events = []

  ngOnInit(): void {
  }
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: ['Đã hoàn thành', 'Chưa hoàn thành', 'Đợi kiểm duyệt','Đã kết thúc'],
    datasets: [
      { data: [450,100,50,300] }
    ]
  };
  public doughnutChartDuLieu: ChartData<'doughnut'> = {
    labels: ['Còn hạn','Gần hạn','Quá hạn','Kết thúc'],
    datasets: [
      { data: [10,5,2,0] }
    ]
  };
  public doughnutChartThongTin: ChartData<'doughnut'> = {
    labels: ['Còn hạn','Gần hạn','Quá hạn','Kết thúc'],
    datasets: [
      { data: [0,0,0,0] }
    ]
  };
  public doughnutChartVanBan: ChartData<'doughnut'> = {
    labels: ['Văn đi','Văn bản đến','Văn bản nội bộ'],
    datasets: [
      { data: [15,50,30] }
    ]
  };
  public barChartType:ChartType ='bar'
  public doughnutChartType: ChartType = 'doughnut';
  public ChartConfig: ChartConfiguration['options']={
    elements:{
      line:{
        tension:0.4
      }
    },
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: { display: true },
    }
  }


  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }
  
}
