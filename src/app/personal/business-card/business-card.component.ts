import { Component, OnInit } from '@angular/core';

import { GeneralService } from 'src/app/services/general.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import data from './business-card.language';



@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.css']
})
export class BusinessCardComponent implements OnInit {


  editable = true;
  businesscardDetail = {
    "date": "",
    "title": "",
    "description": "",
    "location": "",
    "time_start": "",
    "time_end": "",
    "status": null,
  }
  businesscardSandbox;
  currentTab = true;

  spinnerLoading = false;
  businesscardData: any
  page = 0;
  pageSize = 10;
  pageSizes = [10, 20, 30];
  count = 500;

  config
  keyFilter = 
  {key:"nhomcongviec",label:"Nhóm công việc"}
  constructor(private httpClient: HttpClient,  public generalService: GeneralService, private router: Router) { }

  ngOnInit(): void {
    this.gData();
  }
  seeDetail(obj) {
    this.editable = true;
    this.businesscardDetail = { ...obj }
  }
  editBusinessCard() {
    this.editable = false;
    this.businesscardSandbox = { ...this.businesscardDetail }
  }
  cancelEditEvent() {
    this.editable = true;
    this.businesscardDetail = { ...this.businesscardSandbox }
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
  async gData() {
    this.spinnerLoading = true;
    this.httpClient.get('https://62e7546c69bd03090f7b852b.mockapi.io/Event?status=' + this.currentTab).subscribe(i => {
      this.businesscardData = i;
      this.config = {
        id: 'paging',
        itemsPerPage: this.pageSize,
        currentPage: this.page,
        totalItems: this.businesscardData.length
      }
      this.spinnerLoading = false;
    })
  }
  handlePageChange(businesscard): void {
    this.page = businesscard;
    this.gData();
  }
  getLabel(key) {
    return data[`${this.generalService.currentLanguage.Code}`][`${key}`]
  }
  handlePageSizeChange(businesscard): void {
    this.pageSize = businesscard.target.value;
    this.page = 0;
    this.gData();
  }
  filter(type,label) {
    this.keyFilter = {key:type,label:label}
  }
 

}





