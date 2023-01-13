import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IAngularMyDpOptions } from 'angular-mydatepicker';
import { UserResponseModel } from 'src/app/Model/UserModels';
import { GeneralService } from 'src/app/services/general.service';
import { ApiservicesService } from 'src/app/services/api.service';
import { CategoryInTaskResponse, TaskCategoryResponse } from 'src/app/Model/TaskCategory';
import * as moment from 'moment';
@Component({
  selector: 'app-task-setting',
  templateUrl: './task-setting.component.html',
  styleUrls: ['./task-setting.component.css', '../../task-detail.component.css']
})
export class TaskSettingComponent implements OnInit {

  @Input() tenCV: string
  @Input() nhomCV: CategoryInTaskResponse
  @Input() DsThamGia: Array<UserResponseModel>
  @Input() DsDuocXem: Array<UserResponseModel>
  @Input() NguoiThucHienChinh: UserResponseModel
  @Input() mscv: string
  @Input() ngayKT: string
  @Output() reloadData = new EventEmitter();
  TaskCategory: TaskCategoryResponse
  edit = {
    tencv: false,
    nhomcv: false,
    DsThamGia: false,
    DsDuocXem: false,
    ngayKT: false,
    nguoithuchienchinh: false
  }
  ngayKTFormat
  constructor(private generalService: GeneralService, private api: ApiservicesService) { }

  ngOnInit(): void {
    this.getAlluser(null);
    this.GetAllTasksCategoryByUserId();
    this.checkingGroup();
    this.dateFormat()
  }
  async GetAllTasksCategoryByUserId() {
    var res = await this.api.httpCall(this.api.apiLists.GetAllTasksCategoryByUserId, {}, {}, "get", true)
    this.TaskCategory = <TaskCategoryResponse>res
  }
  checkingGroup() {
    if (this.nhomCV == null) {
      this.nhomCV = {
        nhomId: null,
        tenNhom: null,
      }
    }
  }
  dateFormat() {
    var y = this.ngayKT.slice(6, 10)
    var m = this.ngayKT.slice(3, 6)
    var d = this.ngayKT.slice(0, 3)
    this.ngayKTFormat = moment([y, parseInt(m) - 1, d]).format("yyyy-MM-DD")
  }
  async saveChange() {
    try {
      if (this.edit.nhomcv) {
        var res = await this.api.httpCall(this.api.apiLists.AddCategoryToTask + `?ctID=${this.nhomCV.nhomId}&mscv=${this.mscv}`, {}, {}, 'post', true);
      }
      if (this.edit.ngayKT) {
        let date = moment(this.ngayKTFormat).format("YYYY/MM/DD")
        var res = await this.api.httpCall(this.api.apiLists.DelayTask + `?mscv=${this.mscv}&delaytime=${date}`, {}, {}, "post", true)
      }
      if (this.edit.nguoithuchienchinh) {
        var res = await this.api.httpCall(this.api.apiLists.ChangeMajorAssignment + `?mscv=${this.mscv}&uid=${this.NguoiThucHienChinh.userId}`, {}, {}, 'post', true)
      }
      if (this.edit.DsThamGia) {
        var danhsachtg = this.chosenAssigneeList.map(x => { return x.userId })
        var res = await this.api.httpCall(this.api.apiLists.AssignNewListParticipantToTask + `?mscv=${this.mscv}`, {}, danhsachtg, "post", true)
      }
      if (this.edit.DsDuocXem) {
        var danhsachdx = this.chosenViewerList.map(x => { return x.userId })
        var res = await this.api.httpCall(this.api.apiLists.AssignNewListViewerToTask + `?mscv=${this.mscv}`, {}, danhsachdx, "post", true)
      }
      this.reloadData.emit();
    } catch (error) {
      console.error(error)
    }
  }
  groupSelect(e) {
    this.nhomCV.nhomId = e
    this.edit.nhomcv = true
    console.log(e)
  }
  majorAssigneeSelect(e) {
    this.NguoiThucHienChinh.userId = e.target.value;
    this.edit.nguoithuchienchinh = true;
  }
  allUser
  assigneeList
  chosenAssigneeList
  viewerList
  chosenViewerList
  groupKeyChosenInStep2 = 'all'
  dualListUpdateForAssignee(event) {
    this.assigneeList = event.leftList;
    this.chosenAssigneeList = event.rightList;
    this.edit.DsThamGia = true;
  }
  dualListUpdateForViewer(event) {
    this.viewerList = event.leftList;
    this.chosenViewerList = event.rightList;
    this.edit.DsDuocXem = true;
  }
  getAlluser(e) {
    if (e == null || this.groupKeyChosenInStep2 == 'all') {
      this.allUser = this.generalService.cloneAnything(this.generalService.allUsers);
    }
    else {
      this.allUser = this.generalService.allUsersWithGroups[`${this.groupKeyChosenInStep2}`];
    }
  }
}
