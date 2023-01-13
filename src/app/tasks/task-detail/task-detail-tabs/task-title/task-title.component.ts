import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ApiservicesService } from 'src/app/services/api.service';
import { GeneralService } from 'src/app/services/general.service';
@Component({
  selector: 'app-task-title',
  templateUrl: './task-title.component.html',
  styleUrls: ['./task-title.component.css']
})
export class TaskTitleComponent implements OnInit {

  @Input() chude: string;
  @Input() mscv: string;
  @Input() EditEnable: boolean = false;
  @Output() reloadData = new EventEmitter();
  isEdit: boolean = false;
  title: string
  constructor(private generalService: GeneralService, private api: ApiservicesService) { }

  ngOnInit(): void {
    this.title = `${this.chude}`
  }
  ngOnChanges(changes: SimpleChanges) {
    this.title = `${this.chude}`
  }
  cancelEdit() {
    this.title = `${this.chude}`
    this.isEdit = false
  }
  async updateTitle() {
    this.chude = `${this.title}`
    var res = await this.api.httpCall(this.api.apiLists.UpdateTaskTitle + `?mscv=${this.mscv}&newtitle=${this.chude}`, {}, {}, 'post', true);
    var result = <any>res
    result.validationMessages.forEach(x => {
      this.generalService.showErrorToast(result.isValid ? 1 : 0, x);
    });
    this.reloadData.emit();
    this.isEdit = false
  }
}
