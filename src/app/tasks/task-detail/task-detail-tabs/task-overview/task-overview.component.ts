import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChartData, ChartConfiguration, ChartType, ChartOptions } from 'chart.js';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { TaskDetailModel } from 'src/app/Model/TaskModels';
import { ApiservicesService } from 'src/app/services/api.service';
import { GeneralService } from 'src/app/services/general.service';
import { TaskHistoryRequestModel } from 'src/app/Model/TasksHistoryModels';
@Component({
  selector: 'app-task-overview',
  templateUrl: './task-overview.component.html',
  styleUrls: ['./task-overview.component.css', '../../task-detail.component.css']
})
export class TaskOverviewComponent implements OnInit {
  activityTypes = [
    { typeid: 'type1', typename: 'Type 1', typeColor: 'success', status: true },
    { typeid: 'type2', typename: 'Type 2', typeColor: 'danger', status: true },
    { typeid: 'type3', typename: 'Type 3', typeColor: 'primary', status: true },
    { typeid: 'type4', typename: 'Type 4', typeColor: 'warning', status: true },
  ]
  taskHistory = new TaskHistoryRequestModel();
  @Input() TaskDetail: TaskDetailModel
  @Output() reloadData = new EventEmitter();
  dateSelectedEvents
  getEvents(a) {
    this.dateSelectedEvents = a
  }
  editorConfig: AngularEditorConfig = {
    height: '150px',
    editable: true,
  }
  events = [{
    fulldate: '2022-10-10',
    items: [
      {
        title: 'Branding Logo',
        id: 'idk',
        author: 'Nguyen Hoai Thuong'
      },
      {
        title: 'Design main Dashboard',
        id: 'idk',
        author: 'Nguyen Hoai Thuong'
      },
    ]
  },
  {
    fulldate: '2022-10-29',
    items: [
      {
        title: 'User Module Testing',
        id: 'idk',
        author: 'Nguyen Hoai Thuong'
      },
    ]
  },
  {
    fulldate: '2022-10-30',
    items: [
      {
        title: 'To check User Management',
        id: 'idk',
        author: 'Nguyen Hoai Thuong'
      }, {
        title: 'To check User Management 1',
        id: 'idk',
        author: 'Nguyen Hoai Thuong'
      }, {
        title: 'To check User Management 2',
        id: 'idk',
        author: 'Nguyen Hoai Thuong'
      },
    ]
  }
  ]
  nextEvent = []
  public chartLabels: string[] = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
  public doughnutChartData: ChartConfiguration['data'] = {
    labels: this.chartLabels,
    datasets: [
      { data: [5, 9, 8, 1, 6, 5, 11], label: 'Quá hạn' },
      { data: [12, 19, 10, 11, 16, 5, 10], label: 'Kết thúc' },
    ]
  };
  public ChartConfig: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0
      }
    },
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {}
    },
    plugins: {
      legend: { display: true },
    }
  }
  public chartOption: ChartOptions = {
    color: 'red',
  }
  public chartType: ChartType = 'line';
  constructor(private api: ApiservicesService, private generalService: GeneralService) { }

  ngOnInit(): void {
    this.nextEvent = this.events.filter(x =>
      new Date(x.fulldate).getTime() >= new Date(new Date().toDateString()).getTime()
    )
  }
  async addAComment(): Promise<void> {
    if (this.taskHistory.noiDung !== "" && this.taskHistory.noiDung !== undefined) {
      this.taskHistory.mscv = this.TaskDetail.mscv;
      this.taskHistory.danhSachNguoiXuLyKeTiepHoTen = "";
      this.taskHistory.nguoiPhanHoi = this.generalService.userData.userID;
      this.taskHistory.thoiGian = new Date().toISOString();
      var res = await this.api.httpCall(this.api.apiLists.AddNewTaskHistory, {}, this.taskHistory, 'post', true);
      this.reloadData.emit();
    }
  }

}
