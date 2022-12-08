import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from 'src/app/services/general.service';
import { ApiservicesService } from 'src/app/services/api.service';
import data from './project.language';
import { TaskListResponseModel } from 'src/app/Model/TaskModels';
import { TaskProjectModels } from 'src/app/Model/TasksProjectModels';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  editable = true;
  deleteList = [];
  spinnerLoading = false;
  projectData: Array<TaskProjectModels> = []
  taskByProjectData: Array<TaskListResponseModel> = []
  currentProject: TaskProjectModels = {
    msda: null,
    ngayBatDau: null,
    ngayKetThuc: null,
    stt: 0,
    tenDuAn: "Không có dự án nào",
    tinhTrang: 0
  }
  page = 0;
  pageSize = 10;
  pageSizes = [10, 20, 30];
  config: object = {
    id: "paging",
    itemsPerPage: this.pageSize,
    currentPage: this.page,
    totalItems: 0
  }
  constructor(private httpClient: HttpClient, private api: ApiservicesService, public generalService: GeneralService, private router: Router) { }

  ngOnInit(): void {
    this.gProject();
  }
  async gData() {
    this.spinnerLoading = true
    const headers = { 'Authorization': `Bearer ${this.generalService.userData.token}` }
    var baseURL = this.generalService.appConfig.API_BASE_URL
    this.httpClient.get(`${baseURL}/api/Tasks/GetAllTasksByProjectId?projectId=${this.currentProject.msda}`, { headers }).subscribe(res => {
      this.spinnerLoading = false;
      this.taskByProjectData = <Array<TaskListResponseModel>>res
      this.config = {
        id: "paging",
        itemsPerPage: this.pageSize,
        currentPage: this.page,
        totalItems: this.taskByProjectData.length
      }
    });
    //var res = await this.api.httpCall(this.api.apiLists.GetAllTasksByProjectId + `?projectId=${this.currentProject.msda}`, {}, {}, 'get', true);
  }
  async gProject() {
    var res = await this.api.httpCall(this.api.apiLists.GetAllTasksProject + `?isPaging=${false}&pageNumber=${this.page}&pageSize=${this.pageSize}`, {}, {}, 'get', true)
    this.projectData = <Array<TaskProjectModels>>res
    if (this.projectData.length > 0) {
      this.currentProject = { ...this.projectData[0] };
    }
    this.gData();
  }
  changeProject(item) {
    this.currentProject = { ...item };
    this.gData();
  }
  handlePageChange(event): void {
    this.page = event;
    this.gData();
  }
  addlist(id, x) {
    if (x.target.checked) {
      this.deleteList.push(id)
    } else {
      this.deleteList = this.deleteList.filter((e) => {
        e !== id
      })
    }
  }
  async RemoveTasksFromProject() {
    const headers = { 'Authorization': `Bearer ${this.generalService.userData.token}` }
    var baseURL = this.generalService.appConfig.API_BASE_URL
    this.httpClient.post(baseURL + `/api/Tasks/RemoveTasksFromProject?msda=` + this.currentProject.msda, this.deleteList, { headers }).subscribe(res => {
      var result = <any>res
      this.generalService.showErrorToast(result.status ? 1 : 0, result.message)
      this.gData();
    })
  }
  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 0;
    this.gData();
  }
  getLabel(key) {
    return data[`${this.generalService.currentLanguage.Code}`][`${key}`]
  }

}
