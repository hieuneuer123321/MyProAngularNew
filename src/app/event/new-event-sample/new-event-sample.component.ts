import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { WizardComponent } from 'angular-archwizard';
import { GeneralService } from 'src/app/services/general.service';
import { DatePipe } from '@angular/common';
import { ApiservicesService } from 'src/app/services/api.service';
import { EventSample } from 'src/app/Model/Event_Sample';
import dateFormat, { masks } from 'dateformat';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-new-event-sample',
  templateUrl: './new-event-sample.component.html',
  styleUrls: ['./new-event-sample.component.css'],
})
export class NewEventSampleComponent implements OnInit {
  @ViewChild(WizardComponent)
  public wizard: WizardComponent;
  locationListAll;
  evenSample = new EventSample();
  dateStart = new Date();
  dateEnd = new Date();
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
    this.onAsigneeGroupChange(null);
    console.log(this.generalService);
    this.dualListUpdateForAssignee(null);
    this.getListLocationAll();

    // Wed, 22 Dec 2021 00:31:25 GMT

    // T4 ngày 22/12/2021
  }
  changeLapLai(value) {
    this.evenSample.laplai = value;
  }
  changeDiaDiem(values: any) {
    this.evenSample.diadiem = values;
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
  goBack() {
    this._location.back();
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
  onChange(e: any) {
    this.onAsigneeGroupChange(e);
  }
  onChangeUser(e: any) {
    console.log(e);
  }
  dualListUpdateForAssignee(event) {
    console.log(event);
    if (event) {
      this.allUserInStep2List = event.leftList;
      this.chosenAssigneelList = event.rightList;
      this.evenSample.dsLienQuan = event.rightList;
    } else {
      this.chosenAssigneelList = [];
    }
    console.log(this.chosenAssigneelList);
    // if (this.groupKeyChosenInStep2 == 'all') {
    //   for (let i = 0; i < this.allUserInStep2List.length; ++i) {
    //     if (
    //       !this.containsObject(
    //         this.allUserInStep2List[i],
    //         this.generalService.allUsers
    //       )
    //     )
    //       this.allUserInStep2List.splice(i, 1);
    //   }
    // } else {
    //   for (let i = 0; i < this.allUserInStep2List.length; ++i) {
    //     if (
    //       !this.containsObject(
    //         this.allUserInStep2List[i],
    //         this.generalService.allUsersWithGroups[
    //           `${this.groupKeyChosenInStep2}`
    //         ]
    //       )
    //     )
    //       this.allUserInStep2List.splice(i, 1);
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
  finish() {}
  async addEventSample() {
    /// format date time start
    const date = new Date(this.dateStart);
    const hourS = this.hourStart;
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = Number(hourS.substring(0, 2));
    const minute = Number(hourS.substring(5, 7));
    const newDateStart = new Date(year, month, day, hour, minute);
    const dateTimeFormatter = dateFormat(newDateStart, 'isoUtcDateTime');
    console.log(dateTimeFormatter);
    ////format date time end
    const date2 = new Date(this.dateEnd);
    const hourS2 = this.hourEnd;
    const year2 = date2.getFullYear();
    const month2 = date2.getMonth() + 1;
    const day2 = date2.getDate();
    const hour2 = Number(hourS2.substring(0, 2));
    const minute2 = Number(hourS2.substring(5, 7));
    const newDateEnd = new Date(year2, month2, day2, hour2, minute2);
    const dateTimeFormatter2 = dateFormat(newDateEnd, 'isoUtcDateTime');
    this.evenSample.tgbatdau = dateTimeFormatter;
    this.evenSample.tgketthuc = dateTimeFormatter2;
    const arrUserId = [];
    this.evenSample.dsLienQuan.forEach((i) => {
      arrUserId.push(i.userId);
    });
    this.evenSample.dsLienQuan = arrUserId;
    console.log(this.evenSample);

    try {
      await this.api.httpCall(
        this.api.apiLists.AddNewEventSample,
        {},
        this.evenSample,
        'post',
        true
      );
      this.router.navigate(['/event/event-sample']);
    } catch (e) {
      console.log(e);
    }
  }
}
