import { UserDetailComponent } from './../../admin/user-detail/user-detail.component';
import dateFormat, { masks } from 'dateformat';
import { Component, ElementRef, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { HttpClient } from '@angular/common/http';
import { Event } from 'src/app/Model/Event';
import { ApiservicesService } from 'src/app/services/api.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import data from './event.language';
import * as moment from 'moment';
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {
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
  /////
  userId = this.generalService.currentUser.userId
    ? this.generalService.currentUser.userId
    : '';
  getDateListApproved;
  EventNotApproved;
  dateFrom;
  dateTo;
  nameGroupId;
  userName;
  /////
  spinnerLoading = false;
  eventListData;
  page = 0;
  pageSize = 10;
  pageSizes = [10, 20, 30];
  count = 500;
  config;
  events = [];
  chosenAssigneelList: any[] = [];
  allUserInStep2List;
  majorAssignee;
  groupKeyChosenInStep2 = 'all';
  state = {};
  constructor(
    private httpClient: HttpClient,
    private el: ElementRef,
    public routerAc: ActivatedRoute,
    public generalService: GeneralService,
    private router: Router,
    private _location: Location,
    private api: ApiservicesService
  ) {}

  ngOnInit(): void {
    this.userId = this.generalService.currentUser.userId
      ? this.generalService.currentUser.userId
      : '';
    this.gData(this.userId);
    this.onAsigneeGroupChange(null);
    this.getDateEventInMonth(this.userId);
    this.getGroupId(this.generalService.currentUser.userId);
    this.userName = this.getUserNameId(this.userId);
  }
  dateSelectedEvents;
  getEvents(a) {
    this.dateSelectedEvents = a;
    this.gData(
      this.userId,
      this.getMonday(a.fulldate),
      this.getSunday(a.fulldate)
    );
  }
  seeDetail(id) {
    this.router.navigate(['/personal/event', id]);
  }
  cancelEditEvent() {
    this.editable = true;
    this.eventDetail = { ...this.eventSandbox };
  }
  openNewEvent() {
    this.router.navigate(['/personal/new-event']);
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
      return 'H??m qua';
    } else if (result == 0) {
      if (
        // Math.abs(phutNgayHienTai - phutNgayTruyenVao) <= 59 &&
        // Math.abs(new Date().getHours() - new Date(date).getHours()) == 1
        new Date().getHours() == new Date(date).getHours()
      ) {
        const phutNgayHienTai = new Date().getMinutes();
        const phutNgayTruyenVao = new Date(date).getMinutes();
        if (Math.abs(60 - Math.abs(phutNgayHienTai - phutNgayTruyenVao)) == 60)
          return 'B??y Gi???';
        else
          return (
            Math.abs(Math.abs(phutNgayHienTai - phutNgayTruyenVao)) +
            ' ph??t tr?????c'
          );
      } else {
        const gioNgayHienTai = new Date().getHours();
        const gioNgayTruyenVao = new Date(date).getHours();
        return (
          Math.abs(Math.abs(gioNgayHienTai - gioNgayTruyenVao)) + ' gi??? tr?????c'
        );
      }
      // return `${new Date(date).getDate()}/${new Date(
      //   date
      // ).getMonth()}/${new Date(date).getFullYear()}`;
    } else {
      return result + ' ng??y tr?????c';
    }
  }
  convertTime24H(time) {
    const number = moment(time, ['h:mm A']).format('HH:mm');
    return number; // "14.00"
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
  async gData(userId, fromdate = new Date(), endDate = new Date()) {
    // this.spinnerLoading = true;
    const date1 = new Date(fromdate);
    const date2 = new Date(endDate);
    this.dateFrom = this.getMonday(date1);
    this.dateTo = this.getSunday(date2);
    if (!userId) {
      return;
    } else {
      try {
        const AllEventUser: any = await this.api.httpCall(
          this.api.apiLists.GetUserEventsByUserId + `?uid=${userId}`,
          {},
          {},
          'get',
          true
        );
        // const AllEventUser: any = await this.api.httpCall(
        //   this.api.apiLists.GetUserEvent,
        //   {},
        //   {},
        //   'get',
        //   true
        // );
        const getEventUserId: any = AllEventUser.filter((item) => {
          return item.userid.userId == userId;
        });
        this.EventNotApproved = getEventUserId.length > 0 ? getEventUserId : [];
        const arrTam2 = [];
        const arrTam1 = [];
        // ?????o ng?????c m???ng
        this.EventNotApproved = this.EventNotApproved.reverse();
        this.EventNotApproved.forEach((e) => {
          const arrTam: any = this.getDateArrChenhLech(
            e.tgbatdau.substring(0, 10),
            e.tgketthuc.substring(0, 10)
          );

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
        // l???c ph???n t??? tr??ng trong m???ng
        const result = arrEnd.filter((c, index) => {
          return (
            // findIndex t??m ra v??? tr?? index ?????u ti??n th??a ??k
            arrEnd.findIndex((mo) => mo.ngay == c.ngay) === index
          );
        });
        this.EventNotApproved = result;
        this.spinnerLoading = false;
      } catch (error) {
        console.log(error);
      }
    }
  }
  async getGroupId(id) {
    try {
      const UserDetail: any = await this.api.httpCall(
        this.api.apiLists.getAllGroupsByUserld + `${id}`,
        {},
        {},
        'get',
        true
      );
      if (UserDetail.length > 0) {
        this.nameGroupId = UserDetail[0].groupName;
      } else this.nameGroupId = '';
    } catch (error) {
      console.log(error);
    }
  }
  handlePageChange(event): void {
    this.page = event;
    this.gData(null);
  }
  getLabel(key) {
    return data[`${this.generalService.currentLanguage.Code}`][`${key}`];
  }
  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 0;
    this.gData(null);
  }
  ////
  onAsigneeGroupChange(e) {
    if (e == null || this.groupKeyChosenInStep2 == 'all') {
      this.allUserInStep2List = this.generalService.cloneAnything(
        this.generalService.allUsers
      );
    } else {
      this.allUserInStep2List = this.generalService.allUsersWithGroups[`${e}`];
    }
  }
  getUserNameId(id) {
    const allUserInStep2List = this.generalService.cloneAnything(
      this.generalService.allUsers
    );
    const userInfo = allUserInStep2List.find((user) => user.userId == id);
    if (userInfo) return userInfo.fullName;
    else return '';
  }
  onChange(e) {
    this.onAsigneeGroupChange(e.value);
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
        thu = 'Th??? Hai';
        break;
      case 'Tue':
        thu = 'Th??? Ba';
        break;
      case 'Wed':
        thu = 'Th??? T??';
        break;
      case 'Thu':
        thu = 'Th??? N??m';
        break;
      case 'Fri':
        thu = 'Th??? S??u';
        break;
      case 'Sat':
        thu = 'Th??? b???y';
        break;
      case 'Sun':
        thu = 'Ch??? Nh???t';
    }
    return thu;
  }
  /// t???o ????nh d???u l??n l???ch
  async getDateEventInMonth(userId) {
    const ArrDate = [];
    let arrAllApp: any = await this.api.httpCall(
      this.api.apiLists.GetUserEvent,
      {},
      {},
      'get',
      true
    );
    const getEventUserId: any = arrAllApp.filter((item) => {
      return item.userid.userId == userId;
    });
    arrAllApp = getEventUserId.length > 0 ? getEventUserId : [];
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
  // ch???n ng?????i mu???n xem l???ch
  onChangeUser(id) {
    this.userId = id;
    this.gData(this.userId);
    this.getDateEventInMonth(this.userId);
    this.userName = this.getUserNameId(this.userId);
  }
}
