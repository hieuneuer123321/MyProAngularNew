import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-expand-card',
  templateUrl: './expand-card.component.html',
  styleUrls: ['./expand-card.component.css']
})
export class ExpandCardComponent implements OnInit {

  constructor() { }
  @Input() title: string = ''
  @Input() cardname: string = 'ExpandCard'
  showing: boolean = true
  ngOnInit(): void {
  }
}
