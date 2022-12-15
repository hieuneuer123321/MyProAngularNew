import { Component, ElementRef, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { HttpClient } from '@angular/common/http';
import data from './event.language';

import { Event } from 'src/app/Model/Event';
import { ApiservicesService } from 'src/app/services/api.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AngularEditorConfig } from '@kolkov/angular-editor';
@Component({
  selector: 'app-load-comment',
  templateUrl: './load-comment.component.html',
  styleUrls: ['./load-comment.component.css'],
})
export class LoadCommentComponent implements OnInit {
  date14: Date;
  masterSelectedApproved: boolean;
  masterSelectedNotApproved: boolean;
  checkListNotApproved: Array<any> = [];
  test = 'line-through';
  EventComments;
  comment = {
    noidung: '',
  };
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

  spinnerLoading = false;
  eventListData;
  editorConfig: AngularEditorConfig = {
    height: '150px',
    editable: true,
  };
  constructor(
    private httpClient: HttpClient,
    private el: ElementRef,
    public routerAc: ActivatedRoute,
    public generalService: GeneralService,
    private router: Router,
    private _location: Location,
    private api: ApiservicesService
  ) {
    this.masterSelectedApproved = false;
    this.masterSelectedNotApproved = false;
  }

  ngOnInit(): void {
    this.getById(this.routerAc.snapshot.params['id']);
  }
  async getById(id) {
    this.spinnerLoading = true;
    const NotApproved: any = await this.api.httpCall(
      this.api.apiLists.GetAllEventByType + `?type=0`,
      {},
      {},
      'get',
      true
    );
    const Approved: any = await this.api.httpCall(
      this.api.apiLists.GetAllEventByType + `?type=1`,
      {},
      {},
      'get',
      true
    );
    const All = [...NotApproved, ...Approved];
    this.EventComments = All.filter((x) => x.lichtuanid == id)[0];
    this.EventComments.status = false;
    this.spinnerLoading = false;
  }
  async addAComment(): Promise<void> {
    // if (this.taskHistory.noiDung !== "" && this.taskHistory.noiDung !== undefined) {
    //   this.taskHistory.mscv = this.TaskDetail.mscv;
    //   this.taskHistory.danhSachNguoiXuLyKeTiepHoTen = "";
    //   this.taskHistory.nguoiPhanHoi = this.generalService.userData.userID;
    //   this.taskHistory.thoiGian = new Date().toISOString();
    //   var res = await this.api.httpCall(this.api.apiLists.AddNewTaskHistory, {}, this.taskHistory, 'post', true);
    //   this.reloadData.emit();
    // }
    alert(this.comment.noidung);
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

  goBack() {
    this._location.back();
  }
  openNewEvent() {
    this.router.navigate(['/event/new-event']);
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

  /// check
  onChangeChecked(check, values) {
    console.log(check, values);
    // if (this.currentTab) {
    //   if (check) {
    //     this.checkListApproved.push(values);
    //   } else {
    //     if (this.checkListApproved.filter((i) => i == values).length > 0) {
    //       const arrTam = this.checkListApproved.filter((i) => i != values);
    //       this.checkListApproved = arrTam;
    //     } else return false;
    //   }
    // } else {
    //   if (check) {
    //     this.checkListNotApproved.push(values);
    //   } else {
    //     if (this.checkListNotApproved.filter((i) => i == values).length > 0) {
    //       const arrTam = this.checkListNotApproved.filter((i) => i != values);
    //       this.checkListNotApproved = arrTam;
    //     } else return false;
    //   }
    // }
    console.log(this.checkListNotApproved);
  }
  selectAll(check, arr) {
    console.log(check, arr);
    // if (check) {
    //   this.checkListApproved = [];
    //   arr.forEach((item) => {
    //     item.status = true;
    //     this.checkListApproved.push(item.lichtuanid);
    //   });
    // }
    check ? (arr.status = true) : (arr.status = false);
    // if (check) {
    //   if (this.currentTab) {
    //     this.checkListApproved = [];
    //     arr.forEach((item) => {
    //       item.status = true;
    //       this.checkListApproved.push(item.lichtuanid);
    //     });
    //   } else {
    //     this.checkListApproved = [];
    //     arr.forEach((item) => {
    //       item.status = true;
    //       this.checkListNotApproved.push(item.lichtuanid);
    //     });
    //   }
    // } else {
    //   this.checkListApproved = [];
    //   arr.forEach((item) => {
    //     item.status = false;
    //   });
    // }
  }
  /// Hủy
  async CancelEvent(id: any) {
    console.log(id);
    Swal.fire({
      title: '<strong>Bạn chắc chắn hủy ?</strong>',
      icon: 'warning',
      html: `sau khi hủy có thể phục hồi được !`,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      reverseButtons: true,
      focusCancel: true,
      cancelButtonText: `Quay lại`,
      confirmButtonText: `Hủy Lịch`,
    }).then(async (result) => {
      if (result.value) {
        try {
          this.EventNotApproved = await this.api.httpCall(
            this.api.apiLists.CancelAllEvent,
            {},
            [id],
            'post',
            true
          );
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Hủy lịch Thành Công',
            showConfirmButton: false,
            timer: 1000,
          });
        } catch (e) {
          console.log(e);
        }
      }
    });
  }
  //Duyệt
  // ApprovedAgain(id) {
  //   console.log(id);
  //   Swal.fire({
  //     title: '<strong>Bạn chắc chắn duyệt ?</strong>',
  //     icon: 'warning',
  //     html: `sau khi duyệt có thể phục hồi được !`,
  //     showCloseButton: true,
  //     showCancelButton: true,
  //     focusConfirm: false,
  //     reverseButtons: true,
  //     focusCancel: true,
  //     cancelButtonText: `Quay lại`,
  //     confirmButtonText: `Duyệt`,
  //   }).then(async (result) => {
  //     if (result.value) {
  //       const arr = this.EventNotApproved.filter(
  //         (item) => item.lichtuanid == id
  //       );
  //       console.log(arr);
  //       if (arr.length > 0) {
  //         arr[0].huy = '0';
  //         this.gData(1);
  //       }
  //     }
  //   });
  // }
  async Approved(id) {
    console.log(id);
    Swal.fire({
      title: '<strong>Bạn chắc chắn duyệt ?</strong>',
      icon: 'warning',
      html: `sau khi duyệt có thể phục hồi được !`,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      reverseButtons: true,
      focusCancel: true,
      cancelButtonText: `Quay lại`,
      confirmButtonText: `Duyệt`,
    }).then(async (result) => {
      if (result.value) {
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
      }
    });
  }
  async ApprovedMultiple() {
    console.log(this.checkListApproved);
    console.log(this.checkListNotApproved);
    Swal.fire({
      title: '<strong>Bạn chắc chắn duyệt ?</strong>',
      icon: 'warning',
      html: `sau khi duyệt có thể phục hồi được !`,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      reverseButtons: true,
      focusCancel: true,
      cancelButtonText: `Quay lại`,
      confirmButtonText: `Duyệt`,
    }).then(async (result) => {
      if (result.value) {
        // try {
        //   if (this.currentTab) {
        //     await this.api.httpCall(
        //       this.api.apiLists.AcceptAllEventRequest,
        //       {},
        //       this.checkListApproved,
        //       'post',
        //       true
        //     );
        //     Swal.fire({
        //       position: 'center',
        //       icon: 'success',
        //       title: 'Duyệt lịch Thành Công',
        //       showConfirmButton: false,
        //       timer: 1000,
        //     });
        //   } else {
        //     await this.api.httpCall(
        //       this.api.apiLists.AcceptAllEventRequest,
        //       {},
        //       this.checkListNotApproved,
        //       'post',
        //       true
        //     );
        //     Swal.fire({
        //       position: 'center',
        //       icon: 'success',
        //       title: 'Duyệt lịch Thành Công',
        //       showConfirmButton: false,
        //       timer: 1000,
        //     });
        //   }
        // } catch (e) {
        //   console.log(e);
        // }
      }
    });
  }
  // Xóa
  async deleteEvent(id) {
    console.log(id);
    Swal.fire({
      title: '<strong>Bạn chắc chắn Xóa ?</strong>',
      icon: 'warning',
      html: `sau khi xóa không có thể phục hồi được !`,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      reverseButtons: true,
      focusCancel: true,
      cancelButtonText: `Quay lại`,
      confirmButtonText: `Xóa`,
    }).then(async (result) => {
      if (result.value) {
        try {
          this.EventNotApproved = await this.api.httpCall(
            this.api.apiLists.DeleteEvent,
            {},
            [id],
            'post',
            true
          );
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Xóa lịch Thành Công',
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (e) {
          console.log(e);
        }
      }
    });
  }
  async deleteEventMultiple() {
    console.log(this.checkListApproved);
    console.log(this.checkListNotApproved);
    Swal.fire({
      title: '<strong>Bạn chắc chắn Xóa ?</strong>',
      icon: 'warning',
      html: `sau khi Xóa không có thể phục hồi được !`,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      reverseButtons: true,
      focusCancel: true,
      cancelButtonText: `Quay lại`,
      confirmButtonText: `Xóa`,
    }).then(async (result) => {
      if (result.value) {
        try {
          // if (this.currentTab) {
          //   await this.api.httpCall(
          //     this.api.apiLists.DeleteEvent,
          //     {},
          //     this.checkListApproved,
          //     'post',
          //     true
          //   );
          //   Swal.fire({
          //     position: 'center',
          //     icon: 'success',
          //     title: 'Xóa lịch Thành Công',
          //     showConfirmButton: false,
          //     timer: 1000,
          //   });
          // } else {
          //   console.log(this.checkListNotApproved);
          //   await this.api.httpCall(
          //     this.api.apiLists.DeleteEvent,
          //     {},
          //     this.checkListNotApproved,
          //     'post',
          //     true
          //   );
          //   Swal.fire({
          //     position: 'center',
          //     icon: 'success',
          //     title: 'Xóa lịch Thành Công',
          //     showConfirmButton: false,
          //     timer: 1000,
          //   });
          // }
        } catch (e) {
          console.log(e);
        }
      }
    });
  }
}
