import { Component, ElementRef, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { HttpClient } from '@angular/common/http';
import data from './event.language';
import { Router } from '@angular/router';
import { Event } from 'src/app/Model/Event';
import { ApiservicesService } from 'src/app/services/api.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent implements OnInit {
  EventNotApproved;
  editable = true;
  eventDetail = {
    date: '',
    title: '',
    description: '',
    location: '',
    time_start: '',
    time_end: '',
    status: null,
  };
  eventSandbox;
  currentTab = true;

  spinnerLoading = false;
  eventListData;
  page = 0;
  pageSize = 10;
  pageSizes = [10, 20, 30];
  count = 500;

  config;
  constructor(
    private httpClient: HttpClient,
    private el: ElementRef,
    public generalService: GeneralService,
    private router: Router,
    private _location: Location,
    private api: ApiservicesService
  ) {}

  ngOnInit(): void {
    this.gData(0);
  }
  seeDetail(obj) {
    this.editable = true;
    this.eventDetail = { ...obj };
  }
  editEvent() {
    this.editable = false;
    this.eventSandbox = { ...this.eventDetail };
  }
  cancelEditEvent() {
    this.editable = true;
    this.eventDetail = { ...this.eventSandbox };
  }
  changeTabs(tab) {
    this.currentTab = tab;
    this.page = 0;
    this.count = 0;
    this.pageSize = 10;
    this.gData(0);
  }
  openNewEvent() {
    this.router.navigate(['/event/new-event']);
  }
  async gData(n: number) {
    this.spinnerLoading = true;
    this.EventNotApproved = await this.api.httpCall(
      this.api.apiLists.GetAllEventByType + `?type=${n}`,
      {},
      {},
      'get',
      true
    );
    console.log(this.EventNotApproved);
    this.httpClient
      .get(
        'https://62e7546c69bd03090f7b852b.mockapi.io/Event?status=' +
          this.currentTab
      )
      .subscribe((i) => {
        this.eventListData = i;
        this.config = {
          id: 'paging',
          itemsPerPage: this.pageSize,
          currentPage: this.page,
          totalItems: this.eventListData.length,
        };
        this.spinnerLoading = false;
      });
  }
  handlePageChange(event): void {
    this.page = event;
    this.gData(0);
  }
  getLabel(key) {
    return data[`${this.generalService.currentLanguage.Code}`][`${key}`];
  }
  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 0;
    this.gData(0);
  }
}
