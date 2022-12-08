import { Component, OnInit } from '@angular/core';
import { IMyDateModel, IAngularMyDpOptions } from 'angular-mydatepicker';
import { ToastrService } from 'ngx-toastr';
import { ApiservicesService } from 'src/app/services/api.service';
import { GeneralService } from 'src/app/services/general.service';
import data from './personal-info.language';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {
  email = ''
  phonenumber = ''
  title = ''
  public myDatePickerOptions: IAngularMyDpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',
  };

  // Initialized to specific date (09.10.2018).
  public birthDate: any = { date: { year: 2018, month: 10, day: 9 } };

  constructor(public generalService: GeneralService, public api: ApiservicesService, public toaster: ToastrService) { }

  getLabel(key)
  {
    return data[`${this.generalService.currentLanguage.Code}`][`${key}`]
  }
  
  ngOnInit(): void {
    if (this.generalService.currentUser != null) {
      this.email = this.generalService.currentUser.email;
      this.phonenumber = this.generalService.currentUser.phone;
      this.title = this.generalService.currentUser.title;
    }
  }
  onDateChanged(event: IMyDateModel): void {
    // date selected
    console.log(event)
  }
  async updateUserInfo() {
    try {
      let res = await this.api.httpCall(this.api.apiLists.updateUserInfo, {}, {
        "userId": this.generalService.currentUser.userId,
        "fullName": this.generalService.currentUser.fullName,
        "groupIdChinh": this.generalService.currentUser.groupIdChinh,
        "title": this.title,
        "email": this.email,
        "phone": this.phonenumber,
        "active": this.generalService.currentUser.active,
        "nguoiTao": this.generalService.currentUser.nguoiTao,
        "isLeader": this.generalService.currentUser.isLeader
      }, 'post', true);
      this.toaster.success('', 'Cập nhật thành công!', {
        timeOut: 2000,
      });
      this.api.initDataFromServer()
    } catch (error) {
      this.toaster.error('', 'Đã xảy ra lỗi kết nối với hệ thống. Xin vui lòng thử lại.', {
        timeOut: 3000,
      });
    }
  }
}
