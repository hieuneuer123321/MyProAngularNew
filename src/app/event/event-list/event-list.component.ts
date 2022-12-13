import { Component, ElementRef, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { HttpClient } from '@angular/common/http';
import data from './event.language';
import { Router } from '@angular/router';
import { Event } from 'src/app/Model/Event';
import { ApiservicesService } from 'src/app/services/api.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent implements OnInit {
  date14: Date;
  EventNotApproved;
  editable = true;
  eventDetail = {
    date: '',
    title: '',
    description: '',
    location: '',
    time_start: '',
    time_end: '',
    status: null,
  };
  eventSandbox;
  currentTab = true;

  spinnerLoading = false;
  eventListData;
  page = 0;
  pageSize = 10;
  pageSizes = [5, 10, 15];
  count = 500;

  config;
  constructor(
    private httpClient: HttpClient,
    private el: ElementRef,
    public generalService: GeneralService,
    private router: Router,
    private _location: Location,
    private api: ApiservicesService
  ) {}

  ngOnInit(): void {
    this.gData(1);
  }
  getDate(date: string) {
    const Newdate = new Date(date);
    const dateDate = Newdate.toDateString();
    const ngay = dateDate.substring(0, 3);
    let thu;
    switch (ngay) {
      case 'Mon':
        thu = 'Thứ Hai';
        break;
      case 'Tue':
        thu = 'Thứ Ba';
        break;
      case 'Wed':
        thu = 'Thứ Tư';
        break;
      case 'Thu':
        thu = 'Thứ Năm';
        break;
      case 'Fri':
        thu = 'Thứ Sáu';
        break;
      case 'Sat':
        thu = 'Thứ bảy';
        break;
      case 'Sun':
        thu = 'Chủ Nhật';
    }
    return thu;
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
        Math.abs(phutNgayHienTai - phutNgayTruyenVao) <= 59 &&
        Math.abs(new Date().getHours() - new Date(date).getHours()) == 1
      ) {
        const phutNgayHienTai = new Date().getMinutes();
        const phutNgayTruyenVao = new Date(date).getMinutes();
        return (
          Math.abs(60 - Math.abs(phutNgayHienTai - phutNgayTruyenVao)) +
          ' phút trước'
        );
      } else {
        const gioNgayHienTai = new Date().getHours();
        const gioNgayTruyenVao = new Date(date).getHours();
        console.log(phutNgayHienTai, phutNgayTruyenVao);
        return (
          Math.abs(Math.abs(gioNgayHienTai - gioNgayTruyenVao)) + ' giờ trước'
        );
      }
    } else if (result > 1) {
      return result + ' ngày trước';
    } else return result;
    //   Math.abs(60 - Math.abs(phutNgayHienTai - phutNgayTruyenVao)) <= 59 &&
    //   new Date().getHours() == new Date(date).getHours()
    // ) {
    //   const phutNgayHienTai = new Date().getMinutes();
    //   const phutNgayTruyenVao = new Date(date).getMinutes();

    //   return (
    //     Math.abs(60 - Math.abs(phutNgayHienTai - phutNgayTruyenVao)) +
    //     ' phút trước'
    //   );
    // } else if (
    //   result == 0 &&
    //   Math.abs(60 - Math.abs(phutNgayHienTai - phutNgayTruyenVao)) >= 60 &&
    //   new Date().getHours() != new Date(date).getHours()
    // ) {
    //   const phutNgayHienTai = new Date().getMinutes();
    //   const phutNgayTruyenVao = new Date(date).getMinutes();
    //   console.log(phutNgayHienTai, phutNgayTruyenVao);
    //   return 60 + (phutNgayHienTai - phutNgayTruyenVao) + ' giờ trước';
    // } else {
    //   return result + ' ngày trước';
    // }
  }
  seeDetail(obj) {
    this.editable = true;
    this.eventDetail = { ...obj };
  }
  editEvent() {
    this.editable = false;
    this.eventSandbox = { ...this.eventDetail };
  }
  cancelEditEvent() {
    this.editable = true;
    this.eventDetail = { ...this.eventSandbox };
  }
  changeTabs(tab) {
    this.currentTab = tab;
    this.page = 0;
    this.count = 0;
    this.pageSize = 10;
    console.log(tab);
    if (tab) {
      this.gData(1);
    } else {
      this.gData(0);
    }
  }
  goBack() {
    this._location.back();
  }
  openNewEvent() {
    this.router.navigate(['/event/new-event']);
  }
  async gData(n: number) {
    this.spinnerLoading = true;
    this.EventNotApproved = await this.api.httpCall(
      this.api.apiLists.GetAllEventByType + `?type=${n}`,
      {},
      {},
      'get',
      true
    );
    this.EventNotApproved = this.EventNotApproved.reverse();
    console.log(this.EventNotApproved);
    this.config = {
      id: 'paging',
      itemsPerPage: this.pageSize,
      currentPage: this.page,
      totalItems: this.EventNotApproved.length,
    };
    this.spinnerLoading = false;
  }
  handlePageChange(event): void {
    this.page = event;
    this.gData(0);
  }
  showDSLQ(idLichTuan: any) {
    console.log(idLichTuan);
  }
  getLabel(key) {
    return data[`${this.generalService.currentLanguage.Code}`][`${key}`];
  }
  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 0;
    this.gData(0);
  }
}
