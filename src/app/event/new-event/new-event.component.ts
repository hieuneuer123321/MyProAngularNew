import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { WizardComponent } from 'angular-archwizard';
import { GeneralService } from 'src/app/services/general.service';
import { ApiservicesService } from 'src/app/services/api.service';
import dateFormat, { masks } from 'dateformat';
import { Event_Week } from 'src/app/Model/Event_Week';
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

  chosenAssigneelList: any[] = [];
  allUserInStep2List;
  majorAssignee;
  groupKeyChosenInStep2 = 'all';
  constructor(
    private _location: Location,
    public generalService: GeneralService,
    private api: ApiservicesService
  ) {}

  ngOnInit(): void {
    console.log(this.wizardStep);
    this.onAsigneeGroupChange(null);
    this.dualListUpdateForAssignee(null);
    this.gData();
    this.getListLocationAll();
    const now = new Date();
    this.dateStart = dateFormat(now, 'isoDate');
    this.dateEnd = dateFormat(now, 'isoDate');
    const test = dateFormat(now, 'isoTime');
    this.hourStart = test.substring(0, 5);
    this.hourEnd = test.substring(0, 5);
    this.eventNew.diadiem = '0';
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
    values == '0'
      ? ((this.readonlyInput = false),
        (this.checkDiaDiem = false),
        (this.inputDiaDiem = this.eventNew.diadiem))
      : ((this.readonlyInput = true), (this.checkDiaDiem = true));
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
  onAsigneeGroupChange(e) {
    console.log(this.groupKeyChosenInStep2);
    if (e == null || this.groupKeyChosenInStep2 == 'all') {
      this.allUserInStep2List = this.generalService.cloneAnything(
        this.generalService.allUsers
      );
    } else {
      this.allUserInStep2List =
        this.generalService.allUsersWithGroups[`${this.groupKeyChosenInStep2}`];
    }
  }
  dualListUpdateForAssignee(event) {
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
  finish() {}
}
