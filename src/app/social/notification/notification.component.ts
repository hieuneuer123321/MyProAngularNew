import { Component, ElementRef, OnInit } from '@angular/core';
import data from './notification.language'
import { GeneralService } from 'src/app/services/general.service';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notificationData = []
  lorem = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur ea consectetur itaque odit similique harum odio est illo incidunt soluta distinctio, esse architecto vero sequi expedita adipisci deserunt illum ullam?'
  spinnerLoading = false;
  page = 0;
  pageSize = 10;
  pageSizes = [10, 20, 30];
  count = 500;

  config
  constructor(private el: ElementRef, public generalService: GeneralService) { }
  ngOnInit(): void {
    this.gData()
  }
  gData() {
    this.notificationData = []
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
        title: randomText(),
        description: randomText(),
        date: randomDate(),
        author: randomText(),
      }
      this.notificationData.push(d);
    }
    this.config = {
      id: 'paging',
      itemsPerPage: this.pageSize,
      currentPage: this.page,
      totalItems: this.notificationData.length
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
