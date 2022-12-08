import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-import-report',
  templateUrl: './import-report.component.html',
  styleUrls: ['./import-report.component.css']
})
export class ImportReportComponent implements OnInit {
  
  htmlContent = '';
 
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: false,
    height: '150px',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Nhập nội dung...',
  };
  constructor() { }
  fileToUpload
  importReportData
  ngOnInit(): void {
  }
//// Chuyển đổi người thực hiện
handleFileInput(files: FileList) {
  this.fileToUpload = Array.from(files);
  console.log(this.fileToUpload)
}
removeFileFromUploadList(index) {
  this.fileToUpload.splice(index, 1);
  const dt = new DataTransfer()
  const input = document.getElementById('fileList') as HTMLInputElement
  const { files } = input

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    if (index !== i)
      dt.items.add(file) // here you exclude the file. thus removing it.
  }

  input.files = dt.files
}
}
