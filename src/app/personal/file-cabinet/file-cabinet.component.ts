import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { HttpClient } from '@angular/common/http';
import data from './file-cabinet.language';
import { FileCabinet } from 'src/app/Model/FileCabinet';
import { ApiservicesService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-file-cabinet',
  templateUrl: './file-cabinet.component.html',
  styleUrls: ['./file-cabinet.component.css'],
})
export class FileCabinetComponent implements OnInit {
  editable = true;
  fileCabinetList;
  fileCabinetListShare;
  filecabinetDetail = {
    date: '',
    title: '',
    description: '',
    location: '',
    time_start: '',
    time_end: '',
    status: null,
  };
  filecabinetSandbox;
  currentTab = true;

  spinnerLoading = false;
  filecabinetData: any;
  page = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15];
  count = 500;
  pageShare = 0;
  pageSizeShare = 5;
  pageSizesShare = [5, 10, 15];
  countShare = 500;
  configShare;
  config = {
    id: 'paging',
    itemsPerPage: 0,
    currentPage: 0,
    totalItems: 0,
  };
  constructor(
    private httpClient: HttpClient,
    public generalService: GeneralService,
    private router: Router,
    public api: ApiservicesService,
    public routerAc: ActivatedRoute,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.gData();
  }
  seeDetail(id) {
    this.router.navigate([`/personal/file-cabinet/${id}`]);
  }
  editEvent() {
    this.editable = false;
    this.filecabinetSandbox = { ...this.filecabinetDetail };
  }
  cancelEditEvent() {
    this.editable = true;
    this.filecabinetDetail = { ...this.filecabinetSandbox };
  }
  changeTabs(tab) {
    this.currentTab = tab;
    this.page = 0;
    this.count = 0;
    this.pageSize = 10;
    this.gData();
  }
  openNewFileCabinet(): void {
    this.router.navigate(['/personal/new-file-cabinet']);
  }
  async gData() {
    this.spinnerLoading = true;
    try {
      const allFile: any = await this.api.httpCall(
        this.api.apiLists.GetFilesFromCabinet,
        {},
        {},
        'get',
        true
      );
      this.fileCabinetList = allFile.reverse();
      const dataAll: any = await this.api.httpCall(
        this.api.apiLists.GetSharingFilesFromCabinet,
        {},
        {},
        'get',
        true
      );
      const cabinetListShare: any = dataAll.filter((item) => {
        return item.nguoiTao.userId != this.generalService.currentUser.userId;
      });
      this.fileCabinetListShare = cabinetListShare.reverse();
      console.log(this.fileCabinetListShare);
      this.configShare = {
        id: 'paging2',
        itemsPerPage: this.pageSizeShare,
        currentPage: this.pageShare,
        totalItems: this.fileCabinetListShare.length,
      };
      this.config = {
        id: 'paging',
        itemsPerPage: this.pageSize,
        currentPage: this.page,
        totalItems: this.fileCabinetList.length,
      };
    } catch (error) {
      console.log(error);
    }
    this.spinnerLoading = false;
  }
  // async gDataShare() {
  //   this.spinnerLoading = true;
  //   try {
  //     this.fileCabinetListShare = await this.api.httpCall(
  //       this.api.apiLists.GetSharingFilesFromCabinet,
  //       {},
  //       {},
  //       'get',
  //       true
  //     );
  //     this.configShare = {
  //       id: 'paging2',
  //       itemsPerPage: this.pageSizeShare,
  //       currentPage: this.pageShare,
  //       totalItems: this.fileCabinetListShare.length,
  //     };
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   this.spinnerLoading = false;
  // }
  handlePageChange(event): void {
    this.page = event;
    this.gData();
  }
  handlePageChangeShare(event): void {
    this.pageShare = event;
    this.gData();
  }
  getLabel(key) {
    return data[`${this.generalService.currentLanguage.Code}`][`${key}`];
  }
  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 0;
    this.gData();
  }
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
}
