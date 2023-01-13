import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar-tooltip',
  templateUrl: './avatar-tooltip.component.html',
  styleUrls: ['./avatar-tooltip.component.css']
})
export class AvatarTooltipComponent implements OnInit {

  @Input() fullname: string = "";
  @Input() size: string;
  constructor() { }

  ngOnInit(): void {
  }
  GetName(name) {
    var arrName = name.split(' ')
    var lastname = arrName[arrName.length - 1]
    if (arrName.length == 1) {
      return lastname.slice(0, 2)
    }
    var firstName = arrName[arrName.length - 2];
    return firstName.slice(0, 1) + lastname.slice(0, 1)
  }
}
