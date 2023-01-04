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
  error = {
    username: '',
    password: '',
  };
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
  async login() {
    this.error.username = '';
    this.error.password = '';
    if (localStorage.getItem('userData')) localStorage.removeItem('userData');
    if (localStorage.getItem('isRememberLogin'))
      localStorage.removeItem('isRememberLogin');
    if (this.username && this.password) {
      this.error.username = '';
      this.error.password = '';
      if (!this.isLoggingIn) {
        this.isLoggingIn = true;
        try {
          const res: any = await this.api.httpCall(
            this.api.apiLists.login,
            {},
            {
              username: this.username,
              password: this.password,
            },
            'post',
            true
          );
          if (res.token) {
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
            this.toaster.success('', 'Đăng nhập thành công!', {
              timeOut: 2000,
            });
            console.log(res);
          } else {
            this.toaster.error('', 'Sai Tài Khoản Hoặc Mật Khẩu!', {
              timeOut: 3000,
            });
          }
        } catch (error) {
          console.log(error);
        } finally {
          this.isLoggingIn = false;
        }
      }
    } else if (!this.username) {
      this.error.username = 'Tài khoản không được để trống';
    } else if (!this.password) {
      this.error.password = 'Mật Khẩu không được để trống';
    } else return false;
  }
}
