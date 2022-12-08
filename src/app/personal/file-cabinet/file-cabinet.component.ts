import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import data from './file-cabinet.language';
@Component({
  selector: 'app-file-cabinet',
  templateUrl: './file-cabinet.component.html',
  styleUrls: ['./file-cabinet.component.css']
})
export class FileCabinetComponent implements OnInit {
  editable = true;
  filecabinetDetail = {
    "date": "",
    "title": "",
    "description": "",
    "location": "",
    "time_start": "",
    "time_end": "",
    "status": null,
  }
  filecabinetSandbox;
  currentTab = true;

  spinnerLoading = false;
  filecabinetData: any
  page = 0;
  pageSize = 10;
  pageSizes = [10, 20, 30];
  count = 500;

  config
  constructor(private httpClient: HttpClient,  public generalService: GeneralService, private router: Router) { }

  ngOnInit(): void {
    this.gData();
  }
  seeDetail(obj) {
    this.editable = true;
    this.filecabinetDetail = { ...obj }
  }
  editEvent() {
    this.editable = false;
    this.filecabinetSandbox = { ...this.filecabinetDetail }
  }
  cancelEditEvent() {
    this.editable = true;
    this.filecabinetDetail = { ...this.filecabinetSandbox }
  }
  changeTabs(tab) {
    this.currentTab = tab;
    this.page = 0;
    this.count = 0;
    this.pageSize = 10;
    this.gData();
  }
  openNewFileCabinet(): void {
    this.router.navigate(['/personal/new-file-cabinet']);
  }
  async gData() {
    this.spinnerLoading = true;
    this.httpClient.get('https://62e7546c69bd03090f7b852b.mockapi.io/Event?status=' + this.currentTab).subscribe(i => {
      this.filecabinetData = i;
      this.config = {
        id: 'paging',
        itemsPerPage: this.pageSize,
        currentPage: this.page,
        totalItems: this.filecabinetData.length
      }
      this.spinnerLoading = false;
    })
  }
  handlePageChange(filecabinet): void {
    this.page = filecabinet;
    this.gData();
  }
  getLabel(key) {
    return data[`${this.generalService.currentLanguage.Code}`][`${key}`]
  }
  handlePageSizeChange(filecabinet): void {
    this.pageSize =filecabinet.target.value;
    this.page = 0;
    this.gData();
  }
 


  

}
