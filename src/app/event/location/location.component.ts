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
  editable = true;
  deletetable = true;
  nameLocationAdd!: string;
  desLocationAdd!: string;
  Location = {
    diaDiemId: '',
    stt: 0,
    nameLocation: '',
    description: '',
  };
  idLocationDelete!: string;
  spinnerLoading = false;
  eventListData;
  page = 0;
  pageSize = 10;
  pageSizes = [10, 20, 30];
  count = 500;
  locationListAll: any;
  config;

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
    try {
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
    } catch (e) {
      console.log(e.message);
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
        } catch (e) {
          console.log(e.message);
        }
      }
    });
  }
}
