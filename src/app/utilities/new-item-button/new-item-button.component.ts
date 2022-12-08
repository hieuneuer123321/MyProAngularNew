import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-item-button',
  templateUrl: './new-item-button.component.html',
  styleUrls: ['./new-item-button.component.css']
})
export class NewItemButtonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @Input() btn_title: string
  @Input() link: string
}
