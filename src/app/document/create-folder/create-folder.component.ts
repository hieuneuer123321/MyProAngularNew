import { async } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiservicesService } from 'src/app/services/api.service';
import { GeneralService } from 'src/app/services/general.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-create-folder',
  templateUrl: './create-folder.component.html',
  styleUrls: ['./create-folder.component.css'],
})
export class CreateFolderComponent implements OnInit {
  folderStructure;
  editMode = false;
  idShowChildren;
  showChi = false;
  idUpdate;
  idParent = '';
  create_folder_new;
  ////
  submitted = false;
  error: {};
  addForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    nameVT: [''],
    stt: ['', [Validators.pattern('[- +()0-9]+'), Validators.required]],
  });
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
  get a() {
    return this.addForm.controls;
  }

  tuyDung(idNhomVb, tenNhom, tenVt, stt, childNode, editMode) {
    this.create_folder_new = true;
    this.idParent = idNhomVb;
    console.log(idNhomVb);
    this.editMode = editMode;
    if (this.editMode) {
      this.addForm = this.formBuilder.group({
        name: [tenNhom, [Validators.required]],
        nameVT: [tenVt],
        stt: [stt, [Validators.pattern('[- +()0-9]+'), Validators.required]],
      });
    } else {
      this.addForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        nameVT: [''],
        stt: ['', [Validators.pattern('[- +()0-9]+'), Validators.required]],
      });
    }
  }
  async getData() {
    try {
      const dataAPI: any = await this.api.httpCall(
        this.api.apiLists.GetAllDocumentsFolder,
        {},
        {},
        'get',
        true
      );
      this.folderStructure = dataAPI.sort((a, b) => {
        return b.stt - a.stt;
      });
      console.log(this.folderStructure);
    } catch (error) {
      console.log(error);
    }
  }
  showChildren(id) {
    console.log(id);
    if (this.idShowChildren != id) {
      this.showChi = true;
    } else {
      this.idShowChildren = id;
      this.showChi = this.showChi ? false : true;
    }
    this.idShowChildren = id;
  }
  async add(idParent = 0, stt, name, nameVT) {
    this.submitted = true;
    const obj = {
      stt: stt,
      tenNhom: name,
      tenVT: nameVT,
      parentId: idParent,
    };
    console.log(obj);
    if (this.addForm.valid) {
      try {
        await this.api.httpCall(
          this.api.apiLists.CreateNewDocumentsFolder,
          {},
          obj,
          'post',
          true
        );
        this.getData();
        this.toaster.success('', 'Thêm Thành Công!', {
          timeOut: 2500,
        });
      } catch (error) {
        console.log(error);
        this.toaster.error('', 'Thêm Thất Bại!', {
          timeOut: 2500,
        });
      }
    } else return;
  }
  async update(idParent = 0, stt, name, nameVT) {
    this.submitted = true;
    const obj = {
      id: idParent,
      stt: stt,
      tenNhom: name,
      tenVT: nameVT,
    };
    console.log(obj);
    if (this.addForm.valid && this.editMode) {
      try {
        await this.api.httpCall(
          this.api.apiLists.UpdateDocumentsFolder,
          {},
          obj,
          'post',
          true
        );

        this.getData();
        this.toaster.success('', 'Sửa Thành Công!', {
          timeOut: 2500,
        });
      } catch (error) {
        console.log(error);
        this.toaster.error('', 'Sửa Thất Bại!', {
          timeOut: 2500,
        });
      }
    } else return;
  }
  async addFolder() {
    this.submitted = true;
    if (this.idParent && !this.editMode) {
      this.add(
        Number(this.idParent),
        this.addForm.value.stt,
        this.addForm.value.name,
        this.addForm.value.nameVT
      );
    } else if (this.editMode) {
      this.update(
        Number(this.idParent),
        this.addForm.value.stt,
        this.addForm.value.name,
        this.addForm.value.nameVT
      );
    } else {
      this.add(
        0,
        this.addForm.value.stt,
        this.addForm.value.name,
        this.addForm.value.nameVT
      );
    }

    this.create_folder_new = false;
  }
  async deleteFolder(id) {
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
            this.api.apiLists.DeleteDocumentsFolder + `?idvb=${id}`,
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
}
