import { ElementRef, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { url } from 'inspector';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  appConfig;
  isLogin = false;
  userData;
  currentUser;
  allUsers;
  allUsersWithGroups;
  allUserGroupsKey;
  currentLanguage = {
    Code: 'VN',
    Name: 'Tiếng Việt',
    URL: 'assets/images/flags/vietnam.png',
  };
  constructor(private router: Router, private toaster: ToastrService) {}
  setDefaultAvatar(e) {
    e.target.src = 'assets/imgs/defaultAvatar.png';
  }
  imageLinkSetup(imgName) {
    return this.appConfig.API_BASE_URL + '/' + imgName;
  }

  logout() {
    this.isLogin = false;
    this.removeTempData();
    this.removeStoragedata();
    this.router.navigate(['/home'], { queryParams: { clearHistory: true } });
  }

  checkIfUserHasRightToThisRoute(routeToCheck) {
    console.log(routeToCheck);
    return true;
  }
  removeStoragedata() {
    localStorage.removeItem('userData');
  }
  removeTempData() {
    this.userData = null;
    this.currentUser = null;
    this.allUsers = null;
  }
  showErrorToast(errorCode, message) {
    // 0 là error, 1 là success, 2 là warning
    if (errorCode == 0)
      this.toaster.error('', message, {
        timeOut: 3000,
      });
    else if (errorCode == 1)
      this.toaster.success('', message, {
        timeOut: 3000,
      });
    else if (errorCode == 2)
      this.toaster.warning('', message, {
        timeOut: 3000,
      });
  }
  emailValidator(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  cloneAnything(Obj) {
    let buf; // the cloned object
    if (Obj instanceof Array) {
      buf = []; // create an empty array
      var i = Obj.length;
      while (i--) {
        buf[i] = this.cloneAnything(Obj[i]); // recursively clone the elements
      }
      return buf;
    } else if (Obj instanceof Object) {
      buf = {}; // create an empty object
      for (const k in Obj) {
        if (Obj.hasOwnProperty(k)) {
          // filter out another array's index
          buf[k] = this.cloneAnything(Obj[k]); // recursively clone the value
        }
      }
      return buf;
    } else {
      return Obj;
    }
  }
  groupByKey(array, key) {
    return array.reduce((hash, obj) => {
      if (obj[key] === undefined) return hash;
      return Object.assign(hash, {
        [obj[key]]: (hash[obj[key]] || []).concat(obj),
      });
    }, {});
  }
}
