import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { ApiservicesService } from 'src/app/services/api.service';
import data from './project-group.language';
import { TaskListResponseModel } from 'src/app/Model/TaskModels';
import { TaskCategoryResponse } from 'src/app/Model/TaskCategory';
@Component({
  selector: 'app-project-group',
  templateUrl: './project-group.component.html',
  styleUrls: ['./project-group.component.css']
})
export class ProjectGroupComponent implements OnInit {
  deleteList = []
  spinnerLoading = false;
  projectGroupData: Array<TaskListResponseModel> = []
  categoryData: Array<TaskCategoryResponse> = []
  currentCategory: TaskCategoryResponse = {
    idnhomCv: null,
    iduser: null,
    stt: null,
    tenNhomCv: 'Không có công việc nào'
  }
  page = 0;
  pageSize = 10;
  pageSizes = [10, 20, 30];
  count = 500;

  config: object = {
    id: "paging",
    itemsPerPage: 1,
    currentPage: 1,
    totalItems: 0
  }
  constructor(private httpClient: HttpClient, public generalService: GeneralService, private router: Router, private api: ApiservicesService) { }

  ngOnInit(): void {
    this.gCategory();
  }

  async gData() {
    this.spinnerLoading = true;
    var res = await this.api.httpCall(this.api.apiLists.GetAllTasksByCategory + `?categoryid=${this.currentCategory.idnhomCv}`, {}, {}, 'get', true);
    this.projectGroupData = <Array<TaskListResponseModel>>res;
    this.config = {
      id: 'paging',
      itemsPerPage: this.pageSize,
      currentPage: this.page,
      totalItems: this.projectGroupData.length
    }
    this.spinnerLoading = false;
  }
  async removeTaskListFromCategory() {
    var res = await this.api.httpCall(
      this.api.apiLists.RemoveListOfTasksFromCategory + `?categoryId=${this.currentCategory.idnhomCv}`,
      {}, this.deleteList, 'post', true);
    var result = <any>res;
    this.generalService.showErrorToast(result.status ? 1 : 0, result.message);
    this.gData();
  }
  async gCategory() {
    var res = await this.api.httpCall(this.api.apiLists.GetAllTasksCategoryByUserId, {}, {}, 'get', true)
    this.categoryData = <Array<TaskCategoryResponse>>res;
    if (this.categoryData.length >= 1) {
      this.currentCategory = { ...this.categoryData[0] };
      this.gData();
    }
  }
  async changeCategory(item) {
    this.currentCategory = { ...item }
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
  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 0;
    this.gData();
  }
  getLabel(key) {
    return data[`${this.generalService.currentLanguage.Code}`][`${key}`]
  }

}
