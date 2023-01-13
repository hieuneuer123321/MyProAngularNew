import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { WizardComponent } from 'angular-archwizard';
import { GeneralService } from 'src/app/services/general.service';
import data from './new-file-cabinet.language';
import { FileCabinet } from 'src/app/Model/FileCabinet';
import { ApiservicesService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-new-file-cabinet',
  templateUrl: './new-file-cabinet.component.html',
  styleUrls: ['./new-file-cabinet.component.css'],
})
export class NewFileCabinetComponent implements OnInit {
  @ViewChild(WizardComponent)
  public wizard: WizardComponent;
  wizardStep = 0;
  idUpdate;
  spinnerLoading = false;
  tenhoso;
  newfileCabinetData = {
    theloai: 0,
    tenhoso: '',
    danhSachDuocXem: [],
  };
  updatefileCabinetData = {
    idhoso: '',
    theloai: 0,
    tenhoso: '',
    danhSachDuocXem: [],
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
    private router: Router,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    console.log(this.wizardStep);
    this.onAsigneeGroupChange(null);
    if (this.routerAc.snapshot.params['id']) {
      this.idUpdate = this.routerAc.snapshot.params['id'];
      this.getFileCabinetById(this.routerAc.snapshot.params['id']);
    }
  }
  onChange(e) {
    this.onAsigneeGroupChange(e);
  }
  async getFileCabinetById(id) {
    try {
      const filecabinetData: any = await this.api.httpCall(
        this.api.apiLists.FileDetailFromCabinet + `?id=${id}`,
        {},
        {},
        'get',
        true
      );
      if (filecabinetData) {
        this.tenhoso = filecabinetData.tenhoso;
        this.chosenAssigneelList = filecabinetData.danhSachDuocXem;
        this.onAsigneeGroupChangeUpdate(null, this.chosenAssigneelList);
      }
      console.log(filecabinetData);
    } catch (error) {
      console.log(error);
    }
  }
  check() {
    if (!this.tenhoso || this.tenhoso == '') {
      this.generalService.showErrorToast(
        2,
        'Các trường đánh dấu (*) không được bỏ trống'
      );
    } else {
      this.wizard.goToNextStep();
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
  goBack() {
    this._location.back();
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
  dualListUpdateForAssignee(filecabinet) {
    this.allUserInStep2List = filecabinet.leftList;
    this.chosenAssigneelList = filecabinet.rightList;
  }

  handleFileInput(files: FileList) {}
  wizardGoodToGo(numb) {
    this.wizard.goToStep(numb);
  }
  getLabel(key) {
    return data[`${this.generalService.currentLanguage.Code}`][`${key}`];
  }
  async AddFileCabinet() {
    try {
      console.log(this.chosenAssigneelList);
      const arrUserIdDcXem: any = [];
      this.chosenAssigneelList.forEach((item) => {
        arrUserIdDcXem.push(item.userId);
      });
      console.log(arrUserIdDcXem);
      this.newfileCabinetData.danhSachDuocXem = arrUserIdDcXem;
      this.newfileCabinetData.tenhoso = this.tenhoso;
      console.log(this.newfileCabinetData);
      await this.api.httpCall(
        this.api.apiLists.CreateNewFileFromCabinet,
        {},
        this.newfileCabinetData,
        'post',
        true
      );
      this.toaster.success('', 'Thêm Thành Công!', {
        timeOut: 2500,
      });
      this.router.navigate(['/personal/file-cabinet']);
    } catch (e) {
      console.log(e);
      this.toaster.error('', 'Thêm Thất Bại!', {
        timeOut: 2500,
      });
    }
  }
  async UpdateFileCabinet() {
    // {
    //   "idhoso": "string",
    //   "theloai": 0,
    //   "tenhoso": "string",
    //   "danhSachDuocXem": [
    //     "string"
    //   ]
    // }
    Swal.fire({
      title: '<strong>Bạn chắc chắn muốn Sửa ?</strong>',
      icon: 'warning',
      html: `Dữ liệu đã sửa có thể sửa lại được !`,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      reverseButtons: true,
      focusCancel: true,
      cancelButtonText: `Quay lại`,
      confirmButtonText: `Sửa`,
    }).then(async (result) => {
      if (result.value) {
        try {
          console.log(this.chosenAssigneelList);
          this.updatefileCabinetData.idhoso = this.idUpdate;
          const arrUserIdDcXem: any = [];
          this.chosenAssigneelList.forEach((item) => {
            arrUserIdDcXem.push(item.userId);
          });
          console.log(arrUserIdDcXem);
          this.updatefileCabinetData.danhSachDuocXem = arrUserIdDcXem;
          this.updatefileCabinetData.tenhoso = this.tenhoso;
          console.log(this.updatefileCabinetData);
          await this.api.httpCall(
            this.api.apiLists.FilesUpdateFromCabinet,
            {},
            this.updatefileCabinetData,
            'post',
            true
          );
          this.toaster.success('', 'Sửa Thành Công!', {
            timeOut: 2500,
          });
          this.router.navigate(['/personal/file-cabinet']);
        } catch (e) {
          console.log(e);
          this.toaster.error('', 'Sửa Thất Bại!', {
            timeOut: 2500,
          });
        }
      }
    });
  }
}
