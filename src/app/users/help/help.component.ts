import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import data from './help.language';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  constructor(public generalService: GeneralService) { }
  getLabel(key)
  {
    return data[`${this.generalService.currentLanguage.Code}`][`${key}`]
  }
  ngOnInit(): void {
  }

}
