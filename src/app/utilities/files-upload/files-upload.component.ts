import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { ApiservicesService } from 'src/app/services/api.service';
import { GeneralService } from 'src/app/services/general.service';
import Dropzone from '../../../assets/js/vendor/dropzone.min.js'
@Component({
  selector: 'app-files-upload',
  templateUrl: './files-upload.component.html',
  styleUrls: ['./files-upload.component.css']
})
export class FilesUploadComponent implements OnInit {
  constructor(private generalService: GeneralService, private api: ApiservicesService) { }
  myDropzone

  pushFile(Folder, IdContent) {
    this.api.uploadFile(this.myDropzone.files, Folder, IdContent);
  }

  ngOnInit(): void {
    this.myDropzone = new Dropzone(document.body, {
      url: `#`,
      //url: `https://localhost:5001/api/File/Upload?subDirectory=FilesUpload%2FLichTuan%2FOO1234`,
      paramName: "file",
      /*addRemoveLinks: true,*/
      uploadMultiple: false,
      previewsContainer: '#file-previews',
      autoProcessQueue: false,
      maxFiles: 5,
      previewTemplate: document.querySelector('#uploadPreviewTemplate').innerHTML
    });
    this.myDropzone.on("addedfile", (file) => {
      let filetype = file.type
      let url = '../../../assets/images/oo_logo_sm.png'
      if (filetype === 'application/msword' || filetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        url = "../../../assets/images/icon/word_icon.png"
      }
      else if (filetype === 'application/pdf') {
        url = "../../../assets/images/icon/pdf_icon.png"
      }
      else if (filetype === 'image/jpeg' || filetype === 'image/png') {

      }
      else if (filetype === 'application/vnd.ms-excel' || filetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        url = "../../../assets/images/icon/excel_icon.png"
      }
      this.myDropzone.emit("thumbnail", file, url);
    });
  }
}
