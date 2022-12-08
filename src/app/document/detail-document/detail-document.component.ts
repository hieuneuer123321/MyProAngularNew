import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-detail-document',
  templateUrl: './detail-document.component.html',
  styleUrls: ['./detail-document.component.css']
})
export class DetailDocumentComponent implements OnInit {

  constructor( private api: HttpClient,) { }

  ngOnInit(): void {
    this.taoDuLieu()
  }
  editable = true;
  detaildocumentData
  incomingnamMoi = []
  incomingtextDuLieu=['Giám đốc','Trưởng phòng','Nhân viên CNTT']
  documentSandbox;
  currentTab = true;

  spinnerLoading = false;

  page = 0;
  pageSize = 10;
  pageSizes = [10, 20, 30];
  count = 500;

  config
  fileToUpload

  taoDuLieu() {
    this.api.get('https://6315b3ad33e540a6d382505e.mockapi.io/giatrimoi').subscribe((x) => {
      this.detaildocumentData = x
      this.config = {
        id: 'paging',
        itemsPerPage: this.pageSize,
        currentPage: this.page,
        totalItems: this.detaildocumentData.length
      }
    })
    console.log(this.detaildocumentData)
  }
  tinhNam(){
    for ( let i=0; i<=20; i++){
      this.incomingnamMoi.push(2022-i)
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

}


