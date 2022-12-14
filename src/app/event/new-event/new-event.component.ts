import { Event } from './../../Model/Event';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { WizardComponent } from 'angular-archwizard';
import { GeneralService } from 'src/app/services/general.service';
import { ApiservicesService } from 'src/app/services/api.service';
import dateFormat, { masks } from 'dateformat';
import { Event_Week } from 'src/app/Model/Event_Week';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css'],
})
export class NewEventComponent implements OnInit {
  @ViewChild(WizardComponent)
  public wizard: WizardComponent;
  checkDiaDiem = false;
  readonlyInput = false;
  inputDiaDiem;
  dateStart;
  dateEnd;
  hourStart: any;
  hourEnd: any;
  eventNew = new Event_Week();
  locationListAll: any;
  listEventSample: any;
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
  //Validate
  errors = {
    noidung: '',
    diadiem: '',
    chutri: '',
    thanhphan: '',
  };
  //
  saveChooseListNV;
  chosenAssigneelList: any[] = [];
  allUserInStep2List;
  majorAssignee;
  groupKeyChosenInStep2 = 'all';
  constructor(
    private _location: Location,
    public generalService: GeneralService,
    public api: ApiservicesService,
    public routerAc: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.wizardStep);
    this.onAsigneeGroupChange(null, this.chosenAssigneelList);
    this.dualListUpdateForAssignee(null);
    this.gData();
    this.getListLocationAll();
    const now = new Date();
    this.dateStart = dateFormat(now, 'isoDate');
    this.dateEnd = dateFormat(now, 'isoDate');
    const test = dateFormat(now, 'isoTime');
    this.hourStart = test.substring(0, 5);
    this.hourEnd = test.substring(0, 5);
    this.eventNew.diadiem = '';
  }
  goBack() {
    this._location.back();
  }
  async changeLichMau(values) {
    console.log(values);
    if (values != '0') {
      try {
        const chooseEventSample: any = await this.api.httpCall(
          this.api.apiLists.GetEventDetailById,
          {},
          { ltid: values },
          'get',
          true
        );

        this.eventNew = chooseEventSample;
        this.dateStart = chooseEventSample.tgbatdau.substring(0, 10);
        this.hourStart = chooseEventSample.tgbatdau.substring(11, 16);
        this.dateEnd = chooseEventSample.tgketthuc.substring(0, 10);
        this.hourEnd = chooseEventSample.tgketthuc.substring(11, 16);
        const arrLocationFilter = this.locationListAll.filter((item) => {
          console.log(item);
          return item.tenDiaDiem == chooseEventSample.diadiem;
        });
        console.log(chooseEventSample);
        console.log(arrLocationFilter);
        if (arrLocationFilter.length == 0) {
          this.inputDiaDiem = this.eventNew.diadiem;
          this.readonlyInput = false;
          this.checkDiaDiem = false;
        } else {
          this.inputDiaDiem = '';
          this.readonlyInput = true;
          this.checkDiaDiem = true;
        }
        this.chosenAssigneelList = chooseEventSample.dsLienQuan;
        this.saveChooseListNV = chooseEventSample.dsLienQuan;
        console.log(this.chosenAssigneelList);
        this.onAsigneeGroupChange(null, this.chosenAssigneelList);
        if (this.eventNew.dsLienQuan && this.eventNew.dsLienQuan.length > 0) {
          const arrUserId: any = [];
          this.eventNew.dsLienQuan.forEach((i: any) => {
            if (i.uid) {
              arrUserId.push(i.uid);
            }
          });
          console.log(arrUserId);
          this.eventNew.dsLienQuan = arrUserId;
          console.log(this.eventNew.dsLienQuan);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      this.eventNew = new Event_Week();
      const now = new Date();
      const test = dateFormat(now, 'isoTime');
      this.hourStart = test.substring(0, 5);
      this.hourEnd = test.substring(0, 5);
      this.changeDiaDiem('0');
      this.inputDiaDiem = '';
    }
  }
  changeDiaDiem(values: any) {
    this.eventNew.diadiem = values;
    console.log(values);
    values == ''
      ? ((this.readonlyInput = false),
        (this.checkDiaDiem = false),
        (this.inputDiaDiem = this.eventNew.diadiem))
      : ((this.readonlyInput = true), (this.checkDiaDiem = true));
  }
  onChange(e: any) {
    this.onAsigneeGroupChange(e, null);
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
  async gData() {
    try {
      this.listEventSample = await this.api.httpCall(
        this.api.apiLists.GetAllEventSample,
        {},
        {},
        'get',
        true
      );
      this.listEventSample = this.listEventSample.reverse();
      console.log(this.listEventSample);
    } catch (e) {
      console.log(e);
    }
  }
  filterItemvsArr(arr1, arr2) {
    const arrtemp = [];
    arr2.forEach((i) => {
      arrtemp.push(arr1.find((item) => item.userId == i.uid));
    });
    return arrtemp;
  }
  onAsigneeGroupChange(e, values: any) {
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
  dualListUpdateForAssignee(event) {
    console.log(event);
    if (event) {
      this.allUserInStep2List = event.leftList;
      this.chosenAssigneelList = event.rightList;
      this.eventNew.dsLienQuan = event.rightList;
    } else {
      this.chosenAssigneelList = [];
    }
    console.log(this.chosenAssigneelList);
    // this.allUserInStep2List = event.leftList;
    // this.chosenAssigneelList = event.rightList;
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
  async addEvent() {
    /// format date time start
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
    this.eventNew.tgbatdau = dateTimeFormatter;
    this.eventNew.tgketthuc = dateTimeFormatter2;
    this.eventNew.hopkhan = '0';
    console.log(this.eventNew.dsLienQuan);
    if (this.eventNew.dsLienQuan && this.eventNew.dsLienQuan.length > 0) {
      const arrUserId: any = [];
      this.eventNew.dsLienQuan.forEach((i: any) => {
        console.log(i);
        if (i.uid) {
          arrUserId.push(i.uid);
        } else if (i.userId) {
          arrUserId.push(i.userId);
        } else {
          arrUserId.push(i);
        }
      });
      console.log(arrUserId);
      this.eventNew.dsLienQuan = arrUserId;
    }
    this.eventNew.diadiem =
      this.inputDiaDiem || this.eventNew.diadiem == ''
        ? this.inputDiaDiem
        : this.eventNew.diadiem;
    console.log(this.eventNew);
    if (this.eventNew.noidung) {
      this.errors.noidung = '';
    }
    if (this.eventNew.chutri) {
      this.errors.chutri = '';
    }
    if (this.eventNew.thanhphan) {
      this.errors.thanhphan = '';
    }
    if (this.eventNew.diadiem) {
      this.errors.diadiem = '';
    }
    ///////////////
    if (
      this.eventNew.diadiem &&
      this.eventNew.noidung &&
      this.eventNew.chutri &&
      this.eventNew.thanhphan
    ) {
      this.errors.chutri =
        this.errors.diadiem =
        this.errors.noidung =
        this.errors.thanhphan =
          '';
      try {
        await this.api.httpCall(
          this.api.apiLists.CreateNewEvent,
          {},
          this.eventNew,
          'post',
          true
        );
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Thêm Thành Công',
          showConfirmButton: false,
          timer: 1000,
        });
        this.router.navigate(['/event/event-list']);
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
        this.chosenAssigneelList = [];
        console.log(this.chosenAssigneelList);

        if (
          !this.eventNew.diadiem &&
          !this.eventNew.noidung &&
          !this.eventNew.chutri &&
          !this.eventNew.thanhphan
        ) {
          this.errors.thanhphan = 'Vui lòng nhập vào ô này !';
          this.errors.chutri = 'Vui lòng nhập vào ô này !';
          this.errors.noidung = 'Vui lòng nhập vào ô này !';
          this.errors.diadiem = 'Vui lòng nhập vào ô này !';
        } else {
          if (!this.eventNew.noidung) {
            this.errors.noidung = 'Vui lòng nhập vào ô này !';
          }
          if (!this.eventNew.chutri) {
            this.errors.chutri = 'Vui lòng nhập vào ô này !';
          }
          if (!this.eventNew.thanhphan) {
            this.errors.thanhphan = 'Vui lòng nhập vào ô này !';
          }
          if (!this.eventNew.diadiem) {
            this.errors.diadiem = 'Vui lòng nhập vào ô này !';
            this.eventNew.diadiem == '';
          }
          if (!this.inputDiaDiem && this.readonlyInput == false) {
            this.errors.diadiem = 'Vui lòng nhập vào ô này !';
            this.eventNew.diadiem == '';
          }
        }
      });
    }
  }
}
