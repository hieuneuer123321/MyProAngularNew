import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { HttpClient } from '@angular/common/http';
import data from 'src/app/tasks/task-list/task-list.language';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  editable = true;
  deletetable = true;
  countryData
  districtsData
  provincescode = "thanh_pho_ha_noi"
  customersListData
  

  spinnerLoading = false;
  eventListData
  page = 0;
  pageSize = 10;
  pageSizes = [10, 20, 30];
  count = 500;
  

  config
  constructor(private httpClient: HttpClient, private el: ElementRef, public generalService: GeneralService, private router: Router) { }

  ngOnInit(): void {
  this.gData();
  this.eData();
  }
  async gData() {
    this.httpClient.get('https://provinces.open-api.vn/api/?depth=2').subscribe(i => {
      this.countryData = i;
      this.setProvincesCode(this.provincescode)
    })
  }
  setProvincesCode(e) {
    this.countryData?.forEach(element => {
      if (element.codename === e) {
        this.districtsData = element.districts
      }
    });
  }
  
  async eData() {
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
}
