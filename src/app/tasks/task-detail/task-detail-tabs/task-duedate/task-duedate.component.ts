import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { ApiservicesService } from 'src/app/services/api.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-task-duedate',
  templateUrl: './task-duedate.component.html',
  styleUrls: ['./task-duedate.component.css']
})
export class TaskDuedateComponent implements OnInit {

  @Input() batdau: string
  @Input() hoanthanh: string
  @Input() mscv: string
  @Output() reloadData = new EventEmitter();
  @Input() EditEnable: boolean = false;
  isEdit: boolean = false
  dateEnd: string
  constructor(private api: ApiservicesService, private generalService: GeneralService) { }
  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges) {
    this.dateEnd = moment(this.hoanthanh).format("YYYY-MM-DD")
  }
  cancelEdit() {
    this.dateEnd = moment(this.hoanthanh).format("YYYY-MM-DD")
    this.isEdit = false
  }
  async delayTask() {
    var delay = {
      mscv: this.mscv,
      delay: this.dateEnd
    }
    var res = await this.api.httpCall(this.api.apiLists.DelayTask, {}, delay, 'post', true);
    var result = <any>res;
    result.validationMessages.forEach(x => {
      this.generalService.showErrorToast(result.isValid ? 1 : 0, x);
    });
    this.isEdit = false
    this.reloadData.emit();
  }
}
