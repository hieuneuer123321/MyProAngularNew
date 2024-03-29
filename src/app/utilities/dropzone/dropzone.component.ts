import { Component, Input, OnInit } from '@angular/core';
import Dropzone from '../../../assets/js/vendor/dropzone.min.js'
@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.css']
})
export class DropzoneComponent implements OnInit {
  @Input() Folder: string
  @Input() IdContent: string
  @Input() BaseURL: string
  constructor() { }
  myDropzone
  ngOnInit(): void {
    this.myDropzone = new Dropzone(document.body, {
      url: '#',
      //paramName: `${this.BaseURL}/api/File/Upload?subDirectory=${this.Folder}%2FLichTuan%2F${this.IdContent}`,
      paramName: `https://localhost:5001/api/File/Upload?subDirectory=FilesUpload%2FLichTuan%2FOO1234`,
      /*addRemoveLinks: true,*/
      uploadMultiple: true,
      previewsContainer: '#file-previews',
      autoProcessQueue: false,
      previewTemplate: document.querySelector('#uploadPreviewTemplate').innerHTML,
      init: function () {
        this.on("addedfile", (file) => {
          let type = file.type
          let url = '../../../assets/images/oo_logo_sm.png'
          if (type === 'application/msword' || type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            url = "../../../assets/images/icon/word_icon.png"
          }
          else if (type === 'application/pdf') {
            url = "../../../assets/images/icon/pdf_icon.png"
          }
          else if (type === 'image/jpeg' || type === 'image/png') {

          }
          else if (type === 'application/vnd.ms-excel' || type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            url = "../../../assets/images/icon/excel_icon.png"
          }
          this.emit("thumbnail", file, url);
        });
      }
    });
  }
}
