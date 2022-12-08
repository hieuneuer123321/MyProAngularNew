import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiservicesService } from 'src/app/services/api.service';
import { GeneralService } from 'src/app/services/general.service';
@Component({
  selector: 'app-task-sample-detail',
  templateUrl: './task-sample-detail.component.html',
  styleUrls: ['./task-sample-detail.component.css']
})
export class TaskSampleDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private api: ApiservicesService, private generalService: GeneralService) { }
  taskSampleId: string = ""
  taskSampleDetail: any
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.taskSampleId = params['taskSampleId']
      this.getTaskSampleDetail();
    });
  }
  async getTaskSampleDetail() {
    var res = await this.api.httpCall(this.api.apiLists.TasksSampleDetail + `?mscv=${this.taskSampleId}`, {}, {}, 'get', true);
    console.log(res)
  }
}
