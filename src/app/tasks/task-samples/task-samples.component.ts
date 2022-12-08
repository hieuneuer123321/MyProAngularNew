import { Component, OnInit } from '@angular/core';
import { TaskSampleResponseModel } from 'src/app/Model/TaskSampleModel';
import { ApiservicesService } from 'src/app/services/api.service';
import { GeneralService } from 'src/app/services/general.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-task-samples',
  templateUrl: './task-samples.component.html',
  styleUrls: ['./task-samples.component.css']
})
export class TaskSamplesComponent implements OnInit {
  taskSampleData: Array<TaskSampleResponseModel>
  spinnerLoading = false
  page = 0;
  pageSize = 10;
  pageSizes = [10, 20, 30];
  config: object = {
    id: "paging",
    itemsPerPage: this.pageSize,
    currentPage: this.page,
    totalItems: 0
  }
  constructor(private _location: Location, private api: ApiservicesService, private generalService: GeneralService) { }

  ngOnInit(): void {
    this.gData();
  }
  async gData() {
    var res = await this.api.httpCall(this.api.apiLists.GetAllTasksSample, {}, {}, 'get', true);
    this.taskSampleData = <Array<TaskSampleResponseModel>>res
    this.config = {
      id: 'paging',
      itemsPerPage: this.pageSize,
      currentPage: this.page,
      totalItems: this.taskSampleData.length
    }
  }
}
