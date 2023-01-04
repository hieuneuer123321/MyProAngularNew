import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-add-workgroup',
  templateUrl: './add-workgroup.component.html',
  styleUrls: ['./add-workgroup.component.css'],
})
export class AddWorkgroupComponent implements OnInit {
  state = {
    name: '',
  };
  submitted = false;
  error: {};
  chosenAssigneelList: any[] = [];
  allUserInStep2List;
  majorAssignee;
  groupKeyChosenInStep2 = 'all';
  dsChiaSe;
  constructor(
    private formBuilder: FormBuilder,
    public generalService: GeneralService,

    private router: Router
  ) {}
  addForm = this.formBuilder.group({
    name: ['', [Validators.required]],
  });
  get a() {
    return this.addForm.controls;
  }
  cancel() {
    this.router.navigate(['/personal/business-card']);
  }
  onChange(e) {
    this.onAsigneeGroupChange(e);
  }
  ngOnInit(): void {
    this.onAsigneeGroupChange(null);
  }
  get f() {
    return this.addForm.controls;
  }
  resetDs() {
    this.dualListUpdateForAssignee(null);
    this.chosenAssigneelList = [];
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
  dualListUpdateForAssignee(newevent) {
    console.log(newevent);
    if (newevent) {
      this.allUserInStep2List = newevent.leftList;
      this.chosenAssigneelList = newevent.rightList;
      this.dsChiaSe = newevent.rightList;
    } else {
      this.chosenAssigneelList = [];
    }
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
  addGroup() {
    this.submitted = true;
    const obj = {
      name: this.state.name,
    };
    // console.log(obj);
    if (this.addForm.valid) {
      console.log(this.addForm.value);
      console.log(this.dsChiaSe);
    } else {
      console.log('lỗi');
    }
  }
}
