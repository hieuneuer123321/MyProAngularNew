import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FilesResponse } from 'src/app/Model/FilesModel';
import { ApiservicesService } from 'src/app/services/api.service';
import { GeneralService } from 'src/app/services/general.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {

  @Input() Folder: string
  @Input() IdContent: string
  Files: Array<FilesResponse> = []
  FileDetail: string = ""
  UnreadableFileDetail: string = ""
  readableData = ["application/pdf", "image/png", "image/jpeg", "application/vnd.ms-excel", "application/msword"]
  BaseURL = this.generalService.appConfig.API_BASE_URL + this.api.apiLists.File
  constructor(private api: ApiservicesService, public generalService: GeneralService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChange): void {
    this.GetFiles();
  }
  GetFileDetail(filename) {
    this.FileDetail = `${this.Folder}/${this.IdContent}/${filename}`
  }
  async GetFiles() {
    if (this.Folder && this.IdContent) {
      var res = await this.api.httpCall(this.api.apiLists.File + `${this.Folder}/${this.IdContent}`, {}, {}, 'get', true);
      var result = <any>res
      this.Files = result
    }
  }
  readable(name) {
    var checking = false;
    this.readableData.forEach(x => {
      if (x == name) {
        checking = true;
      }
    });
    return checking;
  }
  download(filename) {
    return this.BaseURL + `Download/${this.Folder}/${this.IdContent}/${filename}`
  }
  //FILE SIZE CONVERT
  humanFileSize(bytes, si = false, dp = 1) {
    const thresh = si ? 1000 : 1024;

    if (Math.abs(bytes) < thresh) {
      return bytes + ' B';
    }

    const units = si
      ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    const r = 10 ** dp;

    do {
      bytes /= thresh;
      ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

    return bytes.toFixed(dp) + ' ' + units[u];
  }
}
