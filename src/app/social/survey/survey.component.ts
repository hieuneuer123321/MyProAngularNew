import { Component, ElementRef, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import data from './survey.language';
@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  constructor(private el: ElementRef, public generalService: GeneralService) { }
  surveyData = []
  spinnerLoading = false;
  page = 0;
  pageSize = 10;
  pageSizes = [10, 20, 30];
  count = 500;
  config
  ngOnInit(): void {
    this.gData()
  }
  gData() {
    this.surveyData = []
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
        title: randomText(),
        startDate: randomDate(),
        endDate: randomDate(),
        numberOfQuestion: Math.floor(Math.random() * 50)
      }
      this.surveyData.push(d);
    }
    this.config = {
      id: 'paging',
      itemsPerPage: this.pageSize,
      currentPage: this.page,
      totalItems: this.surveyData.length
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
