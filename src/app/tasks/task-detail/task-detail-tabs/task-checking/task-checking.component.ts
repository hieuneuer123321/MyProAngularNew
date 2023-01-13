import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { GeneralService } from 'src/app/services/general.service';
import { ApiservicesService } from 'src/app/services/api.service';
@Component({
  selector: 'app-task-checking',
  templateUrl: './task-checking.component.html',
  styleUrls: ['./task-checking.component.css']
})
export class TaskCheckingComponent implements OnInit {

  constructor(private generalService: GeneralService, private api: ApiservicesService) { }
  @Input() mscv: string = ""
  @Input() checkType: string = "CHECKED"
  @Output() reloadData = new EventEmitter();
  @Output() showMessage = new EventEmitter();
  noiDung: string = ""
  ngOnInit(): void {
  }
  editorConfig: AngularEditorConfig = {
    height: '150px',
    editable: true,
  }
  async requestFinishTask() {
    var res = await this.api.httpCall(this.api.apiLists.RequestFinishATask, {}, { mscv: this.mscv, noidung: this.noiDung }, 'post', true)
    this.showMessage.emit(res);
    this.reloadData.emit();
    this.noiDung = ""
  }
  async checked() {
    var res = this.api.httpCall(this.api.apiLists.TaskChecked, {}, { mscv: this.mscv, noidung: this.noiDung }, 'post', true);
    this.showMessage.emit(res);
    this.reloadData.emit();
    this.noiDung = ""
  }

}
