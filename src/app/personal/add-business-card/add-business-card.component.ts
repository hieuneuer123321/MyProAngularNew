import { Component, OnInit } from '@angular/core';
import data from './add-business-card.language';
import { GeneralService } from 'src/app/services/general.service';
import { WizardComponent } from 'angular-archwizard';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-business-card',
  templateUrl: './add-business-card.component.html',
  styleUrls: ['./add-business-card.component.css']
})
export class AddBusinessCardComponent implements OnInit {
  public wizard: WizardComponent;
  wizardStep = 0;
  spinnerLoading = false;
  newfileCabinetData = {
    
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
  constructor(private _location: Location, public generalService: GeneralService) { }

  ngOnInit(): void {
    console.log(this.wizardStep)
    this.onAsigneeGroupChange(null)
    
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

  getLabel(key) {
    return data[`${this.generalService.currentLanguage.Code}`][`${key}`]
  }
}
