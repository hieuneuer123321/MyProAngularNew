import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css']
})
export class TopicDetailComponent implements OnInit {

  constructor(public generalService:GeneralService) { }

  ngOnInit(): void {
    this.onWatchableGroupChange(null)
  }
  editorConfig: AngularEditorConfig = {
    height: '150px',
    editable: true
  }
  allUserInStep3List
  chosenWatchablelList: any[] = [
  ];
  groupKeyChosenInStep3 = 'all'
  isUrgentTask = false;
  dualListUpdateForWatchable(event) {
    this.allUserInStep3List = event.leftList; this.chosenWatchablelList = event.rightList
  }
  onWatchableGroupChange(e) {
    console.log(this.groupKeyChosenInStep3);
    if (e == null || this.groupKeyChosenInStep3 == 'all') {
      this.allUserInStep3List = this.generalService.cloneAnything(this.generalService.allUsers);
    }
    else {
      this.allUserInStep3List = this.generalService.allUsersWithGroups[`${this.groupKeyChosenInStep3}`]
    }
  }
}
