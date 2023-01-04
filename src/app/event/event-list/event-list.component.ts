import { Subscription } from 'rxjs';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { HttpClient } from '@angular/common/http';
import data from './event.language';
import { Router } from '@angular/router';
import { Event } from 'src/app/Model/Event';
import { ApiservicesService } from 'src/app/services/api.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import dateFormat, { masks } from 'dateformat';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent implements OnInit {
  // @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  // title = 'Excel';
  masterSelectedApproved: boolean;
  masterSelectedNotApproved: boolean;
  checkListNotApproved: Array<any> = [];
  test = 'line-through';
  checkListApproved: Array<any> = [];
  getDateListApproved;
  EventNotApproved;
  dateFrom;
  dateTo;
  editable = true;
  commentList;
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
  arrDateSelect;
  spinnerLoading = false;
  eventListData;
  page = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15];
  count = 500;
  events = [
    {
      fulldate: '2022-12-12',
      items: [
        {
          title: 'User Module Testing',
          id: 'idk',
          author: 'Nguyen Hoai Thuong',
        },
      ],
    },
  ];
  // events;
  config = {
    id: 'paging',
    itemsPerPage: 5,
    currentPage: 0,
    totalItems: 0,
  };
  constructor(
    private httpClient: HttpClient,
    private el: ElementRef,
    public generalService: GeneralService,
    private router: Router,
    private _location: Location,
    private api: ApiservicesService,
    private toaster: ToastrService
  ) {
    this.masterSelectedApproved = false;
    this.masterSelectedNotApproved = false;
  }
  dateSelectedEvents;
  getEvents(a) {
    this.dateSelectedEvents = a;
    if (this.currentTab) {
      this.gData(1, this.getMonday(a.fulldate), this.getSunday(a.fulldate));
    } else {
      this.gData(0, this.getMonday(a.fulldate), this.getSunday(a.fulldate));
    }
  }
  ngOnInit() {
    this.getDateEventInMonth();
    if (this.currentTab) {
      this.gData(1);
    } else {
      this.gData(0);
    }
  }
  convertTime24H(time) {
    const number = moment(time, ['h:mm A']).format('HH:mm');
    return number; // "14.00"
  }
  checkhuy(string, stringD) {
    // if (stringD == '1') {
    //   return 'none';
    // } else if (stringD == '0') {
    //   return 'line-through';
    // }

    if (string == '1') {
      return 'line-through';
    } else return 'none';
  }
  checkToday(stringDate: string) {
    const date = dateFormat(new Date(stringDate.substring(0, 10)), 'isoDate');
    // const dateToday = `${new Date().getFullYear()}-${
    //   new Date().getMonth() + 1
    // }-${new Date().getDate()}`;
    const now = dateFormat(new Date(), 'isoDate');
    // console.log(date, now);
    if (date == now) {
      return '#FFFADF';
    } else {
      return '';
    }
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
  getDateArrChenhLech(dateFrom: string, dateTo: string) {
    const dateF = new Date(dateFrom);
    const dateT = new Date(dateTo);
    const dateFTime = new Date(dateFrom).getTime();
    const dateTTime = new Date(dateTo).getTime();
    const millisBetween = dateTTime - dateFTime;
    const days = millisBetween / (1000 * 3600 * 24);
    const result = Math.round(Math.abs(days));
    const ArrDate = [];
    if (result >= 1) {
      const stringDateDefault = dateF.getDate();
      for (let i = 0; i <= result; i++) {
        if (dateF.getMonth() == dateT.getMonth()) {
          const stringDateD =
            (stringDateDefault + i).toString().length == 1
              ? '0' + (stringDateDefault + i).toString()
              : (stringDateDefault + i).toString();
          const stringMonthD =
            (dateF.getMonth() + 1).toString().length == 1
              ? '0' + (dateF.getMonth() + 1).toString()
              : (dateF.getMonth() + 1).toString();
          const stringDate = `${dateF.getFullYear()}-${stringMonthD}-${stringDateD}`;
          ArrDate.push(stringDate);
        }
      }

      return ArrDate;
    } else {
      const stringDate = `${dateF.getFullYear()}-${
        dateF.getMonth() + 1
      }-${dateF.getDate()}`;
      ArrDate.push(stringDate);

      return ArrDate;
    }
  }
  /// tạo đánh dấu lên lịch
  async getDateEventInMonth() {
    const ArrDate = [];
    if (this.currentTab) {
      const arrAllApp: any = await this.api.httpCall(
        this.api.apiLists.GetAllEventByType + `?type=1`,
        {},
        {},
        'get',
        true
      );
      let arr = [];
      arrAllApp.forEach((item) => {
        const arrDateMuti: any = this.getDateArrChenhLech(
          item.tgbatdau.substring(0, 10),
          item.tgketthuc.substring(0, 10)
        );
        if (arrDateMuti.length > 0) {
          arrDateMuti.forEach((i) => {
            const date = dateFormat(new Date(i), 'isoDate');
            arr.push(date);
          });
          arr.forEach((i) => {
            const obj = {
              fulldate: i,
              items: [
                {
                  title: 'User Module Testing',
                  id: 'idk',
                  author: 'Nguyen',
                },
              ],
            };
            ArrDate.push(obj);
          });
        } else {
          const date = dateFormat(
            new Date(item.tgbatdau.substring(0, 10)),
            'isoDate'
          );
          ArrDate.push({
            fulldate: date,
            items: [
              {
                title: 'User Module Testing',
                id: 'idk',
                author: 'Nguyen',
              },
            ],
          });
        }
      });

      this.events = ArrDate;
    } else {
      const arrAllApp: any = await this.api.httpCall(
        this.api.apiLists.GetAllEventByType + `?type=0`,
        {},
        {},
        'get',
        true
      );
      let arr = [];
      arrAllApp.forEach((item) => {
        const arrDateMuti: any = this.getDateArrChenhLech(
          item.tgbatdau.substring(0, 10),
          item.tgketthuc.substring(0, 10)
        );

        if (arrDateMuti.length > 0) {
          arrDateMuti.forEach((i) => {
            const date = dateFormat(new Date(i), 'isoDate');
            arr.push(date);
          });

          arr.forEach((i) => {
            const obj = {
              fulldate: i,
              items: [
                {
                  title: 'User Module Testing',
                  id: 'idk',
                  author: 'Nguyen',
                },
              ],
            };
            ArrDate.push(obj);
          });
        } else {
          const date = dateFormat(
            new Date(item.tgbatdau.substring(0, 10)),
            'isoDate'
          );
          ArrDate.push({
            fulldate: date,
            items: [
              {
                title: 'User Module Testing',
                id: 'idk',
                author: 'Nguyen',
              },
            ],
          });
        }
      });

      this.events = ArrDate;
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
  changeTabs(tab) {
    this.currentTab = tab;
    this.masterSelectedApproved = false;
    if (tab) {
      this.masterSelectedApproved = false;
      this.page = 0;
      this.count = 0;
      this.pageSize = this.pageSize;
      this.gData(1);
    } else {
      this.masterSelectedApproved = false;
      this.page = 0;
      this.count = 0;
      this.pageSize = this.pageSize;
      this.gData(0);
    }
    this.getDateEventInMonth();
  }
  goBack() {
    this._location.back();
  }
  openNewEvent() {
    this.router.navigate(['/event/new-event']);
  }
  getMonday(d) {
    d = new Date(d);
    const day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    const date = dateFormat(new Date(d.setDate(diff)), 'isoDate');
    return date;
  }
  getSunday(d) {
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    const monday = new Date(d.setDate(diff));
    const date = dateFormat(monday.setDate(monday.getDate() + 6), 'isoDate');
    return date;
  }
  getCountEventDate(date: string) {
    const arr = this.EventNotApproved.filter((i) => {
      return i.items.ngay == date;
    });

    return arr.length;
  }
  async gData(n: number, fromdate = new Date(), endDate = new Date()) {
    this.spinnerLoading = true;
    const date1 = new Date(fromdate);
    const date2 = new Date(endDate);
    this.dateFrom = this.getMonday(date1);
    this.dateTo = this.getSunday(date2);
    this.EventNotApproved = await this.api.httpCall(
      this.api.apiLists.GetAllEventByType + `?type=${n}`,
      {},
      {},
      'get',
      true
    );
    const arrTam2 = [];
    const arrTam1 = [];
    this.EventNotApproved = this.EventNotApproved.reverse();
    this.EventNotApproved.forEach((e) => {
      const arrTam: any = this.getDateArrChenhLech(
        e.tgbatdau.substring(0, 10),
        e.tgketthuc.substring(0, 10)
      );
      console.log(arrTam);
      if (arrTam.length > 0) {
        arrTam.forEach((it) => {
          const date = dateFormat(new Date(it), 'isoDate');
          arrTam2.push({ ...e, ngay: date });
        });
      } else {
        e.ngay = e.tgbatdau.substring(0, 10);
        arrTam1.push(e);
      }
      const ArrAllEventDate = [...arrTam1, ...arrTam2];
      this.EventNotApproved = ArrAllEventDate;
    });
    const test = [...this.EventNotApproved];
    const Arr = test
      .filter((e) => {
        const date = new Date(e.ngay);
        const dateF = new Date(this.dateFrom);
        const dateT = new Date(this.dateTo);
        return date >= dateF && date <= dateT;
      })
      .sort((a, b) => {
        const date1: any = new Date(a.ngay);
        const date2: any = new Date(b.ngay);
        return date1.getTime() - date2.getTime();
      });
    const arrSortHour = Arr.sort((a, b) => {
      if (
        new Date(a.ngay).getDate() == new Date(b.ngay).getDate() &&
        new Date(a.ngay).getMonth() == new Date(b.ngay).getMonth() &&
        new Date(a.ngay).getFullYear() == new Date(b.ngay).getFullYear()
      ) {
        return (
          new Date(a.tgbatdau).getHours() - new Date(b.tgbatdau).getHours()
        );
      } else return 1;
    });

    this.getDateListApproved = arrSortHour;
    const test1 = [...arrSortHour];
    const arrEnd = [];
    test1.forEach((i) => {
      const it: any = test1.filter((item) => {
        return item.ngay == i.ngay;
      });
      const obj = {
        ngay: i.ngay,
        items: it,
      };
      arrEnd.push(obj);
    });
    // lọc phần tử trùng trong mảng
    const result = arrEnd.filter((c, index) => {
      return (
        // findIndex tìm ra vị trí index đầu tiên thóa đk
        arrEnd.findIndex((mo) => mo.ngay == c.ngay) === index
      );
    });

    this.EventNotApproved = result;
    this.EventNotApproved.forEach((i) => {
      i.status = false;
    });
    console.log(this.EventNotApproved);
    this.spinnerLoading = false;
  }
  async getComment(id) {
    this.commentList = await this.api.httpCall(
      this.api.apiLists.GetAllCommentFromIdAndType + `?type=LT` + `&from=${id}`,
      {},
      {},
      'get',
      true
    );

    return this.commentList.length;
  }
  handlePageChange(event): void {
    this.page = event;
    this.masterSelectedApproved = false;
    if (this.currentTab) {
      this.gData(1);
    } else {
      this.gData(0);
    }
  }
  showDSLQ(arrList: any) {
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
  //export exe
  exPortExcel() {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('LichTuan');
    worksheet.columns = [
      {
        header: 'Ngày',
        key: 'dateF',
        width: 40,
        style: {
          font: { name: 'Arial ', size: 10 },
          alignment: { vertical: 'middle' },
        },
      },
      {
        header: 'Giò',
        key: 'dateT',
        width: 40,
        style: {
          font: { name: 'Arial ', size: 10 },
          alignment: { vertical: 'middle' },
        },
      },
      {
        header: 'Nội dung',
        key: 'noidung',
        width: 42,

        style: {
          font: { name: 'Arial ', size: 10 },
          alignment: { vertical: 'middle' },
        },
      },
      {
        header: 'Danh Sách Liên Quan',
        key: 'dslienquan',
        width: 25,
        style: {
          font: { name: 'Arial ', size: 10 },
          alignment: { vertical: 'middle' },
        },
      },
    ];
    // var row = worksheet.addRow([], "n");
    worksheet.mergeCells('A1:D1');
    worksheet.getCell('A1').value = `Lịch Tuần `;
    // worksheet.getCell('A1').alignment = {
    //   vertical: 'middle',
    //   horizontal: 'center',
    // };
    worksheet.getCell('A1').style = {
      font: {
        name: 'Arial Black ',
        size: 14,
        color: { argb: 'blue' },
        bold: true,
      },
      alignment: { vertical: 'middle', horizontal: 'center' },
    };

    worksheet.getCell('A2').style = {
      font: {
        name: 'Arial Black ',
        size: 12,
        bold: true,
      },
      alignment: { vertical: 'middle', horizontal: 'center' },
    };
    worksheet.getCell('A2').value = 'Ngày ';
    worksheet.getCell('B2').style = {
      font: {
        name: 'Arial Black ',
        size: 12,
        bold: true,
      },
      alignment: { vertical: 'middle', horizontal: 'center' },
    };
    worksheet.getCell('B2').value = 'Giờ';
    worksheet.getCell('C2').style = {
      font: {
        name: 'Arial Black ',
        size: 12,
        bold: true,
      },
      alignment: { vertical: 'middle', horizontal: 'center' },
    };
    worksheet.getCell('C2').value = 'Nội Dung';
    worksheet.getCell('D2').style = {
      font: {
        name: 'Arial Black ',
        size: 12,
        bold: true,
      },
      alignment: { vertical: 'middle', horizontal: 'center' },
    };
    worksheet.getCell('D2').value = 'Danh Sách Liên Quan';

    this.EventNotApproved.forEach((e) => {
      let dslienquan = '';

      e.items.forEach((i) => {
        i.dsLienQuan.forEach((item) => {
          dslienquan += item.hoTen + ', ';
        });
        worksheet.addRow(
          {
            dateF: e.ngay,

            dateT:
              i.tgbatdau.substring(11, 16) +
              ' - ' +
              i.tgketthuc.substring(11, 16),
            noidung:
              'Nội dung: ' +
              i.noidung +
              '\n' +
              'Địa điểm: ' +
              i.diadiem +
              '\n' +
              'Thành phần: ' +
              i.thanhphan +
              '\n' +
              'Chủ trì: ' +
              i.chutri +
              '\n' +
              'Khách mời: ' +
              i.khachmoi +
              '\n' +
              'Chuẩn bị: ' +
              i.chuanbi +
              '\n',
            dslienquan: dslienquan,
          },
          'n'
        );
      });
    });

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(blob, 'LichTuan.xlsx');
    });
  }
  getLabel(key) {
    return data[`${this.generalService.currentLanguage.Code}`][`${key}`];
  }
  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 0;
    if (this.currentTab) {
      this.gData(1);
    } else {
      this.gData(0);
    }
  }
  /// check
  onChangeChecked(check, values, EventArr) {
    if (this.currentTab) {
      if (check) {
        EventArr.forEach((item) => {
          item.items.forEach((i) => {
            if (i.lichtuanid == values) i.status = true;
          });
        });
        if (this.checkListApproved.length > 0) {
          if (
            this.checkListApproved.find((item) => {
              item == values;
            })
          )
            return;
          else this.checkListApproved.push(values);
        } else this.checkListApproved.push(values);
      } else {
        EventArr.forEach((item) => {
          item.items.forEach((i) => {
            if (i.lichtuanid == values) i.status = false;
          });
        });
        if (this.checkListApproved.filter((i) => i == values).length > 0) {
          const arrTam = this.checkListApproved.filter((i) => i != values);
          this.checkListApproved = arrTam;
        } else return false;
      }
    } else {
      if (check) {
        EventArr.forEach((item) => {
          item.items.forEach((i) => {
            if (i.lichtuanid == values) i.status = true;
          });
        });
        if (this.checkListNotApproved.length > 0) {
          if (
            this.checkListNotApproved.find((item) => {
              item == values;
            })
          )
            return;
          else this.checkListNotApproved.push(values);
        } else this.checkListNotApproved.push(values);
      } else {
        EventArr.forEach((item) => {
          item.items.forEach((i) => {
            if (i.lichtuanid == values) i.status = false;
          });
        });
        if (this.checkListNotApproved.filter((i) => i == values).length > 0) {
          const arrTam = this.checkListNotApproved.filter((i) => i != values);
          this.checkListNotApproved = arrTam;
        } else return false;
      }
    }
  }
  selectAll(check, arr) {
    if (check) {
      if (this.currentTab) {
        this.checkListApproved = [];
        arr.forEach((item) => {
          item.items.forEach((i) => {
            i.status = true;
            this.checkListApproved.push(i.lichtuanid);
          });
        });
      } else {
        this.checkListApproved = [];
        arr.forEach((item) => {
          item.items.forEach((i) => {
            i.status = true;
            this.checkListNotApproved.push(i.lichtuanid);
          });
        });
      }
    } else {
      this.checkListApproved = [];
      arr.forEach((item) => {
        item.items.forEach((i) => {
          i.status = false;
        });
      });
    }
  }
  /// Hủy
  async CancelEvent(id: any) {
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
          if (this.currentTab) {
            this.gData(1);
          } else {
            this.gData(0);
          }
          this.toaster.success('', 'Hủy lịch Thành Công!', {
            timeOut: 2500,
          });
        } catch (e) {
          this.toaster.error('', 'Hủy lịch Thất Bại!', {
            timeOut: 2500,
          });
        }
      }
    });
  }
  async CancelEventMulti() {
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
            this.checkListApproved,
            'post',
            true
          );
          if (this.currentTab) {
            this.gData(1);
          } else {
            this.gData(0);
          }
          this.toaster.success('', 'Hủy lịch Thành Công!', {
            timeOut: 2500,
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
          if (this.currentTab) {
            this.changeTabs(true);
            this.gData(1);
          } else {
            this.changeTabs(false);
            this.gData(0);
          }
          this.toaster.success('', 'Duyệt lịch Thành Công!', {
            timeOut: 2500,
          });
        } catch (e) {
          console.log(e);
        }
      }
    });
  }
  async ApprovedMultiple() {
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
          if (this.currentTab) {
            await this.api.httpCall(
              this.api.apiLists.AcceptAllEventRequest,
              {},
              this.checkListApproved,
              'post',
              true
            );
            if (this.currentTab) {
              this.changeTabs(true);
              this.gData(1);
            } else {
              this.changeTabs(false);
              this.gData(0);
            }
            this.toaster.success('', 'Duyệt lịch Thành Công!', {
              timeOut: 2500,
            });
          } else {
            await this.api.httpCall(
              this.api.apiLists.AcceptAllEventRequest,
              {},
              this.checkListNotApproved,
              'post',
              true
            );
            this.toaster.success('', 'Duyệt lịch Thành Công!', {
              timeOut: 2500,
            });
            if (this.currentTab) {
              this.changeTabs(true);
              this.gData(1);
            } else {
              this.changeTabs(false);
              this.gData(0);
            }
          }
        } catch (e) {
          console.log(e);
        }
      }
    });
  }
  // Xóa
  async deleteEvent(id) {
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
          await this.api.httpCall(
            this.api.apiLists.DeleteEvent,
            {},
            [id],
            'post',
            true
          );
          this.toaster.success('', 'Xóa lịch Thành Công!', {
            timeOut: 2500,
          });
          if (this.currentTab) {
            this.gData(1);
          } else {
            this.gData(0);
          }
        } catch (e) {
          console.log(e);
        }
      }
    });
  }
  async deleteEventMultiple() {
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
          if (this.currentTab) {
            await this.api.httpCall(
              this.api.apiLists.DeleteEvent,
              {},
              this.checkListApproved,
              'post',
              true
            );
            this.gData(1);
            this.toaster.success('', 'Xóa lịch Thành Công!', {
              timeOut: 2500,
            });
          } else {
            await this.api.httpCall(
              this.api.apiLists.DeleteEvent,
              {},
              this.checkListNotApproved,
              'post',
              true
            );
            this.toaster.success('', 'Xóa lịch Thành Công!', {
              timeOut: 2500,
            });
            this.gData(0);
          }
        } catch (e) {
          console.log(e);
        }
      }
    });
  }
}
