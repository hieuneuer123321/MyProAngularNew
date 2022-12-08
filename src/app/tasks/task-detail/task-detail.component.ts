import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiservicesService } from 'src/app/services/api.service';
import { GeneralService } from 'src/app/services/general.service';
import data from './task-detail.language';
import * as moment from 'moment';
import { TaskDetailModel } from 'src/app/Model/TaskModels';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  spinnerLoading = false
  taskID
  taskDetail: TaskDetailModel
  constructor(private route: ActivatedRoute, private el: ElementRef, private api: ApiservicesService, public generalService: GeneralService, private router: Router) {
  }
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.taskID = params['taskid']
      this.getTaskDetail();
    });
  }
  getLabel(key) {
    return data[`${this.generalService.currentLanguage.Code}`][`${key}`]
  }
  async getTaskDetail(): Promise<void> {
    var res = await this.api.httpCall(this.api.apiLists.getTaskDetail + this.taskID, {}, {}, 'get', true)
    this.taskDetail = <TaskDetailModel>res;
    console.log(this.isAssigner());
  }
  async requestFinishTask() {
    var res = await this.api.httpCall(this.api.apiLists.RequestFinishATask + `?mscv=${this.taskID}`, {}, {}, 'post', true)
    this.getTaskDetail();
  }
  async finishATask() {
    var res = await this.api.httpCall(this.api.apiLists.FinishATask + `?mscv=${this.taskID}`, {}, {}, 'post', true)
    this.getTaskDetail();
  }
  isAssigner() {
    let check = false;
    this.taskDetail.danhSachNguoiXuLy.forEach(x => {
      if (x.userId === this.generalService.userData.userID) {
        check = true
      }
    })
    return check
  }
}
