import { Event } from './../../Model/Event';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { WizardComponent } from 'angular-archwizard';
import { GeneralService } from 'src/app/services/general.service';
import data from './new-event.language';
import { ApiservicesService } from 'src/app/services/api.service';
import dateFormat, { masks } from 'dateformat';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PersonalEvent } from 'src/app/Model/PersonalModal';
import { UserEvent } from 'src/app/Model/UserEvent';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css'],
})
export class NewEventComponent implements OnInit {
  @ViewChild(WizardComponent)
  public wizard: WizardComponent;
  newUserEvent = new UserEvent();
  wizardStep = 0;
  spinnerLoading = false;
  newEventData = {
    start: '',
    end: '',
    description: '',
    location: '',
    invited: '',
    note: '',
    file: [],
  };
  chosenAssigneelList: any[];
  ////
  eventTuan;
  // newEventPerson = new PersonalEvent();
  idUpdate;
  locationListAll;
  dateStart;
  dateEnd;
  hourStart: any;
  hourEnd: any;
  inputDiaDiem;
  checkInput: boolean;

  allUserInStep2List;
  majorAssignee;
  groupKeyChosenInStep2 = 'all';
  ////
  constructor(
    private _location: Location,
    public generalService: GeneralService,
    public api: ApiservicesService,
    public routerAc: ActivatedRoute,
    private router: Router,
    private toaster: ToastrService
  ) {}
  ngOnInit(): void {
    this.onAsigneeGroupChange(null);
    if (this.routerAc.snapshot.params['id']) {
      this.getLichTuanById(this.routerAc.snapshot.params['id']);
    } else if (this.routerAc.snapshot.params['idLichCaNhan']) {
      this.idUpdate = this.routerAc.snapshot.params['idLichCaNhan'];
      this.getLichCaNhanDetail(this.routerAc.snapshot.params['idLichCaNhan']);
    } else {
      const now = new Date();
      this.dateStart = dateFormat(now, 'isoDate');
      this.dateEnd = dateFormat(now, 'isoDate');
      const test = dateFormat(now, 'isoTime');
      this.hourStart = test.substring(0, 5);
      this.hourEnd = test.substring(0, 5);
    }
    console.log(this.routerAc.snapshot.params['idLichCaNhan']);
    console.log(this.routerAc.snapshot.params['id']);
    this.getListLocationAll();
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
      if (this.eventTuan) {
        const dateF = new Date(this.eventTuan.tgbatdau);
        const dateT = new Date(this.eventTuan.tgketthuc);
        this.dateStart = dateFormat(dateF, 'isoDate');
        this.dateEnd = dateFormat(dateT, 'isoDate');
        const test1 = dateFormat(dateF, 'isoTime');
        const test2 = dateFormat(dateT, 'isoTime');
        this.hourStart = test1.substring(0, 5);
        this.hourEnd = test2.substring(0, 5);
        this.newUserEvent.noidung = this.eventTuan.noidung;
        if (await this.CheckgetListLocationAll(this.eventTuan.diadiem)) {
          this.inputDiaDiem = '';
          this.checkInput = true;
        } else {
          this.checkInput = false;
          this.inputDiaDiem = this.eventTuan.diadiem;
        }
        this.newUserEvent.diadiem = this.eventTuan.diadiem;

        console.log(this.newUserEvent);
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
    }
  }
  async getLichCaNhanDetail(id) {
    try {
      const event: any = await this.api.httpCall(
        this.api.apiLists.GetUserEventDetail + `?idlich=${id}`,
        {},
        {},
        'get',
        true
      );
      if (event) {
        const dateF = new Date(event.tgbatdau);
        const dateT = new Date(event.tgketthuc);
        this.dateStart = dateFormat(dateF, 'isoDate');
        this.dateEnd = dateFormat(dateT, 'isoDate');
        const test1 = dateFormat(dateF, 'isoTime');
        const test2 = dateFormat(dateT, 'isoTime');
        this.hourStart = test1.substring(0, 5);
        this.hourEnd = test2.substring(0, 5);
        this.newUserEvent.noidung = event.noidung;
        console.log(await this.CheckgetListLocationAll(event.diadiem));
        if (await this.CheckgetListLocationAll(event.diadiem)) {
          this.inputDiaDiem = '';
          this.checkInput = true;
        } else {
          this.checkInput = false;
          this.inputDiaDiem = event.diadiem;
        }
        this.newUserEvent.diadiem = event.diadiem;
        console.log(event);
        this.newUserEvent.danhSachDuocXem = event.dsDuocXem;
        this.chosenAssigneelList = event.dsDuocXem;
        this.newUserEvent.idlich = event.idlich;
        this.onAsigneeGroupChangeUpdate(null, this.chosenAssigneelList);
      } else {
        return false;
      }
    } catch (error) {}
  }
  changeDiaDiem(values: any) {
    console.log(values);
    if (values) {
      this.checkInput = true;
      this.inputDiaDiem = '';
      this.newUserEvent.diadiem = values;
    } else {
      this.checkInput = false;
      this.inputDiaDiem = '';
      this.newUserEvent.diadiem = '';
    }
  }
  check() {
    const newDateStart = this.getDateFormat(this.dateStart, this.hourStart);
    const newDateEnd = this.getDateFormat(this.dateEnd, this.hourEnd);
    this.newUserEvent.diadiem =
      !this.checkInput || this.newUserEvent.diadiem == ''
        ? this.inputDiaDiem
        : this.newUserEvent.diadiem;
    if (
      this.dateStart &&
      this.dateEnd &&
      this.hourStart &&
      this.hourEnd &&
      this.newUserEvent.noidung &&
      this.newUserEvent.diadiem &&
      newDateStart <= newDateEnd &&
      new Date(
        newDateStart.getFullYear(),
        newDateStart.getMonth(),
        newDateStart.getDate()
      ) >=
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate()
        )
    ) {
      this.wizard.goToNextStep();
    } else if (
      new Date(
        newDateStart.getFullYear(),
        newDateStart.getMonth(),
        newDateStart.getDate()
      ) <
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      )
    ) {
      this.generalService.showErrorToast(
        2,
        'Ngày Bắt Đầu Phải Lớn Hơn Ngày Hiện Tại'
      );
    } else if (newDateStart > newDateEnd) {
      this.generalService.showErrorToast(
        2,
        'Ngày Bắt Đầu Phải Nhỏ Hơn Ngày Kết Thúc'
      );
    } else {
      this.generalService.showErrorToast(
        2,
        'Các trường đánh dấu (*) không được bỏ trống'
      );
    }
  }
  convertDate(dateString, hourS) {
    const temp = dateFormat(
      this.getDateFormat(dateString, hourS),
      'isoDateTime'
    );
    const dateTimeFormatter = temp.substring(0, 19);
    return dateTimeFormatter;
  }
  getDateFormat(dateParam, hourS) {
    const date = new Date(dateParam);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const arrHourS = hourS.split('');
    const hour = Number(hourS.substring(0, 2));
    const minute = Number(
      `${arrHourS[arrHourS.length - 2]}${arrHourS[arrHourS.length - 1]}`
    );
    const newDateStart = new Date(year, month, day, hour, minute);
    return newDateStart;
  }

  goBack() {
    this._location.back();
  }
  async getListLocationAll() {
    try {
      this.locationListAll = await this.api.httpCall(
        this.api.apiLists.GetAllLocations,
        {},
        {},
        'get',
        true
      );
    } catch (e) {
      console.log(e.message);
    }
  }
  async CheckgetListLocationAll(string) {
    try {
      const arr: any = await this.api.httpCall(
        this.api.apiLists.GetAllLocations,
        {},
        {},
        'get',
        true
      );
      const test = arr.find((i) => {
        return i.tenDiaDiem == string;
      });
      if (test) return true;
      else return false;
      // console.log(this.locationListAll.length);
    } catch (e) {
      console.log(e.message);
    }
  }
  onChange(e) {
    this.onAsigneeGroupChange(e);
  }
  onAsigneeGroupChange(e) {
    console.log(this.groupKeyChosenInStep2);
    console.log(e);
    if (e == null || this.groupKeyChosenInStep2 == 'all') {
      this.allUserInStep2List = this.generalService.cloneAnything(
        this.generalService.allUsers
      );
    } else {
      this.allUserInStep2List = this.generalService.allUsersWithGroups[`${e}`];
    }
  }
  filterItemvsArr(arr1, arr2) {
    const arrtemp = [];
    arr2.forEach((i) => {
      arrtemp.push(arr1.find((item) => item.userId == i.userId));
    });
    return arrtemp;
  }
  onAsigneeGroupChangeUpdate(e, values) {
    console.log(e);
    if (e == null || this.groupKeyChosenInStep2 == 'all') {
      (this.allUserInStep2List = this.generalService.cloneAnything(
        this.generalService.allUsers
      )),
        (this.chosenAssigneelList = this.filterItemvsArr(
          this.generalService.cloneAnything(this.generalService.allUsers),
          values
        ));
    } else {
      this.allUserInStep2List = this.generalService.allUsersWithGroups[`${e}`];
    }

    if (values) {
    }
  }
  async AddEvent() {
    this.newUserEvent.tgbatdau = this.convertDate(
      this.dateStart,
      this.hourStart
    );
    this.newUserEvent.tgketthuc = this.convertDate(this.dateEnd, this.hourEnd);
    let arrUserId = [];
    this.newUserEvent.danhSachDuocXem = this.chosenAssigneelList;
    if (
      this.newUserEvent.danhSachDuocXem &&
      this.newUserEvent.danhSachDuocXem.length > 0
    ) {
      this.newUserEvent.danhSachDuocXem.forEach((i) => {
        arrUserId.push(i.userId);
      });
    } else {
      arrUserId = [];
    }
    this.newUserEvent.danhSachDuocXem = arrUserId;
    this.newUserEvent.diadiem =
      !this.checkInput || this.newUserEvent.diadiem == ''
        ? this.inputDiaDiem
        : this.newUserEvent.diadiem;

    try {
      console.log(this.newUserEvent);
      await this.api.httpCall(
        this.api.apiLists.CreateNewUserEvents,
        {},
        this.newUserEvent,
        'post',
        true
      );
      this.toaster.success('', 'Thêm Thành Công!', {
        timeOut: 2500,
      });
      this.router.navigate(['/personal/event']);
    } catch (e) {
      console.log(e);
      this.toaster.error('', 'Thêm Thất Bại!', {
        timeOut: 2500,
      });
    }
  }
  async UpdateEvent() {
    this.newUserEvent.tgbatdau = this.convertDate(
      this.dateStart,
      this.hourStart
    );
    this.newUserEvent.tgketthuc = this.convertDate(this.dateEnd, this.hourEnd);
    console.log(this.newUserEvent.dsDuocXem);
    const arrUserId = [];
    this.newUserEvent.dsDuocXem = this.chosenAssigneelList;
    if (this.newUserEvent.dsDuocXem.length > 0) {
      this.newUserEvent.dsDuocXem.forEach((i) => {
        arrUserId.push(i.userId);
      });
    }
    this.newUserEvent.dsDuocXem = arrUserId;
    this.newUserEvent.diadiem =
      !this.checkInput || this.newUserEvent.diadiem == ''
        ? this.inputDiaDiem
        : this.newUserEvent.diadiem;
    try {
      await this.api.httpCall(
        this.api.apiLists.UpdateUserEvent,
        {},
        this.newUserEvent,
        'post',
        true
      );
      this.toaster.success('', 'Sửa Thành Công!', {
        timeOut: 2500,
      });
      this.router.navigate([
        `personal/event/${this.routerAc.snapshot.params['idLichCaNhan']}`,
      ]);
    } catch (e) {
      console.log(e);
      this.toaster.error('', 'Sửa Thất Bại!', {
        timeOut: 2500,
      });
    }
  }
  resetDs() {
    this.dualListUpdateForAssignee(null);
    this.chosenAssigneelList = [];
    this.newUserEvent.danhSachDuocXem = [];
  }
  dualListUpdateForAssignee(newevent) {
    console.log(newevent);
    if (newevent) {
      this.allUserInStep2List = newevent.leftList;
      this.chosenAssigneelList = newevent.rightList;
      // this.newUserEvent.danhSachDuocXem = newevent.rightList;
    } else {
      this.chosenAssigneelList = [];
    }
    // console.log(this.newUserEvent.danhSachDuocXem);
    // if(this.groupKeyChosenInStep2 == 'all')
    // {
    //   for(let i=0; i< this.allUserInStep2List.length; ++i)
    //   {
    //     if(!this.containsObject(this.allUserInStep2List[i],this.generalService.allUsers))
    //     this.allUserInStep2List.splice(i,1);
    //   }
    // }
    // else
    // {
    //   for(let i=0; i< this.allUserInStep2List.length; ++i)
    //   {
    //     if(!this.containsObject(this.allUserInStep2List[i],this.generalService.allUsersWithGroups[`${this.groupKeyChosenInStep2}`]))
    //     this.allUserInStep2List.splice(i,1);
    //   }
    // }

    //kiem tra xem majorAssignee đã chọn trước đó còn trong list chosen hay ko.
    // if (this.majorAssignee != null) {
    //   let check = false;
    //   for (let i = 0; i < this.chosenAssigneelList.length; ++i) {
    //     if (this.majorAssignee == this.chosenAssigneelList[i]) {
    //       check = true;
    //       break;
    //     }
    //   }
    //   if (!check) this.majorAssignee = null;
    // }
  }
  removeFile(index) {
    this.newEventData.file.splice(index, 1);
    const dt = new DataTransfer();
    const input = document.getElementById('fileList') as HTMLInputElement;
    const { files } = input;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (index !== i) dt.items.add(file); // here you exclude the file. thus removing it.
    }

    input.files = dt.files;
  }
  handleFileInput(files: FileList) {
    this.newEventData.file = Array.from(files);
    console.log(files);
  }
  wizardGoodToGo(numb) {
    this.wizard.goToStep(numb);
  }

  getLabel(key) {
    return data[`${this.generalService.currentLanguage.Code}`][`${key}`];
  }
  finish() {}
}
