import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { WizardComponent } from 'angular-archwizard';
import { GeneralService } from 'src/app/services/general.service';
import { DatePipe } from '@angular/common';
import { ApiservicesService } from 'src/app/services/api.service';
import { EventSample, EventSampleUpdate } from 'src/app/Model/Event_Sample';
import dateFormat, { masks } from 'dateformat';
import { ActivatedRoute, Router } from '@angular/router';
import { EventUpdate } from 'src/app/Model/Event';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-event-update',
  templateUrl: './event-update.component.html',
  styleUrls: ['./event-update.component.css'],
})
export class EventUpdateComponent implements OnInit {
  @ViewChild(WizardComponent)
  public wizard: WizardComponent;
  checkDiaDiem = false;
  readonlyInput = false;
  inputDiaDiem;
  locationListAll;
  event = new EventUpdate();
  idLichTuan;
  dateStart;
  dateEnd;
  hourStart: any;
  hourEnd: any;
  name = 'Angular ';
  today = Date.now();
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
  allUserInStep2List;
  majorAssignee;
  groupKeyChosenInStep2 = 'all';
  //Validate
  errors = {
    noidung: '',
    diadiem: '',
    chutri: '',
    thanhphan: '',
  };
  //
  constructor(
    private _location: Location,
    public generalService: GeneralService,
    public api: ApiservicesService,
    public routerAc: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.wizardStep);
    this.idLichTuan = this.routerAc.snapshot.params['id'];
    console.log(this.generalService);
    // this.dualListUpdateForAssignee(null);
    this.getListLocationAll(null);
    this.getById(this.routerAc.snapshot.params['id']);
    // Wed, 22 Dec 2021 00:31:25 GMT
    // console.log(this.chosenAssigneelList);
    // T4 ngày 22/12/2021
  }

  async getById(id: string) {
    console.log(id);
    try {
      let EventNotApproved: any;
      EventNotApproved = await this.api.httpCall(
        this.api.apiLists.GetAllEventByType + '?type=0',
        {},
        {},
        'get',
        true
      );
      let EventApproved: any;
      EventApproved = await this.api.httpCall(
        this.api.apiLists.GetAllEventByType + '?type=1',
        {},
        {},
        'get',
        true
      );
      const AllEvents = [...EventNotApproved, ...EventApproved];
      this.event = AllEvents.find((item) => item.lichtuanid == id);
      console.log(this.event);
      this.getListLocationAll(this.event.diadiem);
      this.dateStart = this.event.tgbatdau.substring(0, 10);
      this.hourStart = this.event.tgbatdau.substring(11, 16);
      this.dateEnd = this.event.tgketthuc.substring(0, 10);
      this.hourEnd = this.event.tgketthuc.substring(11, 16);
      this.chosenAssigneelList = this.event.dsLienQuan;
      console.log(this.chosenAssigneelList);
      this.onAsigneeGroupChange(null, this.chosenAssigneelList);
    } catch (e) {
      console.log(e);
    }
  }

  changeDiaDiem(values: any) {
    this.event.diadiem = values;
    this.inputDiaDiem = '';
    console.log(values);
    values == ''
      ? ((this.readonlyInput = false), (this.checkDiaDiem = false))
      : ((this.readonlyInput = true), (this.checkDiaDiem = true));
  }
  async getListLocationAll(localCheck) {
    try {
      this.locationListAll = await this.api.httpCall(
        this.api.apiLists.GetAllLocations,
        {},
        {},
        'get',
        true
      );
      if (localCheck) {
        this.checkDiaDiem =
          this.locationListAll.filter(
            (location) => location.tenDiaDiem == localCheck
          ).length === 0
            ? false
            : true;
        if (!this.checkDiaDiem) {
          this.inputDiaDiem = localCheck;
        }
      }

      // console.log(this.locationListAll.length);
    } catch (e) {
      console.log(e.message);
    }
  }
  goBack() {
    this._location.back();
  }
  setDefaults(arr) {
    this.chosenAssigneelList = arr;
  }
  filterItemvsArr(arr1, arr2) {
    const arrtemp = [];
    arr2.forEach((i) => {
      arrtemp.push(arr1.find((item) => item.userId == i.uid));
    });
    return arrtemp;
  }

  onAsigneeGroupChange(e, values) {
    console.log(e);
    if (e == null || this.groupKeyChosenInStep2 == 'all') {
      (this.allUserInStep2List = this.generalService.cloneAnything(
        this.generalService.allUsers
      )),
        console.log(values);
      this.chosenAssigneelList = this.filterItemvsArr(
        this.generalService.cloneAnything(this.generalService.allUsers),
        values
      );
    } else {
      this.allUserInStep2List = this.generalService.allUsersWithGroups[`${e}`];
    }
    if (values) {
    }
  }
  onChange(e: any) {
    this.onAsigneeGroupChange(e, null);
  }
  // onChangeUser(e: any) {
  //   console.log(e);
  // }
  dualListUpdateForAssignee(event) {
    console.log(event);
    if (event) {
      this.allUserInStep2List = event.leftList;
      this.chosenAssigneelList = event.rightList;
    } else {
      this.chosenAssigneelList = [];
    }
    console.log(this.event);
    console.log(this.chosenAssigneelList);
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
  finish() {}
  async updateEventSample() {
    //   /// format date time start
    const date = new Date(this.dateStart);
    const hourS = this.hourStart;
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const arrHourS = hourS.split('');
    const hour = Number(hourS.substring(0, 2));
    const minute = Number(
      `${arrHourS[arrHourS.length - 2]}${arrHourS[arrHourS.length - 1]}`
    );
    const newDateStart = new Date(year, month, day, hour, minute);
    const temp = dateFormat(newDateStart, 'isoDateTime');
    const dateTimeFormatter = temp.substring(0, 19);
    ////format date time end
    const date2 = new Date(this.dateEnd);
    const hourS2 = this.hourEnd;
    const year2 = date2.getFullYear();
    const month2 = date2.getMonth();
    const day2 = date2.getDate();
    const arrHour = hourS2.split('');
    const hour2 = Number(hourS2.substring(0, 2));
    const minute2 = Number(
      `${arrHour[arrHour.length - 2]}${arrHour[arrHour.length - 1]}`
    );
    const newDateEnd = new Date(year2, month2, day2, hour2, minute2);
    const temp2 = dateFormat(newDateEnd, 'isoDateTime');
    const dateTimeFormatter2 = temp2.substring(0, 19);
    this.event.tgbatdau = dateTimeFormatter;
    this.event.tgketthuc = dateTimeFormatter2;
    const arrUserId = [];
    console.log(this.chosenAssigneelList);
    this.chosenAssigneelList.forEach((i) => {
      arrUserId.push(i.userId);
    });
    this.event.dsLienQuan = arrUserId;
    this.event.idLich = this.idLichTuan;

    this.event.diadiem = this.inputDiaDiem
      ? this.inputDiaDiem
      : this.event.diadiem;
    if (this.event.noidung) {
      this.errors.noidung = '';
    }
    if (this.event.chutri) {
      this.errors.chutri = '';
    }
    if (this.event.thanhphan) {
      this.errors.thanhphan = '';
    }
    if (this.event.diadiem) {
      this.errors.diadiem = '';
    }
    if (
      this.event.diadiem &&
      this.event.noidung &&
      this.event.chutri &&
      this.event.thanhphan
    ) {
      this.errors.chutri =
        this.errors.diadiem =
        this.errors.noidung =
        this.errors.thanhphan =
          '';
      try {
        console.log(this.event);
        const obj = {
          ltid: this.event.idLich,
          tgbatdau: this.event.tgbatdau,
          tgketthuc: this.event.tgketthuc,
          noidung: this.event.noidung,
          ghichu: this.event.ghichu,
          chutri: this.event.chutri,
          thanhphan: this.event.thanhphan,
          chuanbi: this.event.chuanbi,
          khachmoi: this.event.khachmoi,
          diadiem: this.event.diadiem,
          hopkhan: this.event.hopkhan,
          dsLienQuan: this.event.dsLienQuan,
        };
        await this.api.httpCall(
          this.api.apiLists.UpdateEvent,
          {},
          obj,
          'post',
          true
        );
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Sửa Thành Công',
          showConfirmButton: false,
          timer: 1000,
        });
        this.router.navigate([`event/event-list`]);
      } catch (e) {
        console.log(e);
      }
    } else {
      Swal.fire({
        title: '<strong>Thiếu Thông Tin ?</strong>',
        icon: 'warning',
        html: `Vui lòng nhập đầy đủ các thông tin bắt buộc ! !`,
        showCloseButton: true,
        focusConfirm: true,
        reverseButtons: true,
        focusCancel: false,
        confirmButtonText: `Hủy`,
      }).then(async (result) => {
        if (
          !this.event.diadiem &&
          !this.event.noidung &&
          !this.event.chutri &&
          !this.event.thanhphan
        ) {
          this.errors.thanhphan = 'Vui lòng nhập vào ô này !';
          this.errors.chutri = 'Vui lòng nhập vào ô này !';
          this.errors.noidung = 'Vui lòng nhập vào ô này !';
          this.errors.diadiem = 'Vui lòng nhập vào ô này !';
        } else {
          if (!this.event.noidung) {
            this.errors.noidung = 'Vui lòng nhập vào ô này !';
          }
          if (!this.event.chutri) {
            this.errors.chutri = 'Vui lòng nhập vào ô này !';
          }
          if (!this.event.thanhphan) {
            this.errors.thanhphan = 'Vui lòng nhập vào ô này !';
          }
          if (!this.event.diadiem) {
            this.errors.diadiem = 'Vui lòng nhập vào ô này !';
            this.event.diadiem == '';
          }
          if (!this.inputDiaDiem && this.checkDiaDiem == false) {
            this.errors.diadiem = 'Vui lòng nhập vào ô này !';
            this.event.diadiem == '';
          }
        }
      });
    }
  }
}
