import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import data from './change-password.language';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  getLabel(key)
  {
    return data[`${this.generalService.currentLanguage.Code}`][`${key}`]
  }
  constructor(public generalService:GeneralService) { }

  ngOnInit(): void {
  }

}
