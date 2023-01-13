import dateFormat, { masks } from 'dateformat';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { ArchwizardModule } from 'angular-archwizard';
import { WizardComponent } from 'angular-archwizard';
import { ApiservicesService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Document } from 'src/app/Model/Document';

@Component({
  selector: 'app-new-document',
  templateUrl: './new-document.component.html',
  styleUrls: ['./new-document.component.css'],
})
export class NewDocumentComponent implements OnInit {
  @ViewChild(WizardComponent)
  public wizard: WizardComponent;
  textSourceList;
  folderStructure;
  newDocumentData = new Document();
  chosenAssigneelList: any[] = [];
  allUserInStep2List;
  majorAssignee;
  typeDocument = '';
  groupKeyChosenInStep2 = 'all';
  constructor(
    public generalService: GeneralService,
    public api: ApiservicesService,
    public routerAc: ActivatedRoute,
    private router: Router,
    private toaster: ToastrService
  ) {}
  ngOnInit(): void {
    console.log(
      this.routerAc.snapshot.params['loai'] == 'VBNO' ||
        this.routerAc.snapshot.params['loai'] == 'VBDI'
    );
    if (
      this.routerAc.snapshot.params['loai'] == 'VBDE' ||
      this.routerAc.snapshot.params['loai'] == 'VBDI' ||
      this.routerAc.snapshot.params['loai'] == 'VBNO'
    ) {
      this.typeDocument = this.routerAc.snapshot.params['loai'];
    } else {
      this.router.navigate(['/document/all-text']);
    }

    const now = new Date();
    this.newDocumentData.stt = 1;
    this.newDocumentData.ngayKy = dateFormat(now, 'isoDate');
    this.newDocumentData.ngayGui = dateFormat(now, 'isoDate');
    this.newDocumentData.ngayNhan = dateFormat(now, 'isoDate');
    this.newDocumentData.thoiHanXuLy = dateFormat(now, 'isoDate');
    this.dualListUpdateForAssignee(null);
    this.onAsigneeGroupChange(null, this.chosenAssigneelList);
    this.getSource();
    this.getFolder();
  }
  //// Chuyển đổi người thực hiện
  folderPa(value) {
    if (value) return 'bold';
    else return;
  }
  onChange(e: any) {
    this.newDocumentData.luuHoSo = e;
  }
  filterItemvsArr(arr1, arr2) {
    const arrtemp = [];
    if (arr2 && arr2.length > 0) {
      arr2.forEach((i) => {
        arrtemp.push(arr1.find((item) => item.userId == i.uid));
      });
      return arrtemp;
    } else return [];
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
    } else {
      this.chosenAssigneelList = [];
    }
    console.log(this.chosenAssigneelList);
  }
  checkValidate() {
    this.wizard.goToNextStep();
  }
  async getSource() {
    try {
      const dataAPI: any = await this.api.httpCall(
        this.api.apiLists.GetAllSourceDocuments,
        {},
        {},
        'get',
        true
      );
      console.log(dataAPI);
      this.textSourceList = dataAPI.sort((a, b) => {
        return a.stt - b.stt;
      });
    } catch (error) {
      console.log(error);
    }
  }
  async getFolder() {
    try {
      const arrTemp = [];
      const dataAPI: any = await this.api.httpCall(
        this.api.apiLists.GetAllDocumentsFolder,
        {},
        {},
        'get',
        true
      );
      dataAPI.forEach((element) => {
        arrTemp.push(element);
        if (element.childNode.length > 0) {
          element.childNode.forEach((item) => {
            arrTemp.push(item);
          });
        }
      });
      this.folderStructure = arrTemp;
      console.log(this.folderStructure);
    } catch (error) {
      console.log(error);
    }
  }
  changeSource(value) {
    this.newDocumentData.nguonVanBan = value;
  }
  changeFile(value) {
    this.newDocumentData.loaiVanBan = value;
  }
  labelTpyeDocument(type) {
    if (type == 'VBDE') return 'Văn Bản Đến';
    else if (type == 'VBDI') return 'Văn Bản Đi';
    else return 'Văn Bản Nội Bộ';
  }
  async addDocument() {
    this.newDocumentData.kieuVanBan = this.typeDocument;
    this.newDocumentData.xuLyVanBan =
      this.majorAssignee && this.majorAssignee.length > 0
        ? this.majorAssignee[0].userId
        : '';
    const arrTemp = [];
    this.chosenAssigneelList.forEach((a) => arrTemp.push(a.userId));
    this.newDocumentData.danhSachXem = arrTemp;

    console.log(this.newDocumentData);
    try {
      await this.api.httpCall(
        this.api.apiLists.CreateNewDocuments,
        {},
        this.newDocumentData,
        'post',
        true
      );
      this.router.navigate(['/document/all-text']);
      this.toaster.success('', 'Thêm Thành Công!', {
        timeOut: 2500,
      });
    } catch (error) {
      this.toaster.error('', 'Thêm Thất Bại!', {
        timeOut: 2500,
      });
    }
  }
}
