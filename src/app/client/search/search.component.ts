import { Component, OnInit, ElementRef} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from 'src/app/services/general.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private httpClient: HttpClient, private el: ElementRef, public generalService: GeneralService, private router: Router) { }

  ngOnInit(): void {
  }
spinnerLoading = false;
  customersListData
  page = 0;
  pageSize = 10;
  pageSizes = [10, 20, 30];
  count = 500;

  config
  async gData() {
    this.spinnerLoading = true;
    this.httpClient.get('https://630305469eb72a839d776a92.mockapi.io/customers').subscribe(i => {
      this.customersListData = i;
      console.log(i)
      this.config = {
        id: 'paging',
        itemsPerPage: this.pageSize,
        currentPage: this.page,
        totalItems: this.customersListData.length
      }
      this.spinnerLoading = false;
    })
  }

}
