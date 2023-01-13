import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiservicesService } from 'src/app/services/api.service';
import { GeneralService } from 'src/app/services/general.service';
import data from './task-detail.language';
import * as moment from 'moment';
import { TaskDetailModel } from 'src/app/Model/TaskModels';
import { FilesUploadComponent } from 'src/app/utilities/files-upload/files-upload.component';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  spinnerLoading = false
  taskID
  checkingType: string = "CHECKED"
  taskDetail: TaskDetailModel = new TaskDetailModel()
  isCreateBy: boolean = false
  isAssigner: boolean = false
  isMajorAssigner: boolean = false
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
  async getTaskDetail() {
    var res = await this.api.httpCall(this.api.apiLists.getTaskDetail + this.taskID, {}, {}, 'get', true)
    this.taskDetail = <TaskDetailModel>res;
    this.checkIsAssigner();
    this.checkIsCreateBy();
    this.checkIsMajorAssigner();
  }
  checkIsAssigner() {
    this.taskDetail.danhSachNguoiXuLy.forEach(x => {
      if (x.userId === this.generalService.userData.userID && x.userId !== this.taskDetail.nguoiChinh.userId) {
        this.isAssigner = true;
      }
    })
  }
  checkIsMajorAssigner() {
    this.isMajorAssigner = this.taskDetail.nguoiChinh.userId == this.generalService.userData.userID
  }
  checkIsCreateBy() {
    if (this.taskDetail.nguoiTao.userId === this.generalService.userData.userID) {
      this.isCreateBy = true;
    }
  }
  async requestFinishTask() {
    var res = await this.api.httpCall(this.api.apiLists.RequestFinishATask + `?mscv=${this.taskID}`, {}, {}, 'post', true)
    this.showMessage(res);
    this.getTaskDetail();
  }
  async finishATask() {
    var res = await this.api.httpCall(this.api.apiLists.FinishATask + `?mscv=${this.taskID}`, {}, {}, 'post', true)
    this.showMessage(res);
    this.getTaskDetail();
  }
  async follow() {
    var res = await this.api.httpCall(this.api.apiLists.FollowATask, {}, { id: this.taskID }, 'post', true);
    this.showMessage(res);
    this.getTaskDetail();
  }
  async unfollow() {
    var res = await this.api.httpCall(this.api.apiLists.UnfollowATask, {}, { id: this.taskID }, 'post', true);
    this.showMessage(res);
    this.getTaskDetail();
  }
  showMessage(res: any) {
    res.validationMessages.forEach(x => {
      this.generalService.showErrorToast(res.IsValid ? 0 : 1, x);
    });
  }
  async StopNotification() {
    var res = await this.api.httpCall(this.api.apiLists.StopNotification, {}, { id: this.taskID }, 'post', true);
    this.showMessage(res);
    this.getTaskDetail();
  }
  async EnableNotification() {
    var res = await this.api.httpCall(this.api.apiLists.EnableNotification, {}, { id: this.taskID }, 'post', true);
    this.showMessage(res);
    this.getTaskDetail();
  }
  DanhSach
  DanhSachDuocChon: Array<any> = []
  NguoiChinh: string = ""
  ManagerType: string = "PARTICIPANT"
  dualListUpdateForViewer(event) {
    this.DanhSachDuocChon = event.rightList;
  }
  async TaskUserManagerSaveChange() {
    const danhsach = this.DanhSachDuocChon.map(x => { return x.userId })
    if (this.ManagerType == "PARTICIPANT") {
      const res = await this.api.httpCall(this.api.apiLists.AssignNewListParticipantToTask + `?mscv=${this.taskID}`, {}, danhsach, "post", true)
      if (this.taskDetail.nguoiChinh.userId != this.NguoiChinh) {
        const res = await this.api.httpCall(this.api.apiLists.ChangeMajorAssignment, {}, {
          mscv: this.taskID,
          newMajorAssign: this.NguoiChinh
        }, 'post', true)
      }
      this.getTaskDetail();
      return;
    }
    var res = await this.api.httpCall(this.api.apiLists.AssignNewListViewerToTask + `?mscv=${this.taskID}`, {}, danhsach, "post", true)
    this.getTaskDetail();
  }
  TaskUserManager(type: string) {
    this.DanhSach = [...this.generalService.allUsers]
    this.ManagerType = type
    const danhsachthamgia = []
    const danhsachduocxem = []
    this.taskDetail.danhSachNguoiXuLy.forEach(nxl => {
      this.DanhSach.forEach((ds, i) => {
        if (ds.userId == nxl.userId) {
          danhsachthamgia.push(ds);
          this.DanhSach.splice(i, 1);
        }
      })
    })
    this.DanhSachDuocChon = danhsachthamgia;
    this.NguoiChinh = this.taskDetail.nguoiChinh.userId;
    this.taskDetail.danhSachNguoiDuocXem.forEach(nxl => {
      this.DanhSach.forEach((ds, i) => {
        if (ds.userId == nxl.userId) {
          danhsachduocxem.push(ds);
          this.DanhSach.splice(i, 1);
        }
      })
    })
    if (type == "VIEWER") {
      this.DanhSachDuocChon = danhsachduocxem;
    }
  }
  async TaskDelete() {
    const res = await this.api.httpCall(this.api.apiLists.DeleteTask, {}, { id: this.taskID }, 'post', true)
    this.router.navigateByUrl('/tasks/task-list')
    this.generalService.showErrorToast(1, "Xóa công việc thành công");
  }
}
