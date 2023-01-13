import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-the-group-user',
  templateUrl: './the-group-user.component.html',
  styleUrls: ['./the-group-user.component.css']
})


export class TheGroupUserComponent implements OnInit {

  groupNew = [
    { 
      'STT':'1',
      'groupId': 'GP001',
      'groupName': 'Ban Giám Đốc',
      'acronym':'BGĐ'
    },
    {
      'STT':'2',
      'groupId': 'GP002',
      'groupName': 'Phòng Tài chính Kế Toán',
      'acronym':'PTCKT'
    },
    {
      'STT':'3',
      'groupId': 'GP003',
      'groupName': 'Phòng Tổ Chức Hành Chính',
      'acronym':'PTCHC'
    },
    {
      'STT':'4',
      'groupId': 'GP005',
      'groupName': 'Phòng Kỹ Thuật',
      'acronym':'PKT'
    },
    {
      'STT':'5',
      'groupId': 'GP026',
      'groupName': ' Phòng Kinh Doanh ',
      'acronym':'PKD'
    },
    {
      'STT':'6',
      'groupId': 'GP032',
      'groupName': 'Phòng Thoát Nước Mưa',
      'acronym':'PTNM'
    },
    {
      'STT':'7',
      'groupId': 'GP033',
      'groupName': 'Phòng Kế Hoạch Tài Vụ',
      'acronym':'PKHTV'
    },
    {
      'STT':'8',
      'groupId': 'GP035',
      'groupName': 'Phòng Hành Chính Quản Trị',
      'acronym':'PHCQT'
    },
    {
      'STT':'9',
      'groupId': 'GP036',
      'groupName': 'Phòng Thủy Nông',
      'acronym':'PTN'
    },
  
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
