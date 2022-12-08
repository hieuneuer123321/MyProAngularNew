import { Component, OnInit, Input } from '@angular/core';
import { UserResponseModel } from 'src/app/Model/UserModels';

@Component({
  selector: 'app-task-users',
  templateUrl: './task-users.component.html',
  styleUrls: ['./task-users.component.css', '../../task-detail.component.css']
})
export class TaskUsersComponent implements OnInit {

  constructor() { }
  @Input() dsThamGia:Array<UserResponseModel>
  @Input() dsDangXuLy:Array<UserResponseModel>
  @Input() dsDaXuLy:Array<UserResponseModel>
  @Input() dsChuaXuLy:Array<UserResponseModel>
  @Input() dsDuocXem:Array<UserResponseModel>
  ngOnInit(): void {
  }

}
