import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { WizardComponent } from 'angular-archwizard';
import { GeneralService } from 'src/app/services/general.service';
import data from './sign-process.language';

@Component({
  selector: 'app-sign-process',
  templateUrl: './sign-process.component.html',
  styleUrls: ['./sign-process.component.css']
})
export class SignProcessComponent implements OnInit {
 
  @ViewChild(WizardComponent)
  public wizard: WizardComponent;
  wizardStep = 0;
  spinnerLoading = false;
  signProcessData = {
    title:'',
    description: '',
    location: '',
    invited: '',
    note: '',
    file: []
  }
  chosenAssigneelList: any[] = [];
  allUserInStep2List
  majorAssignee
  groupKeyChosenInStep2 = 'all'
  constructor(private _location: Location, public generalService: GeneralService,) { }

  ngOnInit(): void {
    console.log(this.wizardStep)
    this.onAsigneeGroupChange(null)
  }
  check(){
    if (this.signProcessData.title===''||this.signProcessData.description===''){
      this.generalService.showErrorToast(2, 'Các trường đánh dấu (*) không được bỏ trống');
    }
    else{
      this.wizard.goToNextStep()
    }
  }
  goBack() {
    this._location.back();
  }
  onAsigneeGroupChange(e) {
    console.log(this.groupKeyChosenInStep2);
    if (e == null || this.groupKeyChosenInStep2 == 'all') {
      this.allUserInStep2List = this.generalService.cloneAnything(this.generalService.allUsers);
    }
    else {
      this.allUserInStep2List = this.generalService.allUsersWithGroups[`${this.groupKeyChosenInStep2}`]
    }
  }
  dualListUpdateForAssignee(signprocess) {
    this.allUserInStep2List = signprocess.leftList;
    this.chosenAssigneelList = signprocess.rightList
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
        if (this.majorAssignee == this.chosenAssigneelList[i]) { check = true; break; }
      }
      if (!check)
        this.majorAssignee = null
    }
  }
  removeFile(index) {
    this.signProcessData.file.splice(index, 1)
    const dt = new DataTransfer()
    const input = document.getElementById('fileList') as HTMLInputElement
    const { files } = input

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (index !== i)
        dt.items.add(file) // here you exclude the file. thus removing it.
    }

    input.files = dt.files
  }
  handleFileInput(files: FileList) {
    this.signProcessData.file = Array.from(files);
    console.log(files)
  }
  wizardGoodToGo(numb) {
    this.wizard.goToStep(numb);
  }
  getLabel(key) {
    return data[`${this.generalService.currentLanguage.Code}`][`${key}`]
  }
  finish() {

  }

}
