import { Component, ElementRef, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import data from './contact.language'

//for fake api
import { HttpClient } from '@angular/common/http';
import { promise } from 'protractor';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private el: ElementRef, public generalService: GeneralService, private httpClient: HttpClient) { }
  departmentList = ['Tất cả', 'Ban giám đốc', 'Phòng tổ chức hành chính', 'Phòng kỹ thuật']

  contactData = []
  spinnerLoading = false;
  page = 0;
  pageSize = 10;
  pageSizes = [10, 20, 30];
  count = 10;
  config
  ngOnInit(): void {
    this.gData();
  }
  gData() {
    this.contactData = []
    for (let i = 0; i <= this.count; i++) {
      let randomDate = () => {
        let start = new Date(2012, 0, 1);
        let end = new Date();
        let date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        return date;
      }
      let randomText = (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
        }
        return result;
      }
      let randomPhone = (length) => {
        var result = '09';
        var characters = '0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
        }
        return result;
      }
      let d = {
        fullName: randomText(20),
        permission: randomText(10),
        phoneNumber: randomPhone(8),
        email: randomText(10) + '@gmail.com',
        img: `https://picsum.photos/id/${Math.floor(Math.random() * 200)}/300/300`
      }
      this.contactData.push(d);
    }
    this.config = {
      id: 'paging',
      itemsPerPage: this.pageSize,
      currentPage: this.page,
      totalItems: this.contactData.length
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
