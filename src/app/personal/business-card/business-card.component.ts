import { Component, OnInit } from '@angular/core';

import { GeneralService } from 'src/app/services/general.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import data from './business-card.language';
import { ApiservicesService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.css'],
})
export class BusinessCardComponent implements OnInit {
  editable = true;
  businesscardDetail = {
    date: '',
    title: '',
    description: '',
    location: '',
    time_start: '',
    time_end: '',
    status: null,
  };
  businesscardSandbox;
  currentTab = true;
  groupTask;
  spinnerLoading = false;
  businesscardData: any;
  page = 0;
  pageSize = 10;
  pageSizes = [10, 20, 30];
  count = 500;
  config = {
    id: 'paging',
    itemsPerPage: 0,
    currentPage: 0,
    totalItems: 0,
  };
  keyFilter = { key: 'nhomcongviec', label: 'Nhóm công việc' };
  constructor(
    private httpClient: HttpClient,
    public generalService: GeneralService,
    public api: ApiservicesService,
    public routerAc: ActivatedRoute,
    private router: Router,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.gData();
  }
  seeDetail(obj) {
    this.editable = true;
    this.businesscardDetail = { ...obj };
  }
  editBusinessCard() {
    this.editable = false;
    this.businesscardSandbox = { ...this.businesscardDetail };
  }
  cancelEditEvent() {
    this.editable = true;
    this.businesscardDetail = { ...this.businesscardSandbox };
  }
  changeTabs(tab) {
    this.currentTab = tab;
    this.page = 0;
    this.count = 0;
    this.pageSize = 10;
    this.gData();
  }
  openAddBusinessCard() {
    this.router.navigate(['/personal/add-business-card']);
  }
  openAddWorkGroup() {
    this.router.navigate(['/personal/add-workgroup']);
  }
  showDetail(id) {
    this.router.navigate([`/personal/business-card/${id}`]);
  }
  async gData() {
    this.spinnerLoading = true;
    try {
      const dataList: any = await this.api.httpCall(
        this.api.apiLists.getBusinessCardByUser,
        {},
        {},
        'get',
        true
      );
      if (dataList.length > 0) {
        this.businesscardData = dataList.reverse();
      }
      this.config = {
        id: 'paging',
        itemsPerPage: this.pageSize,
        currentPage: this.page,
        totalItems: this.businesscardData.length,
      };

      console.log(this.businesscardData);
      this.groupTask = await this.api.httpCall(
        this.api.apiLists.GetWorkingGroup,
        {},
        {},
        'get',
        true
      );
    } catch (error) {
      console.log(error);
    }
    this.spinnerLoading = false;
  }
  handlePageChange(businesscard): void {
    this.page = businesscard;
    this.gData();
  }
  getLabel(key) {
    return data[`${this.generalService.currentLanguage.Code}`][`${key}`];
  }
  handlePageSizeChange(businesscard): void {
    this.pageSize = businesscard.target.value;
    this.page = 0;
    this.gData();
  }
  filter(type, label) {
    this.keyFilter = { key: type, label: label };
  }
  detailGroupTask(id) {
    this.router.navigate([`/personal/add-workgroup/${id}`]);
  }
}
