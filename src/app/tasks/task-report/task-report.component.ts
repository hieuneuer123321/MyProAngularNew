import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-task-report',
  templateUrl: './task-report.component.html',
  styleUrls: ['./task-report.component.css'],
})
export class TaskReportComponent implements OnInit {
  fakeAPI = 'https://62e7546c69bd03090f7b852b.mockapi.io/task_report';
  taskStatusSelect = ["Tất cả", "Còn hạn", "Gần hạn", "Quá hạn", "Đề xuất kết thúc", "Kết thúc đúng hạn"]
  taskReportData: {}
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getData();
  }
  async getData() {
    this.httpClient.get(this.fakeAPI).subscribe(x => {
      this.taskReportData = x;
      console.log(this.taskReportData)
    })
  }
}
