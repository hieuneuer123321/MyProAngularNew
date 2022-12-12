import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { ApiservicesService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username = 'administrator';
  password = 'oo1234@2018';
  isRememberPassword = true;
  isLoggingIn = false;
  content = {
    element: null,
    margin: null,
    style: null,
  };
  constructor(
    private toaster: ToastrService,
    private router: Router,
    private generalService: GeneralService,
    private api: ApiservicesService
  ) {}

  ngOnInit(): void {
    if (this.generalService.isLogin) this.router.navigate(['/home']);
  }
  // ngAfterViewInit(): void {
  //   this.content.element = document.getElementsByClassName('content-page')[0] as HTMLElement;
  //   this.content.style = this.content.element.currentStyle || window.getComputedStyle(this.content.element);
  //   this.content.margin = this.content.style.margin
  //   this.content.element.style.margin='0px'
  //   console.log(this.content.margin)
  // }
  // ngOnDestroy(): void {
  //   this.content.element.style.margin=this.content.margin
  // }
  async login() {
    if (!this.isLoggingIn) {
      this.isLoggingIn = true;
      try {
        let res = await this.api.httpCall(
          this.api.apiLists.login,
          {},
          {
            username: this.username,
            password: this.password,
          },
          'post',
          true
        );
        this.toaster.success('', 'Đăng nhập thành công!', {
          timeOut: 2000,
        });
        console.log(res);
        let result = <any>res;
        result['password'] = this.password;
        localStorage.setItem('userData', JSON.stringify(result));
        if (this.isRememberPassword)
          localStorage.setItem('isRememberLogin', '1');
        else localStorage.setItem('isRememberLogin', '0');

        this.generalService.userData = result;
        this.generalService.isLogin = true;
        this.router.navigate(['/home']);
        this.api.initDataFromServer();
      } catch (error) {
      } finally {
        this.isLoggingIn = false;
      }
    }
  }
}
