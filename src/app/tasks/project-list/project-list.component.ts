import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from 'src/app/services/general.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import data from './project-list.language';
import { TaskProjectModels } from 'src/app/Model/TasksProjectModels';
import { ApiservicesService } from 'src/app/services/api.service';
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projectData: Array<TaskProjectModels> = []
  projectEditData: TaskProjectModels = {
    msda: null,
    ngayBatDau: null,
    ngayKetThuc: null,
    stt: 0,
    tenDuAn: "Không có dự án nào",
    tinhTrang: 0
  }
  projectCreateData = {
    stt: 1,
    tenda: ""
  }
  numbers: Array<number> = []
  spinnerLoading = false;
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
    this.gData();
    this.gNumber();
  }
  async gData() {
    this.spinnerLoading = true
    var res = await this.api.httpCall(this.api.apiLists.GetAllTasksProject + `?isPaging=${false}&pageNumber=${this.page}&pageSize=${this.pageSize}`, {}, {}, 'get', true)
    this.projectData = <Array<TaskProjectModels>>res
    this.config = {
      id: "paging",
      itemsPerPage: this.pageSize,
      currentPage: this.page,
      totalItems: this.projectData.length
    }
    this.spinnerLoading = false
  }
  handlePageChange(event): void {
    this.page = event;
    this.gData();
  }
  projectEdit(item) {
    this.projectEditData = { ...item }
  }
  projectCancelEdit() {
    this.projectEditData.msda = null
  }
  async projectDelete(msda) {
    var res = await this.api.httpCall(this.api.apiLists.DeleteTasksProject + `?msda=${msda}`, {}, {}, 'post', true)
    var result = <any>res
    this.generalService.showErrorToast(result.status ? 1 : 0, result.message);
    this.gData();
  }
  async projectCreateNew() {
    var res = await this.api.httpCall(this.api.apiLists.CreateATasksProject +
      `?stt=${this.projectCreateData.stt}&tenda=${this.projectCreateData.tenda}`
      , {}, {}, 'post', true);
    var result = <any>res
    this.generalService.showErrorToast(result.status ? 1 : 0, result.message);
    this.gData();
  }
  async projectSaveEdit(item) {
    let d = {
      msda: this.projectEditData.msda,
      stt: this.projectEditData.stt,
      tenda: this.projectEditData.tenDuAn,
      tinhtrang: this.projectEditData.tinhTrang
    }
    var res = await this.api.httpCall(this.api.apiLists.UpdateTasksProject, {}, d, 'post', true);
    var result = <any>res
    this.generalService.showErrorToast(result.status ? 1 : 0, result.message);
    this.projectCancelEdit();
    this.gData();
  }
  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 0;
    this.gData();
  }
  goBack() {
    this._location.back();
  }
  getLabel(key) {
    return data[`${this.generalService.currentLanguage.Code}`][`${key}`]
  }
  gNumber() {
    for (let i = 1; i <= 100; i++) {
      this.numbers.push(i)
    }
  }

}
