import { Component, OnInit } from '@angular/core';
import data from './internal-text.language'
import { Router } from '@angular/router';import { combineAll } from 'rxjs/operators';
;

@Component({
  selector: 'app-internal-text',
  templateUrl: './internal-text.component.html',
  styleUrls: ['./internal-text.component.css']
})
export class InternalTextComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
    this.taoDuLieu()
    this.tinhNam()
  }
  editable = true;
  internaltextsData = []
  documentSandbox;
  internalTextnamMoi = []
  internalTextDuLieu=['Giám đốc','Trưởng phòng','Nhân viên CNTT']
  currentTab = true;

  spinnerLoading = false;

  page = 0;
  pageSize = 10;
  pageSizes = [10, 20, 30];
  count =5;

  config

  taoDuLieu(){
    for (let i = 0; i < this.count; i++) {
      let GiaTriMoi = {
      'nume_rical_order':i+1,
      'text_number': 'Số VB',
      'abstract': 'Trích yếu',
      'recipients': 'Nơi nhận',
      'release_date': 'Ngày phát hành',
      'drafting_place': 'Nơi soạn thảo',
      
      }
      this.internaltextsData.push(GiaTriMoi)
    };
    this.config = {
      id: 'paging',
      itemsPerPage: this.pageSize,
      currentPage: this.page,
      totalItems: this.internaltextsData.length
    }
}
tinhNam(){
  for ( let i=0; i<=20; i++){
    this.internalTextnamMoi.push(2022-i)
  }

}
handlePageChange(event): void {
  this.page = event;
  this.taoDuLieu();
}
handlePageSizeChange(event): void {
  this.pageSize = event.target.value;
  this.page = 0;
  this.taoDuLieu();
}

}