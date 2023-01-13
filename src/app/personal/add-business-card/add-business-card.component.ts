import { Component, OnInit } from '@angular/core';
import data from './add-business-card.language';
import { GeneralService } from 'src/app/services/general.service';
import { WizardComponent } from 'angular-archwizard';
import { Location } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { ApiservicesService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-business-card',
  templateUrl: './add-business-card.component.html',
  styleUrls: ['./add-business-card.component.css'],
})
export class AddBusinessCardComponent implements OnInit {
  state = {
    name: '',
    sdt: '',
    email: '',
    ghichu: '',
    idDetail: '',
  };
  businessCardDetail;
  submitted = false;
  error: {};
  /// Validate Form Builder
  addForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    ghichu: [''],
    sdt: [
      '',
      [
        Validators.pattern('[- +()0-9]+'),
        Validators.minLength(6),
        Validators.maxLength(10),
      ],
    ],
    email: ['', [Validators.email]],
  });
  constructor(
    public generalService: GeneralService,
    private formBuilder: FormBuilder,
    public api: ApiservicesService,
    public routerAc: ActivatedRoute,
    private router: Router,
    private toaster: ToastrService
  ) {}

  get a() {
    return this.addForm.controls;
  }
  ngOnInit(): void {
    this.state.idDetail = this.routerAc.snapshot.params['id'];
    if (this.routerAc.snapshot.params['id']) {
      this.getDetailBusines(this.routerAc.snapshot.params['id']);
      console.log(this.businessCardDetail);
    } else {
      this.addForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        ghichu: [''],
        sdt: [
          '',
          [
            Validators.pattern('[- +()0-9]+'),
            Validators.minLength(6),
            Validators.maxLength(10),
          ],
        ],
        email: ['', [Validators.email]],
      });
    }
  }
  async getDetailBusines(id) {
    try {
      this.businessCardDetail = await this.api.httpCall(
        this.api.apiLists.DetailBusinessCard +
          `?id=${id}&uid=${this.generalService.currentUser.userId}`,
        {},
        {},
        'post',
        true
      );
      if (this.businessCardDetail) {
        this.addForm = this.formBuilder.group({
          name: [this.businessCardDetail.hoten, [Validators.required]],
          ghichu: [this.businessCardDetail.ghichu],
          sdt: [
            this.businessCardDetail.dienthoai,
            [
              Validators.pattern('[- +()0-9]+'),
              Validators.minLength(6),
              Validators.maxLength(10),
            ],
          ],
          email: [this.businessCardDetail.email, [Validators.email]],
        });
      } else {
        return false;
      }
      console.log(this.businessCardDetail);
    } catch (error) {
      console.log(error);
      this.router.navigate([`/personal/business-card`]);
    }
  }
  get f() {
    return this.addForm.controls;
  }
  getLabel(key) {
    return data[`${this.generalService.currentLanguage.Code}`][`${key}`];
  }
  async addBusiness() {
    this.submitted = true;
    const obj = {
      hoten: this.addForm.value.name,
      dienthoai: this.addForm.value.sdt,
      email: this.addForm.value.email,
      ghichu: this.addForm.value.ghichu,
    };
    if (this.addForm.valid) {
      try {
        console.log(obj);
        await this.api.httpCall(
          this.api.apiLists.CreateBusinessCard,
          {},
          obj,
          'post',
          true
        );
        this.toaster.success('', 'Thêm Thành Công!', {
          timeOut: 2500,
        });
        this.router.navigate(['/personal/business-card']);
      } catch (error) {
        console.log(error);
        this.toaster.error('', 'Thêm Thất Bại', {
          timeOut: 2500,
        });
      }
    } else {
      return false;
    }
  }
  async deleteBussiness() {
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
            this.api.apiLists.deleteBusinessCard,
            {},
            {
              id: this.state.idDetail,
            },
            'post',
            true
          );
          this.toaster.success('', 'Xóa Thành Công!', {
            timeOut: 2500,
          });
          this.router.navigate(['/personal/business-card']);
        } catch (error) {
          console.log(error);
          this.toaster.error('', 'Xóa Thất Bại', {
            timeOut: 2500,
          });
        }
      }
    });
  }
  async updateBussiness() {
    this.submitted = true;
    const obj = {
      iddanhthiep: this.state.idDetail,
      hoten: this.addForm.value.name,
      dienthoai: this.addForm.value.sdt,
      email: this.addForm.value.email,
      ghichu: this.addForm.value.ghichu,
    };
    if (this.addForm.valid) {
      try {
        console.log(obj);
        await this.api.httpCall(
          this.api.apiLists.updateBusinessCard,
          {},
          obj,
          'post',
          true
        );
        this.toaster.success('', 'Sửa Thành Công!', {
          timeOut: 2500,
        });
        this.router.navigate(['/personal/business-card']);
      } catch (error) {
        console.log(error);
        this.toaster.error('', 'Sửa Thất Bại', {
          timeOut: 2500,
        });
      }
    } else {
      return false;
    }
  }
  return() {
    this.router.navigate(['/personal/business-card']);
  }
}
