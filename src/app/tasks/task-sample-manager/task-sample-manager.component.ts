import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
@Component({
  selector: 'app-task-sample-manager',
  templateUrl: './task-sample-manager.component.html',
  styleUrls: ['./task-sample-manager.component.css']
})
export class TaskSampleManagerComponent implements OnInit {

  constructor(private generalService: GeneralService) { }

  ngOnInit(): void {
    this.onAsigneeGroupChange(null)
  }

  allUserInStep2List
  chosenAssigneelList
  majorAssignee
  groupKeyChosenInStep2 = 'all'
  dualListUpdateForAssignee(event) {
    this.allUserInStep2List = event.leftList; this.chosenAssigneelList = event.rightList
    if (this.majorAssignee != null) {
      let check = false;
      for (let i = 0; i < this.chosenAssigneelList.length; ++i) {
        if (this.majorAssignee == this.chosenAssigneelList[i]) { check = true; break; }
      }
      if (!check)
        this.majorAssignee = null
    }
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
}
