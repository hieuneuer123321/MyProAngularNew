import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-image',
  templateUrl: './new-image.component.html',
  styleUrls: ['./new-image.component.css']
})
export class NewImageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  uploadFile() {
    document.getElementById("files_upload").click();
  }
}
