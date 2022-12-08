import { Component, ElementRef, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import data from 'src/app/users/change-password/change-password.language';


@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {
  [x: string]: any;

  editable = true;
  contractDetail = {}
  contractSandbox;
  currentTab = true;

  spinnerLoading = false;
  contractData
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
    this.contractDetail = { ...obj }
  }
  editContract() {
    this.editable = false;
    this.contractSandbox = { ...this.contractDetail }
  }
  cancelEditcontract() {
    this.editable = true;
    this.contractDetail = { ...this.contractSandbox }
  }
  changeTabs(tab) {
    this.currentTab = tab;
    this.page = 0;
    this.count = 0;
    this.pageSize = 10;
    this.gData();
  }
  openNewcontract() {
    this.router.navigate(['/contract/new-contract']);
  }
  async gData() {
    this.spinnerLoading = true;
    this.httpClient.get('https://630305469eb72a839d776a92.mockapi.io/contract').subscribe(i => {
      this.contractListData = i;
      console.log(i)
      this.config = {
        id: 'paging',
        itemsPerPage: this.pageSize,
        currentPage: this.page,
        totalItems: this.contractListData.length
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
  

