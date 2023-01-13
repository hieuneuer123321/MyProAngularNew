import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { UserResponseModel } from 'src/app/Model/UserModels';

@Component({
  selector: 'app-task-users',
  templateUrl: './task-users.component.html',
  styleUrls: ['./task-users.component.css', '../../task-detail.component.css']
})
export class TaskUsersComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  @Input() dsThamGia: Array<UserResponseModel> = []
  @Input() nguoiTao: UserResponseModel = new UserResponseModel()
  @Input() nguoiXuLy: UserResponseModel = new UserResponseModel()
  @Input() dsDuocXem: Array<UserResponseModel> = []
  @Input() ratingEnable: boolean = false
  @Input() tinhTrang: number = 0
  ngOnInit(): void {
  }
  timeToCalendar(time: string) {
    var numb = moment(moment()).diff(time, 'hours')
    if (numb > 2) {
      return moment(time).format("DD/MM/YYYY H:mm");
    }
    return moment(time).fromNow();
  }
}
