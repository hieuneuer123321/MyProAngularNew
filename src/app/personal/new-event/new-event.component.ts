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
  ////
  eventTuan;
  // newEventPerson = new PersonalEvent();
  locationListAll;
  dateStart;
  dateEnd;
  hourStart: any;
  hourEnd: any;
  inputDiaDiem;
  checkInput: boolean;
  chosenAssigneelList: any[] = [];
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
    if (this.routerAc.snapshot.params['id']) {
      this.getLichTuanById(this.routerAc.snapshot.params['id']);
    } else {
      const now = new Date();
      this.dateStart = dateFormat(now, 'isoDate');
      this.dateEnd = dateFormat(now, 'isoDate');
      const test = dateFormat(now, 'isoTime');
      this.hourStart = test.substring(0, 5);
      this.hourEnd = test.substring(0, 5);
    }
    this.getListLocationAll();
    this.onAsigneeGroupChange(null);
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
        'Ng??y B???t ?????u Ph???i L???n H??n Ng??y Hi???n T???i'
      );
    } else if (newDateStart > newDateEnd) {
      this.generalService.showErrorToast(
        2,
        'Ng??y B???t ?????u Ph???i Nh??? H??n Ng??y K???t Th??c'
      );
    } else {
      this.generalService.showErrorToast(
        2,
        'C??c tr?????ng ????nh d???u (*) kh??ng ???????c b??? tr???ng'
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
      // console.log(this.locationListAll.length);
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
  async AddEvent() {
    /// format date time start CreateNewUserEvents
    // const date = new Date(this.dateStart);
    // const hourS = this.hourStart;
    // const year = date.getFullYear();
    // const month = date.getMonth();
    // const day = date.getDate();
    // const arrHourS = hourS.split('');
    // const hour = Number(hourS.substring(0, 2));
    // const minute = Number(
    //   `${arrHourS[arrHourS.length - 2]}${arrHourS[arrHourS.length - 1]}`
    // );
    // const newDateStart = new Date(year, month, day, hour, minute);
    // const temp = dateFormat(newDateStart, 'isoDateTime');
    // const dateTimeFormatter = temp.substring(0, 19);
    // ////format date time end
    // const date2 = new Date(this.dateEnd);
    // const hourS2 = this.hourEnd;
    // const year2 = date2.getFullYear();
    // const month2 = date2.getMonth();
    // const day2 = date2.getDate();
    // const arrHour = hourS2.split('');
    // const hour2 = Number(hourS2.substring(0, 2));
    // const minute2 = Number(
    //   `${arrHour[arrHour.length - 2]}${arrHour[arrHour.length - 1]}`
    // );
    // const newDateEnd = new Date(year2, month2, day2, hour2, minute2);
    // const temp2 = dateFormat(newDateEnd, 'isoDateTime');
    // const dateTimeFormatter2 = temp2.substring(0, 19);
    // this.newEventPerson.tgbatdau = dateTimeFormatter;
    // this.newEventPerson.tgketthuc = dateTimeFormatter2;
    this.newUserEvent.tgbatdau = this.convertDate(
      this.dateStart,
      this.hourStart
    );
    this.newUserEvent.tgketthuc = this.convertDate(this.dateEnd, this.hourEnd);
    const arrUserId = [];
    if (
      this.newUserEvent.danhSachDuocXem &&
      this.newUserEvent.danhSachDuocXem.length > 0
    ) {
      this.newUserEvent.danhSachDuocXem.forEach((i) => {
        arrUserId.push(i.userId);
      });
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
      this.toaster.success('', 'Th??m Th??nh C??ng!', {
        timeOut: 2500,
      });
      this.router.navigate(['/personal/event']);
    } catch (e) {
      console.log(e);
      this.toaster.error('', 'Th??m Th???t B???i!', {
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
      this.newUserEvent.danhSachDuocXem = newevent.rightList;
    } else {
      this.chosenAssigneelList = [];
    }
    console.log(this.chosenAssigneelList);
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

    //kiem tra xem majorAssignee ???? ch???n tr?????c ???? c??n trong list chosen hay ko.
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
