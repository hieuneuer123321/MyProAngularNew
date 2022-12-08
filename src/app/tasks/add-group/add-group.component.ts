import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import data from './add-group.language';
import { ApiservicesService } from 'src/app/services/api.service';
import { Location } from '@angular/common';
import { TaskCategoryResponse } from 'src/app/Model/TaskCategory';
@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {
  spinnerLoading = false;
  categoryData: Array<TaskCategoryResponse>;
  numbers: Array<number> = []
  categoryEditData: TaskCategoryResponse = {
    idnhomCv: null,
    iduser: null,
    stt: 0,
    tenNhomCv: null
  }
  categoryNewData = {
    stt: 1,
    tenNhomCv: ""
  }
  page = 0;
  pageSize = 10;
  pageSizes = [10, 20, 30];
  config
  constructor(private httpClient: HttpClient, private api: ApiservicesService, public generalService: GeneralService, private router: Router, private _location: Location) { }

  ngOnInit(): void {
    this.gData();
    this.gNumber();
  }
  async gData() {
    this.spinnerLoading = true;
    var res = await this.api.httpCall(this.api.apiLists.GetAllTasksCategoryByUserId, {}, {}, 'get', true);
    this.categoryData = <Array<TaskCategoryResponse>>res
    this.config = {
      id: 'paging',
      itemsPerPage: this.pageSize,
      currentPage: this.page,
      totalItems: this.categoryData.length
    }
    this.spinnerLoading = false;
  }
  categoryEdit(item: TaskCategoryResponse) {
    this.categoryEditData = { ...item };
  }
  categoryCancelEdit() {
    this.categoryEditData.idnhomCv = null
  }
  async categorySaveEdit(item: TaskCategoryResponse) {
    var res = await this.api.httpCall(this.api.apiLists.UpdateTasksCategory, {}, this.categoryEditData, 'post', true);
    var result = <any>res
    if (!result.status) {
      this.generalService.showErrorToast(0, result.message);
      return;
    }
    this.gData();
    this.generalService.showErrorToast(1, result.message);
    this.categoryEditData.idnhomCv = null;
  }
  async categroyCreateNew() {
    var res = await this.api.httpCall(this.api.apiLists.CreateNewTasksCategory + `?stt=${this.categoryNewData.stt}&tennhom=${this.categoryNewData.tenNhomCv}`, {}, {}, 'post', true);
    var result = <any>res
    this.generalService.showErrorToast(result ? 1 : 0, result.message);
    this.gData();
  }
  async categroyDelete(id: string) {
    var res = await this.api.httpCall(this.api.apiLists.DeleteATasksCategory, {}, [id], 'post', true);
    var result = <any>res
    this.generalService.showErrorToast(result ? 1 : 0, result.message);
    this.gData();
  }
  handlePageChange(event): void {
    this.page = event;
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 0;
  }
  goBack() {
    this._location.back();
  }
  gNumber() {
    for (let i = 1; i <= 100; i++) {
      this.numbers.push(i)
    }
  }

  getLabel(key) {
    return data[`${this.generalService.currentLanguage.Code}`][`${key}`]
  }
}
