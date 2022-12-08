import { Component, ElementRef, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import data from './news.language';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  newGroupTitle = ["Y tế", "An ninh", '...']
  newsData = []
  spinnerLoading = false;

  page = 0
  pageSize = 6
  pageSizes = [6, 12, 36]
  count = 100;
  config
  constructor(private el: ElementRef, public generalService: GeneralService) { }

  ngOnInit(): void {
    this.gData();
  }

  gData() {

    this.newsData = []
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
        image: `https://picsum.photos/id/${i + 100}/300/300`,
        title: randomText(),
        description: randomText(),
        date: randomDate(),
        by: randomText()
      }
      this.newsData.push(d);
    }
    this.config = {
      id: 'paging',
      itemsPerPage: this.pageSize,
      currentPage: this.page,
      totalItems: this.newsData.length
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
