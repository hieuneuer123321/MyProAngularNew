import { Component, Input, OnInit } from '@angular/core';
import { ApiservicesService } from 'src/app/services/api.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-task-user-manager',
  templateUrl: './task-user-manager.component.html',
  styleUrls: ['./task-user-manager.component.css']
})
export class TaskUserManagerComponent implements OnInit {

  constructor(private api: ApiservicesService, private generalService: GeneralService) { }

  @Input() NguoiXuLyChinh
  @Input() DanhSachXuLy
  @Input() DanhSachDuocXem
  ngOnInit(): void {
  }
  taskID
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
      if (this.NguoiXuLyChinh.userId != this.NguoiChinh) {
        const res = await this.api.httpCall(this.api.apiLists.ChangeMajorAssignment, {}, {
          mscv: this.taskID,
          newMajorAssign: this.NguoiChinh
        }, 'post', true)
      }
      return;
    }
    var res = await this.api.httpCall(this.api.apiLists.AssignNewListViewerToTask + `?mscv=${this.taskID}`, {}, danhsach, "post", true)
  }
  TaskUserManager(type: string) {
    this.DanhSach = [...this.generalService.allUsers]
    this.ManagerType = type
    const danhsachthamgia = []
    const danhsachduocxem = []
    this.DanhSachXuLy.forEach(nxl => {
      this.DanhSach.forEach((ds, i) => {
        if (ds.userId == nxl.userId) {
          danhsachthamgia.push(ds);
          this.DanhSach.splice(i, 1);
        }
      })
    })
    this.DanhSachDuocChon = danhsachthamgia;
    this.NguoiChinh = this.NguoiXuLyChinh.userId;
    this.DanhSachDuocXem.forEach(nxl => {
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

}
