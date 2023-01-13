import { async } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiservicesService } from 'src/app/services/api.service';
import { GeneralService } from 'src/app/services/general.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-text-source',
  templateUrl: './text-source.component.html',
  styleUrls: ['./text-source.component.css'],
})
export class TextSourceComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  @ViewChild('closebuttonAdd') closebuttonAdd;
  ///
  idUpdate;
  sourceUpdate = {
    id: '',
    ten: '',
    stt: '',
  };
  editMode = false;

  textSourceList;
  config = {
    id: 'paging',
    itemsPerPage: 0,
    currentPage: 0,
    totalItems: 0,
  };
  page = 0;
  pageSize = 10;
  pageSizes = [5, 10];
  count = 100;
  ///
  submitted = false;
  error: {};
  addForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    stt: ['', [Validators.pattern('[- +()0-9]+'), Validators.required]],
  });
  ///
  constructor(
    private httpClient: HttpClient,
    private el: ElementRef,
    private formBuilder: FormBuilder,
    public generalService: GeneralService,
    private router: Router,
    private api: ApiservicesService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  // closeModalAdd() {
  //   this.addForm = this.formBuilder.group({
  //     name: ['', [Validators.required]],
  //     stt: ['', [Validators.pattern('[- +()0-9]+'), Validators.required]],
  //   });
  // }
  async getData() {
    try {
      const dataAPI: any = await this.api.httpCall(
        this.api.apiLists.GetAllSourceDocuments,
        {},
        {},
        'get',
        true
      );
      console.log(dataAPI);
      this.textSourceList = dataAPI.sort((a, b) => {
        return a.stt - b.stt;
      });
      this.config = {
        id: 'paging',
        itemsPerPage: this.pageSize,
        currentPage: this.page,
        totalItems: this.textSourceList.length,
      };
    } catch (error) {
      console.log(error);
    }
  }
  get a() {
    return this.addForm.controls;
  }
  async addSource() {
    this.editMode = false;
    this.submitted = true;
    if (this.addForm.valid) {
      try {
        await this.api.httpCall(
          this.api.apiLists.CreateNewDocumentsSource,
          {},
          {
            stt: this.addForm.value.stt,
            tenNguon: this.addForm.value.name,
          },
          'post',
          true
        );
        this.closebuttonAdd.nativeElement.click();
        this.toaster.success('', 'Thêm Thành Công!', {
          timeOut: 2500,
        });
      } catch (error) {
        console.log(error);
        this.toaster.error('', 'Thêm Thất Bại!', {
          timeOut: 2500,
        });
      }
    } else {
      return;
    }
    this.getData();
  }
  async deleteSource(id) {
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
            this.api.apiLists.DeleteDocumentsSource + `?idvb=${id}`,
            {},
            {},
            'post',
            true
          );
          this.toaster.success('', 'Xóa Thành Công!', {
            timeOut: 2500,
          });
          this.getData();
        } catch (error) {
          console.log(error);
          this.toaster.error('', 'Xóa Thất Bại', {
            timeOut: 2500,
          });
        }
      }
    });
  }
  getSourceUpdate(id, ten, stt) {
    this.editMode = true;
    this.idUpdate = id;
    this.sourceUpdate.id = id;
    this.sourceUpdate.ten = ten;
    this.sourceUpdate.stt = stt;
    console.log(id, ten, stt);
    // this.addForm.value.name = ten;
    this.addForm = this.formBuilder.group({
      name: [ten, [Validators.required]],
      stt: [stt, [Validators.pattern('[- +()0-9]+'), Validators.required]],
    });
  }
  async updateSource() {
    this.submitted = true;
    if (this.addForm.valid && this.editMode) {
      const obj = {
        idnguonvb: this.idUpdate,
        stt: this.addForm.value.stt,
        tenNguon: this.addForm.value.name,
        parentid: null,
      };
      console.log(obj);
      try {
        await this.api.httpCall(
          this.api.apiLists.UpdateDocumentsSource,
          {},
          obj,
          'post',
          true
        );
        this.closebuttonAdd.nativeElement.click();
        this.toaster.success('', 'Sửa Thành Công!', {
          timeOut: 2500,
        });
      } catch (error) {
        console.log(error);
        this.toaster.success('', 'Sửa Thất Bại!', {
          timeOut: 2500,
        });
      }
    } else {
      return;
    }
    this.getData();
  }
  handlePageChange(event): void {
    this.page = event;
    this.getData();
  }
  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 0;
    this.getData();
  }
}
