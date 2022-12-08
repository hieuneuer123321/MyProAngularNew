import { Component, OnInit } from '@angular/core';
import { TaskListResponseModel } from 'src/app/Model/TaskModels';
import { TaskProjectModels } from 'src/app/Model/TasksProjectModels';
import { ApiservicesService } from 'src/app/services/api.service';
import { GeneralService } from 'src/app/services/general.service';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
@Component({
  selector: 'app-pass-project',
  templateUrl: './pass-project.component.html',
  styleUrls: ['./pass-project.component.css']
})
export class PassProjectComponent implements OnInit {

  constructor(private api: ApiservicesService, private generalService: GeneralService, private httpClient: HttpClient, private _location: Location) { }
  TaskList: Array<TaskListResponseModel> = []
  ProjectList: Array<TaskProjectModels> = []
  CurrentProject: TaskProjectModels = {
    msda: null,
    ngayBatDau: '',
    ngayKetThuc: '',
    stt: 0,
    tenDuAn: 'Không có dự án nào',
    tinhTrang: 0
  }
  ListToAdd: Array<string> = []
  spinnerLoading: boolean = false
  page = 0;
  pageSize = 10;
  pageSizes = [10, 20, 30];
  config: object = {
    id: "paging",
    itemsPerPage: this.pageSize,
    currentPage: this.page,
    totalItems: 0
  }
  ngOnInit(): void {
    this.gProject();
    this.gData();
  }
  async gData() {
    this.spinnerLoading = true
    const headers = { 'Authorization': `Bearer ${this.generalService.userData.token}` }
    var baseURL = this.generalService.appConfig.API_BASE_URL
    this.httpClient.get(`${baseURL}${this.api.apiLists.GetAllTasksNotInAnyProject}`, { headers }).subscribe(res => {
      this.TaskList = <Array<TaskListResponseModel>>res
      this.config = {
        id: "paging",
        itemsPerPage: this.pageSize,
        currentPage: this.page,
        totalItems: this.TaskList.length
      }
      console.log(res)
      this.spinnerLoading = false;
    });
  }
  async gProject() {
    var res = await this.api.httpCall(this.api.apiLists.GetAllTasksProject + `?isPaging=${false}&pageNumber=${this.page}&pageSize=${this.pageSize}`, {}, {}, 'get', true)
    this.ProjectList = <Array<TaskProjectModels>>res
    if (this.ProjectList.length > 0) {
      this.CurrentProject = { ...this.ProjectList[0] };
    }
  }
  async addTaskToProject() {
    var res = await this.api.httpCall(this.api.apiLists.AddTasksToProject + `?msda=${this.CurrentProject.msda}`, {}, this.ListToAdd, 'post', true)
    var result = <any>res
    this.generalService.showErrorToast(result.status ? 1 : 0, result.message);
    this.gData();
    this.gProject();
  }
  changeProject(item) {
    this.CurrentProject = { ...item }
  }
  goBack() {
    this._location.back();
  }
  addlist(id, x) {
    if (x.target.checked) {
      this.ListToAdd.push(id)
    } else {
      this.ListToAdd = this.ListToAdd.filter((e) => {
        e !== id
      })
    }
  }
  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 0;
    this.config = {
      id: "paging",
      itemsPerPage: this.pageSize,
      currentPage: this.page,
      totalItems: this.TaskList.length
    }
    //this.gData();
  }
  handlePageChange(event): void {
    this.page = event;
    this.config = {
      id: "paging",
      itemsPerPage: this.pageSize,
      currentPage: this.page,
      totalItems: this.TaskList.length
    }
    //this.gData();
  }
}
