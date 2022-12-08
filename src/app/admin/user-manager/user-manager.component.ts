import { Component, Input, OnInit,SimpleChanges } from '@angular/core';
import { ApiservicesService } from 'src/app/services/api.service';
import { GeneralService } from 'src/app/services/general.service';
import { async } from 'rxjs';
import { trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { stringify } from 'querystring';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent implements OnInit {
  
  xoaUser // xóa user
  userDataName // so sánh quyền
  themMoi// Thêm mới người dùng
  managerData // Quyền người dùng
  theGroupsName // nhóm theo userId
  capNhatUser// Cập nhật user
  Mltiple// Gán nhiều quyền
  removeAllRight // Xóa tất cả các quyền khỏi người dùng
  assignMultiGroup // gán nhiều nhóm cho người dùng
  xoaNhom // Xóa nhiều nhóm

  @Input ()quyencuaUser: any ; 
  
  groupNew = [
    {
      'groupId': 'GP001',
      'groupName': 'Ban Giám Đốc'
    },
    {
      'groupId': 'GP002',
      'groupName': 'Phòng Tài chính Kế Toán'
    },
    {
      'groupId': 'GP003',
      'groupName': 'Phòng Tổ Chức Hành Chính'
    },
    {
      'groupId': 'GP005',
      'groupName': 'Phòng Kỹ Thuật'
    },
    {
      'groupId': 'GP026',
      'groupName': ' Phòng Kinh Doanh '
    },
    {
      'groupId': 'GP032',
      'groupName': 'Phòng Thoát Nước Mưa'
    },
    {
      'groupId': 'GP033',
      'groupName': 'Phòng Kế Hoạch Tài Vụ'
    },
    {
      'groupId': 'GP035',
      'groupName': 'Phòng Hành Chính Quản Trị'
    },
    {
      'groupId': 'GP036',
      'groupName': 'Phòng Thủy Nông'
    },
  
  ]
  newUserName=  
  {
    "userName": "",
    "fullName": "",
    "password": "",
    "groupIdChinh": "",
    "title": "",
    "email": "",
    "phone": "",
    "isLeader": 0,
    "nguoiTao": "",
    "rights": [],
    "groups": []
  }
  update=
  {
    "userId": "",
    "fullName": "",
    "groupIdChinh": "",
    "title": "",
    "email": "",
    "phone": "",
    "active": 0,
    "nguoiTao": "U001",
    "isLeader": 0
  }
  quyenvanhom={
  "userId": "U0055",
  "rights": [
    {
      "rightId": "ADM02"
    }
  ],
  "groups": [
    {
      "groupId": "GP005"
    }
  ]
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  newmanager(event,rightId){
    var newcheck = event.target.checked
    if (newcheck === true) {this.newUserName.rights.push({"rightId":rightId})}
    else {this.newUserName.rights.forEach((x,i)=>{
      if (x.rightId===rightId){this.newUserName.rights.splice(i,1) }
    })}
    console.log(this.newUserName)
  }
  newgroup(event,groupId){
    var newcheck = event.target.checked
    if (newcheck === true) {this.newUserName.groups.push({"groupId":groupId})}
    else {this.newUserName.groups.forEach((x,i)=>{
      if (x.groupId==groupId){this.newUserName.groups.splice(i,1)}
    })}
    console.log(this.newUserName)
  }
  newgroupIdChinh(event){
    this.newUserName.groupIdChinh=event.target.value
  }
  @Input() user: any 
  constructor(private _http:HttpClient, private api: ApiservicesService, private generalService: GeneralService ) { }
  ngOnInit(): void {
    this.DataDulieu(); // Tất cả các quyền của user
  
  }
  // Nguồn so sánh 
  ngOnChanges(user,userId,rightId: SimpleChanges): void {
    this.individualData(this.user.userId);
    /*this.individualgroupUserId(this.user.userId)*/ // Lỗi API
  }
  
  // Thêm mới người dùng
  async addUserName(){
    try{
      let res
      let result
      res = await this.api.httpCall(this.api.apiLists.addNewUser,{},this.newUserName,'post', true);
      result = <any>res
      console.log(result)
      this.themMoi=Array.from(result)
    } catch{}
  } 
  //api tất cả các  quyền của user
  async DataDulieu() {
    try {
      let res
      let result
      res = await this.api.httpCall(this.api.apiLists.getAllRights, {}, {}, 'get', true);
      result = <any>res
      console.log(result)
      this.managerData = Array.from(result)
    } catch {}
  }

  //quyền của người dùng theo userId
  async individualData(userId : string){
    try{
      let res
      let result
      res= await this.api.httpCall(this.api.apiLists.getAllRightsByUserld + userId,{},{},'get', true);
      result= <any>res
      this.userDataName = Array.from(result)
      console.log(res)
    }catch{}
  }
  //so sanh quyền
  sosanhUser(phanquyen ){
    var sosanhquyen = false
    this.userDataName.forEach((x)=>{
      if (x.rightId===phanquyen) {
        sosanhquyen = true
      }
    })
    return sosanhquyen ;
  } 
// Xóa thông tin người dùng
async deleteUserName(userId :string){
  try{
    let res
    let result
    res = await this.api.httpCall(this.api.apiLists.deleteUser +'?'+'userId'+'='+userId,{},{},'post',true);
    result=<any>res
    this.xoaUser = Array.from(result)
    console.log(res)
  } catch{}
}

// Cập nhật thông tin người dùng 
async updateUserName(){
  try{
    let res
    let result
    // Sao e lại truyền this.update vào header? this.update này là nội dung update có phải ko, vậy thì phải truyền nó trong body.
    // dạ nó là nội dung update ạ
    // api này có yêu cầu truyền token thì chú truyền thêm vào.
    // Dạ vẫn báo lỗi ạ
    this.update.userId=this.user.userId
    this.update.fullName=this.user.fullName
    this.update.groupIdChinh=this.user.groupIdChinh
    this.update.title=this.user.title
    this.update.email=this.user.email
    this.update.phone=this.user.phone
    this.update.active=this.user.active
    this.update.nguoiTao=this.user.nguoiTao
    this.update.isLeader=this.user.isLeader
    res = await this.api.httpCall(this.api.apiLists.updateUserInfo,{},this.update, 'post',true);
    result=<any>res
    console.log(result)
    this.capNhatUser = Array.from(result)
  } catch{}
}


// Gán nhiều quyền được chỉ định cho user
async assignMultiple (){
  try{
    let res
    let result
    res = await this.api.httpCall( this.api.apiLists.assignMultiRightsToUser,{},this.quyenvanhom,'post',true);
    result =<any>res
    console.log(res)
    this.Mltiple = Array.from(result)
  }catch{}
}

// Xóa tất cả các quyền ra khỏi người dùng
async removeAllRightUser(){
  try {
    let res
    let result
    res = await this.api.httpCall(this.api.apiLists.removeAllRightFromUser,{},this.quyenvanhom,'post',true);
    result=<any>res
    console.log(res)
    this.removeAllRight=Array.from(result)
  } catch{}
}
// Gán nhiều nhóm / phòng ban cho người dùng
async assignMultiGroupsUser(){
  try{
    let res
    let result
    res = await this.api.httpCall(this.api.apiLists.assignMultiGroupsToUser,{},this.quyenvanhom,'post',true);
    result = <any>res
    console.log(res)
    this.assignMultiGroup=Array.from(result)
  }catch{}
}
// Xóa nhiều nhóm khỏi người dùng
async removeMultiGroupUser(){
  try{
    let res
    let result
    res = await this.api.httpCall(this.api.apiLists.removeMultiSelectedGroupsFromUser,{},this.quyenvanhom,'post',true);
    result = <any>res
    console.log(result)
    this.xoaNhom = Array.from(result)
  }catch{}
  
}
/* lỗi api
//nhóm người dùng theo UserId
async individualgroupUserId(userId : string){
  try{
    let res
    let result
    console.log(this.api.apiLists.getAllGroupsByUserld + userId)
    res = await this.api.httpCall(this.api.apiLists.getAllGroupsByUserld+'?'+'userId'+'='+ userId,{},{},'get',true);
    result=<any>res
    this.theGroupsName = Array.from(result)
    console.log(res)
  }catch{}
}
// so sánh nhóm userId
sosanhGroup(group){
  var sosanhnhom = false
  this.theGroupsName.forEach((x)=>{
    if (x.groupId===group) {
      sosanhnhom = true
    }
  })
  return sosanhnhom ;
}*/

}