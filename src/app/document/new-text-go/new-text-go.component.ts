import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-text-go',
  templateUrl: './new-text-go.component.html',
  styleUrls: ['./new-text-go.component.css']
})
export class NewTextGoComponent implements OnInit {
fileToUpload
newTextgotData
  constructor() { }

  ngOnInit(): void {
  }
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
