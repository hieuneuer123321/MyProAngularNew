import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import data from './file-cabinet.language';
import { ToastrService } from 'ngx-toastr';
import { ApiservicesService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-file-cabinet-detail',
  templateUrl: './file-cabinet-detail.component.html',
  styleUrls: ['./file-cabinet-detail.component.css'],
})
export class FileCabinetDetailComponent implements OnInit {
  spinnerLoading = false;
  filecabinetData: any;
  constructor(
    private httpClient: HttpClient,
    public generalService: GeneralService,
    private router: Router,
    public routerAc: ActivatedRoute,
    private toaster: ToastrService,
    public api: ApiservicesService
  ) {}

  ngOnInit(): void {
    this.gData(this.routerAc.snapshot.params['id']);
  }
  openNewFileCabinet(): void {
    this.router.navigate(['/personal/new-file-cabinet']);
  }
  updateFileCabinet(id) {
    this.router.navigate([`/personal/update-file-cabinet/${id}`]);
  }
  async gData(id) {
    this.spinnerLoading = true;
    try {
      this.filecabinetData = await this.api.httpCall(
        this.api.apiLists.FileDetailFromCabinet + `?id=${id}`,
        {},
        {},
        'get',
        true
      );
      console.log(this.filecabinetData);
    } catch (error) {
      console.log(error);
    }
    this.spinnerLoading = false;
  }
  async deleteFileCabinet(id) {
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
            this.api.apiLists.FileDeleteFromCabinet,
            {},
            {
              id: id,
            },
            'post',
            true
          );
          this.toaster.success('', 'Xóa Thành Công!', {
            timeOut: 2500,
          });
          this.router.navigate(['/personal/file-cabinet']);
        } catch (error) {
          console.log(error);
          this.toaster.error('', 'Xóa Thành Công!', {
            timeOut: 2500,
          });
        }
      } else {
        return false;
      }
    });
  }

  getLabel(key) {
    return data[`${this.generalService.currentLanguage.Code}`][`${key}`];
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
