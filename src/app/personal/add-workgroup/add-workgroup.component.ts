import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiservicesService } from 'src/app/services/api.service';
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
  idUpdate: any;
  detailGroup;
  constructor(
    private formBuilder: FormBuilder,
    public generalService: GeneralService,
    public api: ApiservicesService,
    public routerAc: ActivatedRoute,
    private router: Router,
    private toaster: ToastrService
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
    if (this.routerAc.snapshot.params['id']) {
      this.idUpdate = this.routerAc.snapshot.params['id'];
      this.getDetailGroup(this.routerAc.snapshot.params['id']);
    }
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
  async addGroup() {
    this.submitted = true;
    const convertArrDS = [];
    this.dsChiaSe.forEach((item) => {
      convertArrDS.push(item.userId);
    });

    // console.log(obj);
    if (this.addForm.valid) {
      const obj = {
        tennhom: this.addForm.value.name,
        chk: '0',
        danhSachUsers: convertArrDS,
      };
      console.log(obj);
      try {
        await this.api.httpCall(
          this.api.apiLists.CreateWorkingGroup,
          {},
          obj,
          'post',
          true
        );
        this.toaster.success('', 'Thêm Thành Công!', {
          timeOut: 2500,
        });
        this.router.navigate(['/personal/business-card']);
      } catch (error) {
        console.log(error);
        this.toaster.error('', 'Thêm Thất Bại', {
          timeOut: 2500,
        });
      }
    } else {
      console.log('lỗi');
    }
  }
  async getDetailGroup(id) {
    try {
      this.detailGroup = await this.api.httpCall(
        this.api.apiLists.DetailWorkingGroup + `?id=${id}`,
        {},
        {},
        'get',
        true
      );
      if (this.detailGroup) {
        // this.tenhoso = filecabinetData.tenhoso;
        this.chosenAssigneelList = this.detailGroup.danhSachUsers;
        this.dsChiaSe = this.detailGroup.danhSachUsers;
        this.onAsigneeGroupChangeUpdate(null, this.chosenAssigneelList);
        this.addForm = this.formBuilder.group({
          name: [this.detailGroup.tennhom, [Validators.required]],
        });
      } else {
        this.router.navigate(['/personal/business-card']);
      }
    } catch (error) {
      console.log(error);
    }
  }
  filterItemvsArr(arr1, arr2) {
    const arrtemp = [];
    arr2.forEach((i) => {
      arrtemp.push(arr1.find((item) => item.userId == i.userId));
    });
    return arrtemp;
  }
  onAsigneeGroupChangeUpdate(e, values) {
    console.log(e);
    if (e == null || this.groupKeyChosenInStep2 == 'all') {
      (this.allUserInStep2List = this.generalService.cloneAnything(
        this.generalService.allUsers
      )),
        (this.chosenAssigneelList = this.filterItemvsArr(
          this.generalService.cloneAnything(this.generalService.allUsers),
          values
        ));
    } else {
      this.allUserInStep2List = this.generalService.allUsersWithGroups[`${e}`];
    }

    if (values) {
    }
  }
  async updateGroup() {
    this.submitted = true;
    const convertArrDS = [];
    this.dsChiaSe.forEach((item) => {
      convertArrDS.push(item.userId);
    });

    // console.log(obj);
    if (this.addForm.valid) {
      const obj = {
        idnhom: this.idUpdate,
        tennhom: this.addForm.value.name,
        chk: '0',
        danhSachUsers: convertArrDS,
      };
      console.log(obj);
      try {
        await this.api.httpCall(
          this.api.apiLists.UpdateWorkingGroup,
          {},
          obj,
          'post',
          true
        );
        this.toaster.success('', 'Sửa Thành Công!', {
          timeOut: 2500,
        });
        this.router.navigate(['/personal/business-card']);
      } catch (error) {
        console.log(error);
        this.toaster.error('', 'Sửa Thất Bại', {
          timeOut: 2500,
        });
      }
    } else {
      console.log('lỗi');
    }
  }
  async deleteGroup() {
    try {
      await this.api.httpCall(
        this.api.apiLists.DeleteWorkingGroup + `?groupId=${this.idUpdate}`,
        {},
        {},
        'post',
        true
      );
      this.toaster.success('', 'Xóa Thành Công!', {
        timeOut: 2500,
      });
      this.router.navigate(['/personal/business-card']);
    } catch (error) {
      console.log(error);
      this.toaster.error('', 'Xóa Thất Bại', {
        timeOut: 2500,
      });
    }
  }
}
