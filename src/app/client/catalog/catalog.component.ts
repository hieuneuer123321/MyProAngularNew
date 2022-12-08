import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  spinnerLoading = false
  catalogData
  config
  page = 0;
  pageSize = 10;
  pageSizes = [10, 20, 3];
  count = 500;
  keyFilter = 
  {key:"loaikhach",label:"Loại khách hàng"}
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.gData();
  }
  filter(type,label) {
    this.keyFilter = {key:type,label:label}
  }
  async gData() {
    this.spinnerLoading = true;
    this.httpClient.get('https://630305469eb72a839d776a92.mockapi.io/danhmuc').subscribe(i => {
      this.catalogData = i;
      console.log(i)
      this.config = {
        id: 'paging',
        itemsPerPage: this.pageSize,
        currentPage: this.page,
        totalItems: this.catalogData.length
      }
      this.spinnerLoading = false;
    })
  }
}
