import { Component, OnInit } from '@angular/core';
import data from './search.language'
import { Router } from '@angular/router';;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']

}
)

export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.taoDuLieu()
  }
  editable = true;
  searchsData = []
  documentSandbox;
  currentTab = true;

  spinnerLoading = false;

  page = 0;
  pageSize = 10;
  pageSizes = [10, 20, 30];
  count = 500;
search_new
  config
  fileToUpload
  searchData

  taoDuLieu(){
    for (let i = 0; i < this.count; i++) {
      let GiaTriMoi = {
      'numerical_order':i+1,
      'text_notation': 'Kí hiệu VB',
      'data_text': 'Ngày tháng VB',
      'text_type_name_and_excerpt': 'Tên loại VB và Trích yếu',
      'editing_place': 'Nơi soạn thảo',
      'date_of_arrival': 'Ngày đến ',
      'quantity':'Số lượng '
      }
      this.searchsData.push(GiaTriMoi)
    };
    this.config = {
      id: 'paging',
      itemsPerPage: this.pageSize,
      currentPage: this.page,
      totalItems: this.searchsData.length
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
handleFileInput(files: FileList) {
  this.fileToUpload = Array.from(files);
  console.log(this.fileToUpload)
}
removeFileFromUploadList(index) {
  this.fileToUpload.splice(index, 1);
  const dt = new DataTransfer()
  const input = document.getElementById('fileList') as HTMLInputElement
  const { files } = input

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    if (index !== i)
      dt.items.add(file) // here you exclude the file. thus removing it.
  }

  input.files = dt.files
}
tuyChon()
{
this.search_new=true;
}

}