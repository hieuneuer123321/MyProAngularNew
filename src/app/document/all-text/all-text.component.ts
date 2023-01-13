import { Component, ElementRef, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import data from './all-text.language';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiservicesService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-all-text',
  templateUrl: './all-text.component.html',
  styleUrls: ['./all-text.component.css'],
})
export class AllTextComponent implements OnInit {
  folderStructure;
  idShowChildren;
  showChi = false;
  authecation = true;
  textList;
  originalTaskList;
  taskList;
  searchKey;
  incomingtextsData;
  count = 500;
  config = {
    id: 'paging',
    itemsPerPage: 0,
    currentPage: 0,
    totalItems: 0,
  };
  currentTab = 'VBDE';
  counts = 10;
  page = 0;
  pageSize = 10;
  pageSizes = [10, 20, 30];
  incomingtextsnamMoi = [];
  incomingtextsDuLieu = ['Giám đốc', 'Trưởng phòng', 'Nhân viên CNTT'];
  //
  groupKeyChosen;
  //----//

  constructor(
    private httpClient: HttpClient,
    private el: ElementRef,
    private formBuilder: FormBuilder,
    public generalService: GeneralService,
    private router: Router,
    private api: ApiservicesService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.taoDuLieu();
    this.tinhNam();
    this.getData(this.currentTab);
    this.getFolder();
  }
  onChange(e: any) {
    console.log(e);
  }
  changeTabs(tab) {
    this.currentTab = tab;
    this.page = 0;
    this.count = 0;
    this.pageSize = this.pageSize;
    console.log(this.currentTab);
    this.getData(this.currentTab);
  }
  showChildren(id) {
    console.log(id);
    if (this.idShowChildren != id) {
      this.showChi = true;
    } else {
      this.idShowChildren = id;
      this.showChi = this.showChi ? false : true;
    }
    this.idShowChildren = id;
  }
  async getFolder() {
    try {
      const dataAPI: any = await this.api.httpCall(
        this.api.apiLists.GetAllDocumentsFolder,
        {},
        {},
        'get',
        true
      );
      this.folderStructure = dataAPI.sort((a, b) => {
        return b.stt - a.stt;
      });
      console.log(this.folderStructure);
    } catch (error) {
      console.log(error);
    }
  }
  async getData(tab) {
    try {
      const dataAPI: any = await this.api.httpCall(
        this.api.apiLists.GetAllDocumentByType + `?type=${tab}`,
        {},
        {},
        'get',
        true
      );
      this.textList = dataAPI.sort((a, b) => {
        return a.stt - b.stt;
      });
      this.config = {
        id: 'paging',
        itemsPerPage: this.pageSize,
        currentPage: this.page,
        totalItems: this.textList.length,
      };
      console.log(this.textList);
    } catch (error) {
      console.log(error.status);
      if (error.status == 403) {
        this.authecation = false;
      }
    }
  }
  getLabel(key) {
    return data[`${this.generalService.currentLanguage.Code}`][`${key}`];
  }
  search() {
    if (this.originalTaskList != null) {
      let self = this;
      if (this.searchKey != '')
        this.taskList = this.originalTaskList.filter(function (v, i) {
          if (
            self
              .removeAccents(v.chude.toLowerCase())
              .indexOf(self.removeAccents(self.searchKey)) >= 0 ||
            self
              .removeAccents(v.nguoiTaoHoTen.toLowerCase())
              .indexOf(self.removeAccents(self.searchKey)) >= 0
          ) {
            return true;
          } else false;
        });
      else this.taskList = Array.from(this.originalTaskList);
    }
  }
  removeAccents(str) {
    var AccentsMap = [
      'aàảãáạăằẳẵắặâầẩẫấậ',
      'AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ',
      'dđ',
      'DĐ',
      'eèẻẽéẹêềểễếệ',
      'EÈẺẼÉẸÊỀỂỄẾỆ',
      'iìỉĩíị',
      'IÌỈĨÍỊ',
      'oòỏõóọôồổỗốộơờởỡớợ',
      'OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ',
      'uùủũúụưừửữứự',
      'UÙỦŨÚỤƯỪỬỮỨỰ',
      'yỳỷỹýỵ',
      'YỲỶỸÝỴ',
    ];
    for (var i = 0; i < AccentsMap.length; i++) {
      var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
      var char = AccentsMap[i][0];
      str = str.replace(re, char);
    }
    return str;
  }
  taoDuLieu() {
    // this.api
    //   .get('https://6315b3ad33e540a6d382505e.mockapi.io/giatrimoi')
    //   .subscribe((x) => {
    //     this.incomingtextsData = x;
    //     this.config = {
    //       id: 'paging',
    //       itemsPerPage: this.pageSize,
    //       currentPage: this.page,
    //       totalItems: this.incomingtextsData.length,
    //     };
    //   });
    // console.log(this.incomingtextsData);
  }
  //--//
  tinhNam() {
    for (let i = 0; i <= 20; i++) {
      this.incomingtextsnamMoi.push(2022 - i);
    }
  }
  handlePageChange(event): void {
    this.page = event;
    this.taoDuLieu();
  }
  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 0;
    this.taoDuLieu();
  }
  //---//
  layThoiGianChenhLech(date: string) {
    const ngayHienTai = new Date().getTime();
    const ngayNhap = new Date(date).getTime();
    const phutNgayHienTai = new Date().getMinutes();
    const phutNgayTruyenVao = new Date(date).getMinutes();
    const millisBetween = ngayHienTai - ngayNhap;
    const days = millisBetween / (1000 * 3600 * 24);
    const result = Math.round(Math.abs(days));
    if (result == 1) {
      return 'Hôm qua';
    } else if (result == 0) {
      if (
        // Math.abs(phutNgayHienTai - phutNgayTruyenVao) <= 59 &&
        // Math.abs(new Date().getHours() - new Date(date).getHours()) == 1
        new Date().getHours() == new Date(date).getHours()
      ) {
        const phutNgayHienTai = new Date().getMinutes();
        const phutNgayTruyenVao = new Date(date).getMinutes();
        if (Math.abs(60 - Math.abs(phutNgayHienTai - phutNgayTruyenVao)) == 60)
          return 'Bây Giờ';
        else
          return (
            Math.abs(Math.abs(phutNgayHienTai - phutNgayTruyenVao)) +
            ' phút trước'
          );
      } else {
        const gioNgayHienTai = new Date().getHours();
        const gioNgayTruyenVao = new Date(date).getHours();
        return (
          Math.abs(Math.abs(gioNgayHienTai - gioNgayTruyenVao)) + ' giờ trước'
        );
      }
      // return `${new Date(date).getDate()}/${new Date(
      //   date
      // ).getMonth()}/${new Date(date).getFullYear()}`;
    } else {
      return result + ' ngày trước';
    }
  }
  //
  showDetail(id) {
    this.router.navigate([`/document/detail-document/${id}`]);
  }
  openNewDocument(loai) {
    this.router.navigate([`/document/new-document/${loai}`]);
  }
}
