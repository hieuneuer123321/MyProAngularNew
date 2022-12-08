import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { ApiservicesService } from 'src/app/services/api.service';
import data from './pass-group.language';
import { Location } from '@angular/common';
import { TaskListResponseModel } from 'src/app/Model/TaskModels';
import { TaskCategoryResponse } from 'src/app/Model/TaskCategory';
@Component({
  selector: 'app-pass-group',
  templateUrl: './pass-group.component.html',
  styleUrls: ['./pass-group.component.css']
})
export class PassGroupComponent implements OnInit {

  ListToAdd = []
  spinnerLoading = false;
  passGroupData: Array<TaskListResponseModel>
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

  config: object = {
    id: "paging",
    itemsPerPage: this.pageSize,
    currentPage: this.page,
    totalItems: 0
  }
  constructor(private httpClient: HttpClient, private api: ApiservicesService, public generalService: GeneralService, private router: Router, private _location: Location) { }

  ngOnInit(): void {
    this.gCategory();
    this.gData();
  }
  async gCategory() {
    var res = await this.api.httpCall(this.api.apiLists.GetAllTasksCategoryByUserId, {}, {}, 'get', true)
    this.categoryData = <Array<TaskCategoryResponse>>res;
    if (this.categoryData.length >= 1) {
      this.currentCategory = { ...this.categoryData[0] };
    }
  }
  async gData() {
    this.spinnerLoading = true
    const headers = { 'Authorization': `Bearer ${this.generalService.userData.token}` }
    this.httpClient.get(this.generalService.appConfig.API_BASE_URL + this.api.apiLists.GetAllTasksNotInAnyCategory, { headers }).subscribe(res => {
      this.passGroupData = <Array<TaskListResponseModel>>res
      this.config = {
        id: "paging",
        itemsPerPage: this.pageSize,
        currentPage: this.page,
        totalItems: this.passGroupData.length
      }
      this.spinnerLoading = false;
    });
    //this.api.httpCall(this.api.apiLists.GetAllTasksNotInAnyCategory, { headers }, {}, 'get', true); not work idk why
  }
  async addTasksToCategory() {
    var res = await this.api.httpCall(this.api.apiLists.AddTasksToCategory + `?categoryId=${this.currentCategory.idnhomCv}`, {}, this.ListToAdd, 'post', true);
    var result = <any>res
    this.generalService.showErrorToast(result.status ? 1 : 0, result.message);
    this.gData();
  }
  changeCategory(item) {
    this.currentCategory = { ...item }
  }
  handlePageChange(event): void {
    this.page = event;
    this.config = {
      id: "paging",
      itemsPerPage: this.pageSize,
      currentPage: this.page,
      totalItems: this.passGroupData.length
    }
    //this.gData();
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
      totalItems: this.passGroupData.length
    }
    //this.gData();
  }
  getLabel(key) {
    return data[`${this.generalService.currentLanguage.Code}`][`${key}`]
  }
  goBack() {
    this._location.back();
  }
}
