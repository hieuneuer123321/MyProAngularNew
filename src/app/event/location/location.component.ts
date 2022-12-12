import { Subscription } from 'rxjs';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import data from './location.language';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { ApiservicesService } from 'src/app/services/api.service';
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
})
export class LocationComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  @ViewChild('closebuttonAdd') closebuttonAdd;
  isLoading = true;
  deletetable = true;
  nameLocationAdd!: string;
  desLocationAdd!: string;
  Location = {
    diaDiemId: '',
    stt: 0,
    nameLocation: '',
    description: '',
  };
  errors = '';
  idLocationDelete!: string;
  spinnerLoading = false;
  eventListData;
  locationListAll: any;
  ///pa
  config;
  editable = true;
  page = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15];
  count = 500;
  currentTab = true;

  collection = { count: 60, data: [] };
  constructor(
    private httpClient: HttpClient,
    private el: ElementRef,
    public generalService: GeneralService,
    private router: Router,
    private _location: Location,
    private api: ApiservicesService
  ) {}
  addLocation() {
    alert('Bạn');
  }
  ngOnInit(): void {
    this.getListLocationAll();
  }
  pageChanged(event) {
    this.config.currentPage = event;
  }
  goBack() {
    this._location.back();
  }
  getLabel(key) {
    return data[`${this.generalService.currentLanguage.Code}`][`${key}`];
  }
  async getListLocationAll() {
    try {
      this.locationListAll = await this.api.httpCall(
        this.api.apiLists.GetAllLocations,
        {},
        {},
        'get',
        true
      );
      // console.log(this.locationListAll.length);
      this.locationListAll.sort(function (a, b) {
        return b.stt - a.stt;
      });
      ///
      this.config = {
        itemsPerPage: 6,
        currentPage: 1,
        totalItems: this.locationListAll.count,
      };
      // this.config = {
      //   id: 'paging2',
      //   itemsPerPage: this.pageSize,
      //   currentPage: this.page,
      //   totalItems: this.locationListAll.length,
      // };
      this.isLoading = false;
    } catch (e) {
      console.log(e.message);
    }
  }

  closeModalAdd() {
    this.nameLocationAdd = '';
    this.desLocationAdd = '';
  }
  async AddLocation() {
    if (this.nameLocationAdd) {
      try {
        this.errors = '';
        await this.api.httpCall(
          this.api.apiLists.AddLocation,
          {},
          {
            stt: this.locationListAll.length + 1,
            tenĐiaiem: this.nameLocationAdd,
            moTa: this.desLocationAdd,
          },
          'post',
          true
        );
        this.getListLocationAll();
        this.closebuttonAdd.nativeElement.click();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Thêm Thành Công',
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (e) {
        console.log(e.message);
      }
    } else {
      Swal.fire({
        title: '<strong>Thiếu Thông Tin ?</strong>',
        icon: 'warning',
        html: `Vui lòng nhập đầy đủ các thông tin bắt buộc ! !`,
        showCloseButton: true,
        focusConfirm: true,
        reverseButtons: true,
        focusCancel: false,
        confirmButtonText: `Hủy`,
      }).then(async (result) => {
        this.errors = 'Vui lòng nhập vào ô này !';
      });
    }
  }
  GetLocationById(id: any, location: any, description: any, stt: any) {
    this.Location.diaDiemId = id;
    this.Location.nameLocation = location;
    this.Location.description = description;
    this.Location.stt = stt;
    console.log(this.Location.stt);
  }
  async UpdateLocation() {
    console.log({
      diaDiemId: this.Location.diaDiemId,
      stt: this.Location.stt,
      tenDiaDiem: this.Location.nameLocation,
      moTa: this.Location.description,
    });
    try {
      const test = await this.api.httpCall(
        this.api.apiLists.UpdateLocation,
        {},
        {
          diaDiemId: this.Location.diaDiemId,
          stt: this.Location.stt,
          tenDiaDiem: this.Location.nameLocation,
          moTa: this.Location.description,
        },
        'post',
        true
      );
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Sửa Thành Công',
        showConfirmButton: false,
        timer: 1000,
      });
      this.getListLocationAll();
    } catch (e) {
      console.log(e.message);
    }
    this.closebutton.nativeElement.click();
  }

  deleteLocation(id: any) {
    Swal.fire({
      title: '<strong>Bạn chắc chắn xóa ?</strong>',
      icon: 'warning',
      html: `Địa điểm sau khi xóa không thể phục hồi được !`,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      reverseButtons: true,
      focusCancel: true,
      cancelButtonText: `Hủy`,
      confirmButtonText: `Xóa`,
    }).then(async (result) => {
      if (result.value) {
        ///api/Event/DeleteLocation
        console.log(id);
        try {
          const test = await this.api.httpCall(
            this.api.apiLists.DeleteLocation,
            {},
            [id],
            'post',
            true
          );
          this.getListLocationAll();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Xóa Thành Công',
            showConfirmButton: false,
            timer: 1000,
          });
        } catch (e) {
          console.log(e.message);
        }
      }
    });
  }

  ////pageSizes
  handlePageChange(event): void {
    this.page = event;
    this.getListLocationAll();
  }
  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 0;
    this.getListLocationAll();
  }
  changeTabs(tab) {
    this.currentTab = tab;
    this.page = 0;
    this.count = 0;
    this.pageSize = 10;
    this.getListLocationAll();
  }
}
