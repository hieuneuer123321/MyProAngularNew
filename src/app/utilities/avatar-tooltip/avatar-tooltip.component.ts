import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar-tooltip',
  templateUrl: './avatar-tooltip.component.html',
  styleUrls: ['./avatar-tooltip.component.css']
})
export class AvatarTooltipComponent implements OnInit {

  @Input() fullname: string;
  @Input() size: string;
  constructor() { }

  ngOnInit(): void {
  }
  GetName(name) {
    var arrName = name.split(' ')
    var count = arrName.length-1
    var lastname = arrName[count]
    return lastname.slice(0,1)
  }
}
