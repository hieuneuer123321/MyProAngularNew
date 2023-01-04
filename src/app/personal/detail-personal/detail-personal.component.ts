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
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-detail-personal',
  templateUrl: './detail-personal.component.html',
  styleUrls: ['./detail-personal.component.css'],
})
export class DetailPersonalComponent implements OnInit {
  state = {
    personalEvent: {},
    spinnerLoading: false,
    noidungComment: '',
  };
  repC = {
    nguoi: '',
    noidung: '',
  };
  comment = { noidung: '' };
  commentList;
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
    private api: ApiservicesService,
    private toaster: ToastrService
  ) {}
  ngOnInit(): void {
    this.getById(this.routerAc.snapshot.params['id']);
    this.getComment(this.routerAc.snapshot.params['id']);
  }
  async getById(id) {
    this.state.spinnerLoading = true;
    this.httpClient
      .get('https://62e7546c69bd03090f7b852b.mockapi.io/Event?status=true')
      .subscribe((i) => {
        const ArrAll: any = i;
        this.state.personalEvent = ArrAll.find((x) => x.id === id);
        this.state.spinnerLoading = false;
      });
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
  async deleteEventUser() {
    Swal.fire({
      title: '<strong>Bạn chắc chắn muốn Xóa ?</strong>',
      icon: 'warning',
      html: `Dữ liệu xóa không thể khôi phục được !`,
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
            this.api.apiLists.DeleteUserEvent,
            {},
            {
              id: this.routerAc.snapshot.params['id'],
            },
            'post',
            true
          );
          this.toaster.success('', 'Xóa Thành Công!', {
            timeOut: 2500,
          });
          this.router.navigate(['/personal/event']);
        } catch (error) {
          console.log(error);
          this.toaster.error('', 'Xóa Thất Bại!', {
            timeOut: 2500,
          });
        }
      } else {
        console.log(result);
        return false;
      }
    });
  }
  goBack() {
    this.router.navigate(['/personal/event/']);
  }
  openNewEvent() {
    this.router.navigate(['/personal/new-event/']);
  }
  repComment(noidung, nguoitao) {
    // this.comment.noidung = `<div style="background-Color: RGB(247 243 29); color: red; width:50%; font-size:14px; padding:10px">${noidung}</div>`;
    this.repC.nguoi = nguoitao;
    const htmlObject = document.createElement('div');
    htmlObject.innerHTML = noidung;
    const text = htmlObject.innerText;
    console.log(
      this.decodeHtmlCharCodes(text.substring(0, text.search('Trích dẫn từ:')))
    );
    /// cắt lấy 1 phản hồi để trả lời
    if (
      this.decodeHtmlCharCodes(text.substring(0, text.search('Trích dẫn từ:')))
    ) {
      this.repC.noidung = this.decodeHtmlCharCodes(
        text.substring(0, text.search('Trích dẫn từ:'))
      );
    } else {
      this.repC.noidung = text;
    }

    ///
    var htmlObject2 = htmlObject.firstChild;
  }
  decodeHtmlCharCodes = (str) =>
    str.replace(/(&#(\d+);)/g, (match, capture, charCode) =>
      String.fromCharCode(charCode)
    );
  async getComment(id) {
    console.log(id);
    try {
      this.commentList = await this.api.httpCall(
        this.api.apiLists.GetAllCommentFromIdAndType +
          `?type=CN` +
          `&from=${id}`,
        {},
        {},
        'get',
        true
      );
    } catch (error) {
      console.log(error);
    }

    // this.commentList.forEach((comment) => {
    //   console.log(comment.noiDung.split('\\').join(''));
    //   comment.noiDung = comment.noiDung.split('\\').join('');
    // });
    console.log(this.commentList);
  }
  exitRepComment() {
    this.repC.noidung = '';
    this.repC.nguoi = '';
    this.comment.noidung = '';
  }
  getLabel(key) {
    return data[`${this.generalService.currentLanguage.Code}`][`${key}`];
  }
  AddComment() {
    if (this.comment.noidung) {
      Swal.fire({
        title: '<strong>Bạn chắc chắn muốn phản hồi ?</strong>',
        icon: 'warning',
        html: `Phản hồi gửi đi sẽ không xóa được !`,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        reverseButtons: true,
        focusCancel: true,
        cancelButtonText: `Quay lại`,
        confirmButtonText: `Gửi`,
      }).then(async (result) => {
        if (result.value) {
          const newDateEnd = new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate(),
            new Date().getHours(),
            new Date().getMinutes()
          );
          const temp2 = dateFormat(newDateEnd, 'isoDateTime');
          console.log(this.comment.noidung, this.repC.noidung);
          let string = !this.repC.noidung
            ? this.comment.noidung
            : '<div>' +
              this.decodeHtmlCharCodes(this.comment.noidung) +
              '</div><div style="border: 2px solid black; padding:10px; margin:10px 0 5px 2%">' +
              '<div>Trích dẫn từ: <span style="font-weight:bold; font-size:15px">' +
              '<b>' +
              this.repC.nguoi +
              '</b>' +
              '</span> </div><div>' +
              this.decodeHtmlCharCodes(this.repC.noidung) +
              '</div></div>';
          console.log(string);

          try {
            await this.api.httpCall(
              this.api.apiLists.addComment,
              {},
              {
                fromID: this.routerAc.snapshot.params['id'],
                loaiCMT: 'CN',
                noiDung: string,
                ngayTao: temp2.substring(0, 19),
              },
              'post',
              true
            );
            this.toaster.success('', 'Phản hồi Thành Công!', {
              timeOut: 2500,
            });
          } catch (e) {
            console.log(e);
          }
        }

        this.repC.noidung = '';
        this.repC.nguoi = '';
        this.getComment(this.routerAc.snapshot.params['id']);
        this.comment.noidung = '';
        console.log(this.commentList);
      });
    } else {
      this.toaster.success('', 'Nội dung phản hồi trống!', {
        timeOut: 2500,
      });
      this.repC.noidung = '';
      this.repC.nguoi = '';
      this.comment.noidung = '';
    }
  }
}
