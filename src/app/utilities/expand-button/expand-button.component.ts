import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-expand-button',
  templateUrl: './expand-button.component.html',
  styleUrls: ['./expand-button.component.css']
})
export class ExpandButtonComponent implements OnInit {

  constructor() { }
  isExpand = true
  ngOnInit(): void {
  }
  expandHandle() {
    this.isExpand = !this.isExpand
  }
  @Input() id_expand: string
}
