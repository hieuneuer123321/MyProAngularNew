import { Component, ElementRef, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { HttpClient } from '@angular/common/http';
import data from './event.language';
import { Router } from '@angular/router';
import { Event } from 'src/app/Model/Event';
import { ApiservicesService } from 'src/app/services/api.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent implements OnInit {
  date14: Date;
  masterSelectedApproved: boolean;
  masterSelectedNotApproved: boolean;
  checkListNotApproved: Array<any> = [];
  test = 'line-through';
  checkListApproved: Array<any> = [];
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
  ) {
    this.masterSelectedApproved = false;
    this.masterSelectedNotApproved = false;
  }

  ngOnInit(): void {
    this.gData(1);
  }
  checkhuy(string) {
    if (string == '0') {
      return 'none';
    } else return 'line-through';
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
      } else if (
        Math.abs(phutNgayHienTai - phutNgayTruyenVao) > 59 &&
        Math.abs(new Date().getHours() - new Date(date).getHours()) != 1
      ) {
        const gioNgayHienTai = new Date().getHours();
        const gioNgayTruyenVao = new Date(date).getHours();
        return (
          Math.abs(Math.abs(gioNgayHienTai - gioNgayTruyenVao)) + ' giờ trước'
        );
      }
      return (
        60 -
        Math.abs(60 - Math.abs(phutNgayHienTai - phutNgayTruyenVao)) +
        ' phút trước'
      );
    } else {
      return result + ' ngày trước';
    }
  }
  CancelEvent(id: any) {
    console.log(id);
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
    // this.EventNotApproved.filter((i) => i.pheduyet == '0').forEach((item) => {
    //   this.checkListNotApproved.push({
    //     id: item.lichtuanid,
    //     isSelected: false,
    //   });
    // });
    // this.EventNotApproved.filter((i) => i.pheduyet == '1').forEach((item) => {
    //   this.checkListApproved.push({
    //     id: item.lichtuanid,
    //     isSelected: false,
    //   });
    // });
    //  ( n == 0)
    //     ? (this.EventNotApproved.status = this.checkListApproved)
    //     : this.checkListNotApproved;

    this.EventNotApproved.forEach((i) => {
      i.status = false;
    });
    console.log(this.EventNotApproved);
    this.spinnerLoading = false;
  }
  handlePageChange(event): void {
    this.page = event;
    this.gData(0);
  }
  showDSLQ(arrList: any) {
    console.log(arrList);
    let html = '';
    arrList.forEach((item) => {
      html = html + item.hoTen + `<br>`;
    });
    Swal.fire({
      title: '<strong style="color: blue">Danh sách liên quan</strong>',
      html: `<b>${html} </b> `,
      showCancelButton: false,
      focusCancel: false,
    });
  }
  getLabel(key) {
    return data[`${this.generalService.currentLanguage.Code}`][`${key}`];
  }
  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 0;
    this.gData(0);
  }

  /// check
  onChangeChecked(check, values) {
    console.log(check, values);
    if (this.currentTab) {
      if (check) {
        this.checkListApproved.push(values);
      } else {
        if (this.checkListApproved.filter((i) => i == values).length > 0) {
          const arrTam = this.checkListApproved.filter((i) => i != values);
          this.checkListApproved = arrTam;
        } else return false;
      }
    } else {
      if (check) {
        this.checkListNotApproved.push(values);
      } else {
        if (this.checkListNotApproved.filter((i) => i == values).length > 0) {
          const arrTam = this.checkListNotApproved.filter((i) => i != values);
          this.checkListNotApproved = arrTam;
        } else return false;
      }
    }
    console.log(this.checkListNotApproved);
  }
  selectAll(check, arr) {
    console.log(check, arr);
    if (check) {
      if (this.currentTab) {
        this.checkListApproved = [];
        arr.forEach((item) => {
          item.status = true;
          this.checkListApproved.push(item.lichtuanid);
        });
      } else {
        this.checkListApproved = [];
        arr.forEach((item) => {
          item.status = true;
          this.checkListNotApproved.push(item.lichtuanid);
        });
      }
    } else {
      this.checkListApproved = [];
      arr.forEach((item) => {
        item.status = false;
      });
    }
  }
  async Approved(id) {
    console.log(id);

    try {
      this.EventNotApproved = await this.api.httpCall(
        this.api.apiLists.AcceptAllEventRequest,
        {},
        [id],
        'post',
        true
      );
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Duyệt lịch Thành Công',
        showConfirmButton: false,
        timer: 1000,
      });
    } catch (e) {
      console.log(e);
    }
    // this.gData(0);
    // this.gData(1);
    if (this.currentTab) {
      this.changeTabs(true);
      this.gData(1);
    } else {
      this.changeTabs(false);
      this.gData(0);
    }
  }
  async ApprovedMultiple() {
    console.log(this.checkListApproved);
    console.log(this.checkListNotApproved);
    try {
      if (this.currentTab) {
        this.EventNotApproved = await this.api.httpCall(
          this.api.apiLists.AcceptAllEventRequest,
          {},
          [this.checkListApproved],
          'post',
          true
        );
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Duyệt lịch Thành Công',
          showConfirmButton: false,
          timer: 1000,
        });
      } else {
        this.EventNotApproved = await this.api.httpCall(
          this.api.apiLists.AcceptAllEventRequest,
          {},
          this.checkListNotApproved,
          'post',
          true
        );
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Duyệt lịch Thành Công',
          showConfirmButton: false,
          timer: 1000,
        });
        this.gData(0);
        this.gData(1);
      }
    } catch (e) {
      console.log(e);
    }
  }
}
