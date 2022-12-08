import { Component, ElementRef, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import data from 'src/app/users/change-password/change-password.language';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  [x: string]: any;

  editable = true;
  customersDetail = {}
  customersSandbox;
  currentTab = true;

  spinnerLoading = false;
  customersData
  page = 0;
  pageSize = 10;
  pageSizes = [10, 20, 30];
  count = 500;

  config
  constructor(private httpClient: HttpClient, private el: ElementRef, public generalService: GeneralService, private router: Router) { }

  ngOnInit(): void {
    this.gData();
  }
  seeDetail(obj) {
    this.editable = true;
    this.customersDetail = { ...obj }
  }
  editcustomers() {
    this.editable = false;
    this.customersSandbox = { ...this.customersDetail }
  }
  cancelEditcustomers() {
    this.editable = true;
    this.customersDetail = { ...this.customersSandbox }
  }
  changeTabs(tab) {
    this.currentTab = tab;
    this.page = 0;
    this.count = 0;
    this.pageSize = 10;
    this.gData();
  }
  openNewcustomers() {
    this.router.navigate(['/customers/new-customers']);
  }
  async gData() {
    this.spinnerLoading = true;
    this.httpClient.get('https://630305469eb72a839d776a92.mockapi.io/customers').subscribe(i => {
      this.customersListData = i;
      console.log(i)
      this.config = {
        id: 'paging',
        itemsPerPage: this.pageSize,
        currentPage: this.page,
        totalItems: this.customersListData.length
      }
      this.spinnerLoading = false;
    })
  }
  handlePageChange(event): void {
    this.page = event;
    this.gData();
  }
  getLabel(key) {
    return data[`${this.generalService.currentLanguage.Code}`][`${key}`]
  }
  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 0;
    this.gData();
  }
  }
