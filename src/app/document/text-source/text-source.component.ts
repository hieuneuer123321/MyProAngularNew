import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-text-source',
  templateUrl: './text-source.component.html',
  styleUrls: ['./text-source.component.css']
})
export class TextSourceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.taoDuLieu()
  }


  config
  page = 0;
  pageSize = 10;
  pageSizes = [5,10];
  textsourceDuLieu=[]
  count = 100;


  taoDuLieu(){
    for (let i = 0; i < this.count; i++) {
      let GiaTri= {
      'nume_rical_order':i+1,
      'textsource_name': 'Tên nguồn văn bản',
      }
      this.textsourceDuLieu.push(GiaTri)
    };
    this.config = {
      id: 'paging',
      itemsPerPage: this.pageSize,
      currentPage: this.page,
      totalItems: this.textsourceDuLieu.length
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
