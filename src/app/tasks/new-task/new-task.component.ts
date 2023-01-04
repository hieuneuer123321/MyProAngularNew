import dateFormat, { masks } from 'dateformat';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';
import { ApiservicesService } from 'src/app/services/api.service';
import { GeneralService } from 'src/app/services/general.service';
import * as moment from 'moment';
import { WizardComponent } from 'angular-archwizard';
import { Location, LocationChangeEvent } from '@angular/common';
import { TaskProjectModels } from 'src/app/Model/TasksProjectModels';
import { createNewTask } from 'src/app/Model/TaskModels';
import { TaskCategoryResponse } from 'src/app/Model/TaskCategory';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css'],
})
export class NewTaskComponent implements OnInit {
  public myDatePickerOptions: IAngularMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
  };
  @ViewChild(WizardComponent)
  public wizard: WizardComponent;
  spinnerLoading = false;
  taskGroup = '';
  sampleTask = '';
  //sampleTaskList
  unknownTimeCheck = false;
  fileToUpload;
  newTaskData = new createNewTask();
  tasksProject: Array<TaskProjectModels>;
  taskGroupList: Array<TaskCategoryResponse>;
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: false,
    minHeight: '80',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Nhập nội dung...',
  };

  allUser;
  chosenAssigneelList: Array<any>;
  chosenViewerList: Array<any>;
  groupKeyChosen = 'all';
  majorAssignee;

  step1BtnClicked = false;
  step2BtnClicked = false;
  step3BtnClicked = false;
  /// Nếu chuyển lịch tuần thành công việc
  eventTuan;
  constructor(
    private location: Location,
    private router: Router,
    private api: ApiservicesService,
    public routerAc: ActivatedRoute,
    public generalService: GeneralService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    if (this.routerAc.snapshot.params['id']) {
      this.getLichTuanById(this.routerAc.snapshot.params['id']);
    }
    this.newTaskData.nguoiTao = this.generalService.userData.userID;
    this.GetUserByKey(null);
    this.getAllTasksProject();
    this.getAllGroupCreatedByUser();
  }
  async getLichTuanById(id) {
    try {
      const event0: any = await this.api.httpCall(
        this.api.apiLists.GetAllEventByType + `?type=0`,
        {},
        {},
        'get',
        true
      );
      const event1: any = await this.api.httpCall(
        this.api.apiLists.GetAllEventByType + `?type=1`,
        {},
        {},
        'get',
        true
      );
      const ArrAll = [...event1, ...event0];
      this.eventTuan = ArrAll.find((event) => event.lichtuanid == id);
      console.log(this.eventTuan);
      const dateF = new Date(this.eventTuan.tgbatdau);
      const dateT = new Date(this.eventTuan.tgketthuc);
      this.newTaskData.chude = this.eventTuan.noidung;
      this.newTaskData.noidung = `${this.eventTuan.noidung}
      Ngày: ${dateFormat(dateF, 'isoDate')} -  ${dateFormat(dateT, 'isoDate')}
      Giờ: ${this.eventTuan.tgbatdau.substring(
        11,
        16
      )} -  ${this.eventTuan.tgketthuc.substring(11, 16)}
      Địa Điểm: ${this.eventTuan.diadiem}
      Chủ Trì: ${this.eventTuan.chutri}
      Chuẩn Bị: ${this.eventTuan.chuanbi}
      Thành Phần: ${this.eventTuan.thanhphan}
      `;
      this.newTaskData.ngayBatDau = dateFormat(dateF, 'isoDate');
      this.newTaskData.ngayHoanThanhDuKien = dateFormat(dateT, 'isoDate');
    } catch (err) {
      console.log(err);
    }
  }
  async getAllTasksProject() {
    var res = await this.api.httpCall(
      this.api.apiLists.GetAllTasksProject,
      {},
      {},
      'get',
      true
    );
    this.tasksProject = <Array<TaskProjectModels>>res;
  }
  async getAllGroupCreatedByUser() {
    var res = await this.api.httpCall(
      this.api.apiLists.GetAllTasksCategoryByUserId,
      {},
      {},
      'get',
      true
    );
    this.taskGroupList = <Array<TaskCategoryResponse>>res;
  }
  GetUserByKey(e) {
    if (e == null || this.groupKeyChosen == 'all') {
      this.allUser = this.generalService.cloneAnything(
        this.generalService.allUsers
      );
    } else {
      this.allUser =
        this.generalService.allUsersWithGroups[`${this.groupKeyChosen}`];
    }
  }
  goBack() {
    this.location.back();
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = Array.from(files);
    console.log(this.fileToUpload);
  }
  removeFileFromUploadList(index) {
    this.fileToUpload.splice(index, 1);
    const dt = new DataTransfer();
    const input = document.getElementById('fileList') as HTMLInputElement;
    const { files } = input;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (index !== i) dt.items.add(file); // here you exclude the file. thus removing it.
    }

    input.files = dt.files;
  }

  dualListUpdateForAssignee(event) {
    this.allUser = event.leftList;
    this.chosenAssigneelList = event.rightList;

    //kiem tra xem majorAssignee đã chọn trước đó còn trong list chosen hay ko.
    if (this.majorAssignee != null) {
      let check = false;
      for (let i = 0; i < this.chosenAssigneelList.length; ++i) {
        if (this.majorAssignee == this.chosenAssigneelList[i]) {
          check = true;
          break;
        }
      }
      if (!check) this.majorAssignee = null;
    }
    this.newTaskData.participants = [];
    event.rightList.forEach((e) => {
      if (e.userId !== this.newTaskData.nguoiTao) {
        this.newTaskData.participants.push({ nguoiXuLy: e.userId });
      }
    });
  }
  dualListUpdateForWatchable(event) {
    this.allUser = event.leftList;
    this.chosenViewerList = event.rightList;
    this.newTaskData.viewers = [];
    event.rightList.forEach((e) => {
      this.newTaskData.viewers.push({ nguoiDuocXem: e.userId });
    });
  }

  async createNewTask() {
    /*if (this.fileToUpload != null && this.fileToUpload.length > 0) {
      try {
        await this.api.postFile(this.fileToUpload, this.api.apiLists.uploadFile, {}, (result as any).mscv, false)
      } catch (error) {

      }
    }*/
    this.spinnerLoading = true;
    var res = await this.api.httpCall(
      this.api.apiLists.createNewTask,
      {},
      this.newTaskData,
      'post',
      true
    );
    var result = <any>res;
    if (this.taskGroup !== '' && result.modelResponse.isValid) {
      var addgroup = await this.api.httpCall(
        this.api.apiLists.AddCategoryToTask +
          `?ctID=${this.taskGroup}&mscv=${result.mscv}`,
        {},
        {},
        'post',
        true
      );
      var rs = <any>addgroup;
      this.generalService.showErrorToast(rs.status ? 1 : 0, rs.message);
    }
    if (result.modelResponse.isValid) {
      this.generalService.showErrorToast(1, 'Tạo công việc mới thành công');
      this.router.navigate([`/tasks/task-detail/${result.mscv}`]);
    }
    this.spinnerLoading = false;
  }
  selectMajorAssign() {
    this.newTaskData.nguoiXuLyChinh = this.majorAssignee.userId;
    this.newTaskData.participants = this.newTaskData.participants.filter(
      (x) => {
        return x.nguoiXuLy !== this.majorAssignee.userId;
      }
    );
  }
  //STEP STEP STEP STEP
  wizardNavbtnClicked(step, direction) {
    if (step == 1) {
      this.step1BtnClicked = true;
      if (this.step1Validator()) this.wizardGoodToGo(direction);
    } else if (step == 2) {
      this.step2BtnClicked = true;
      if (direction == 'next') {
        console.log(this.step2Validator());
        if (this.step2Validator()) {
          this.wizardGoodToGo(direction);
        }
      } else this.wizardGoodToGo(direction);
    } else if (step == 3) {
      this.step3BtnClicked = true;
    }
  }
  wizardGoodToGo(direction) {
    if (direction == 'next') this.wizard.goToNextStep();
    else if (direction == 'previous') this.wizard.goToPreviousStep();
  }
  step1Validator() {
    if (
      this.newTaskData.chude == '' ||
      this.newTaskData.ngayBatDau == null ||
      this.newTaskData.ngayHoanThanhDuKien == null ||
      this.newTaskData.noidung == null
    ) {
      this.generalService.showErrorToast(
        2,
        'Các trường đánh dấu (*) không được bỏ trống'
      );
      return false;
    } else if (!this.compareTwoDates()) {
      this.generalService.showErrorToast(
        2,
        'Ngày kết thúc cần lớn hơn hoặc bằng ngày bắt đầu'
      );
      return false;
    } else return true;
  }
  step2Validator() {
    if (this.chosenAssigneelList && this.chosenAssigneelList.length == 0) {
      this.generalService.showErrorToast(
        2,
        'Vui lòng chọn danh sách người tham gia xử lý'
      );
      return false;
    } else if (this.majorAssignee == null) {
      this.generalService.showErrorToast(2, 'Vui lòng chọn người xử lý chính');
      return false;
    } else return true;
  }
  compareTwoDates() {
    let start = moment(this.newTaskData.ngayBatDau, 'DD-MM-YYYY');
    let end = moment(this.newTaskData.ngayHoanThanhDuKien, 'DD-MM-YYYY');
    let diff = end.diff(start, 'days', false);
    if (diff < 0) return false;
    else return true;
  }
}
