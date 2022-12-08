import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-documents',
  templateUrl: './sign-documents.component.html',
  styleUrls: ['./sign-documents.component.css']
})
export class SignDocumentsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
