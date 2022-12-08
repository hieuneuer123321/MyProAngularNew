import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import data from './sidebar.language';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(public generalService: GeneralService, private router: Router) { }
  items = data;
  ngOnInit() {
  }

  routeNavigator(route) {
    console.log(route)
    this.router.navigate([route]);
    this.router.isActive(route, true);
  }

  getLabel(key) {
    return data[`${this.generalService.currentLanguage.Code}`][`${key}`]
  }
}
