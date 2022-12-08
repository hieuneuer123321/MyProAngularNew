import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  constructor(private generalService: GeneralService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot) {
    // console.log(route.data)
    if (!this.generalService.isLogin) {
      alert('Bạn cần đăng nhập trước!')
      this.router.navigate(['login']);
      return false;
    }
    else {
      if (Object.keys(route.data).length === 0)
        return true
      else {
        // console.log(route.data.link)
        if (this.generalService.checkIfUserHasRightToThisRoute(route.data.link))
          return true
        else {
          alert('Bạn không có quyền truy cập đường dẫn này!')
          this.router.navigate(['/']);
          return false
        }
      }
    }
  }
}
