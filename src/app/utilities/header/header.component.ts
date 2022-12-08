import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import data from './header.language';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  customerLList : any = [];
  searchName:any;
  dictionary
  labelforsearch=''
  listOfFlags = [
    {
      "Code":'EN',
      "Name": "English",
      "URL": 'assets/images/flags/us.jpg'
    },
    {
      "Code":"VN",
      "Name": "Tiếng Việt",
      "URL": 'assets/images/flags/vietnam.png'
    }
  ]
  test(){
    console.log(this.labelforsearch)
  }

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  constructor(public generalService: GeneralService, private router:Router) {}

  getLabel(key)
  {
    return data[`${this.generalService.currentLanguage.Code}`][`${key}`]
  }

  ngOnInit() {}

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  logout() {
    this.generalService.logout();
  }

  changeLanguage(flag) {
    this.generalService.currentLanguage = flag;
  }
  personalInfo()
  {
    this.router.navigate(['/user/info'])
  }
  changePassword()
  {
    this.router.navigate(['/user/change-password'])
  }
  helpPage()
  {
    this.router.navigate(['/user/help'])
  } 
  
  
}
