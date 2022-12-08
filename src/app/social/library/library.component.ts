import { Component, ElementRef, OnInit } from '@angular/core';
import data from './library.language'
import { Router } from '@angular/router';
import { ApiservicesService } from 'src/app/services/api.service';
import { GeneralService } from 'src/app/services/general.service';
@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  editable = false;
  libraryData = []

  spinnerLoading = false;
  page = 0;
  pageSize = 10;
  pageSizes = [10, 20, 30];
  count = 500;

  config
  constructor(private el: ElementRef, private api: ApiservicesService, public generalService: GeneralService, private router: Router) { }
  ngOnInit(): void {
    this.gData()
  }
  lookup() {
    this.editable = false;
  }
  edit() {
    this.editable = true
  }
  update() {
    
  }
  delete() {

  }
  cancel() {
    this.editable = false;
  }
  gData() {
    this.libraryData = []
    for (let i = 0; i <= this.count; i++) {
      let randomDate = () => {
        let start = new Date(2012, 0, 1);
        let end = new Date();
        let date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        return date;
      }
      let randomText = () => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < 20; i++) {
          result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
        }
        return result;
      }
      let d = {
        number: i,
        des: randomText(),
        date: randomDate()
      }
      this.libraryData.push(d);
    }
    this.config = {
      id: 'paging',
      itemsPerPage: this.pageSize,
      currentPage: this.page,
      totalItems: this.libraryData.length
    }
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
