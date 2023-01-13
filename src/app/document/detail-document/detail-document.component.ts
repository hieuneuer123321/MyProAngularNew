import { Document } from 'src/app/Model/Document';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from 'src/app/services/general.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiservicesService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail-document',
  templateUrl: './detail-document.component.html',
  styleUrls: ['./detail-document.component.css'],
})
export class DetailDocumentComponent implements OnInit {
  spinnerLoading = false;
  documentDetail;
  nameSource;
  nameDepartment;
  nameFile;
  constructor(
    private httpClient: HttpClient,
    public generalService: GeneralService,
    private router: Router,
    private api: ApiservicesService,
    private toaster: ToastrService,
    public routerAc: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getData(this.routerAc.snapshot.params['id']);
  }
  async getData(id) {
    this.spinnerLoading = true;
    this.documentDetail = await this.api.httpCall(
      this.api.apiLists.GetDocumentDetail + `?idvb=${id}`,
      {},
      {},
      'get',
      true
    );
    if (this.documentDetail) {
      this.getNameFileById(this.documentDetail.loaiVB);
      this.getNameSourceById(this.documentDetail.nguonVanBan);
      this.getNameLuuBanCung(this.documentDetail.luHoSo);
    }
    console.log(this.documentDetail);
    this.spinnerLoading = false;
  }
  async getNameFileById(id) {
    try {
      const arrTemp = [];
      const dataAPI: any = await this.api.httpCall(
        this.api.apiLists.GetAllDocumentsFolder,
        {},
        {},
        'get',
        true
      );
      dataAPI.forEach((element) => {
        arrTemp.push(element);
        if (element.childNode.length > 0) {
          element.childNode.forEach((item) => {
            arrTemp.push(item);
          });
        }
      });
      const folder = arrTemp.find((item) => {
        if (item.idNhomVb) return item.idNhomVb == id;
        else if (item.idnhomvb) return item.idnhomvb == id;
        else return;
      });
      if (folder) {
        if (folder.tenNhom) this.nameFile = folder.tenNhom;
        else if (folder.tennhom) this.nameFile = folder.tennhom;
        else this.nameFile = '';
      } else {
        this.nameFile = '';
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getNameSourceById(id) {
    try {
      const dataAPI: any = await this.api.httpCall(
        this.api.apiLists.GetAllSourceDocuments,
        {},
        {},
        'get',
        true
      );
      const source = dataAPI.find((item) => {
        return item.idnguonvb == id;
      });
      this.nameSource = source ? source.tennguon : '';
    } catch (error) {
      console.log(error);
    }
  }
  getNameLuuBanCung(id) {
    this.nameDepartment;
    const department = this.generalService;
    console.log(department);
  }
}
