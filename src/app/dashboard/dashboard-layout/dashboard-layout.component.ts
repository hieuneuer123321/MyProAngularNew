import { Component, OnInit, ViewChild } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { ApiservicesService } from 'src/app/services/api.service';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { GroupListResponseModel } from 'src/app/Model/GroupModel';
import { TaskListResponseModel } from 'src/app/Model/TaskModels';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  constructor(public generalServ: GeneralService, private api: ApiservicesService) { }
  dateSelectedEvents
  getEvents(a) {
    this.dateSelectedEvents = a
  }
  events = []

  page = 0;
  pageSize = 5;
  config: object = {
    id: "paging",
    itemsPerPage: this.pageSize,
    currentPage: this.page,
    totalItems: 0
  }
  //TASK TOTAL BY GROUP :D
  SysGroup: Array<GroupListResponseModel> = []
  CurrentGroupId: string = ""
  TasksTotalsByGroupData: Array<{
    count: number,
    status: string,
    data: Array<TaskListResponseModel>
  }> = []
  public chartActiveIndex: number = 0
  public doughnutTaskTotalChart: ChartData<"doughnut"> = {
    labels: [],
    datasets: [{ data: [] }]
  }
  public doughnutTaskTotalChartOptions: ChartConfiguration['options'] = {
    responsive: false,
    plugins: {
      legend: {
        position: 'bottom'
      }
    },
    onHover: (e, a, c) => {
      document.querySelector("canvas.chart").setAttribute("idActive", a[0]?.index.toString());
    },
  }
  ngOnInit(): void {
    this.GetAllGroup();
  }
  GetIndex(e) {
    this.chartActiveIndex = parseInt(document.querySelector("canvas.chart").getAttribute("idActive"));
    this.config = {
      id: "paging",
      itemsPerPage: this.pageSize,
      currentPage: this.page,
      totalItems: this.TasksTotalsByGroupData[this.chartActiveIndex].data.length
    }
    console.log(e)
  }
  async GetTasksTotalsByGroup() {
    var res = await this.api.httpCall(this.api.apiLists.GetTasksTotalsByGroup + `?grId=${this.CurrentGroupId}`, {}, {}, 'get', true);
    this.TasksTotalsByGroupData = <any>res;
    this.config = {
      id: "paging",
      itemsPerPage: this.pageSize,
      currentPage: this.page,
      totalItems: this.TasksTotalsByGroupData[this.chartActiveIndex].data.length
    }
    this.doughnutTaskTotalChart.labels = []
    this.doughnutTaskTotalChart.datasets[0].data = []
    this.TasksTotalsByGroupData.forEach(x => {
      this.doughnutTaskTotalChart.labels.push(`${x.status}`);
      this.doughnutTaskTotalChart.datasets[0].data.push(x.count);
    })
    document.querySelector("canvas.chart").setAttribute("idActive", "0");
    this.chart.render();
  }
  async GetAllGroup() {
    var res = await this.api.httpCall(this.api.apiLists.GetAllGroups, {}, {}, 'get', true);
    var result = <any>res
    this.SysGroup = <Array<GroupListResponseModel>>result.data
    this.CurrentGroupId = this.SysGroup[0].groupId;
    this.GetTasksTotalsByGroup();
  }
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: ['Đã hoàn thành', 'Chưa hoàn thành', 'Đợi kiểm duyệt', 'Đã kết thúc'],
    datasets: [
      { data: [450, 100, 50, 300] }
    ]
  };
  public doughnutChartDuLieu: ChartData<'doughnut'> = {
    labels: ['Còn hạn', 'Gần hạn', 'Quá hạn', 'Kết thúc'],
    datasets: [
      { data: [10, 5, 2, 0] }
    ]
  };
  public doughnutChartThongTin: ChartData<'doughnut'> = {
    labels: ['Còn hạn', 'Gần hạn', 'Quá hạn', 'Kết thúc'],
    datasets: [
      { data: [0, 0, 0, 0] }
    ]
  };
  public doughnutChartVanBan: ChartData<'doughnut'> = {
    labels: ['Văn đi', 'Văn bản đến', 'Văn bản nội bộ'],
    datasets: [
      { data: [15, 50, 30] }
    ]
  };
  public barChartType: ChartType = 'bar'
  public doughnutChartType: ChartType = 'doughnut';
  public ChartConfig: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.4
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
  handlePageChange(event): void {
    this.config = {
      id: "paging",
      itemsPerPage: this.pageSize,
      currentPage: event,
      totalItems: 0
    }
  }
}
