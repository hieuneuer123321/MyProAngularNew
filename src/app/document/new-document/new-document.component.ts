import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-new-document',
  templateUrl: './new-document.component.html',
  styleUrls: ['./new-document.component.css']
})
export class NewDocumentComponent implements OnInit {
fileToUpload
newDocumentData

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
