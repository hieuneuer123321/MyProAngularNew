import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-task-targets',
  templateUrl: './task-targets.component.html',
  styleUrls: ['./task-targets.component.css', '../../task-detail.component.css']
})
export class TaskTargetsComponent implements OnInit {
  public constructor(private dragulaService: DragulaService) {
    dragulaService.createGroup("HANDLES", {
      moves: (el, container, handle) => {
        return handle.className === 'handle uil-apps';
      }
    });
  }
  kanbanData = [
    {
      status: 'Chờ thực hiện',
      status_color: 'warning',
      targets: [
        {
          target_title: 'User Module Testing',
          target_description: 'First, a disclaimer takes a couple hours',
          users: ['Nguyen Hoai Thuong', 'Thuong Hoai Nguyen']
        },
        {
          target_title: 'User Module Testing',
          target_description: 'First, a disclaimer takes a couple hours',
          users: ['Thuong Hoai Nguyen', 'Thuong Hoai Nguyen', 'Thuong Hoai Nguyen', 'Thuong Hoai Nguyen']
        }
      ]
    },
    {
      status: 'Đang thực hiện',
      status_color: 'primary',
      targets: [
        {
          target_title: 'User Module Testing',
          target_description: 'First, a disclaimer takes a couple hours',
          users: ['Nguyen Hoai Thuong', 'Thuong Hoai Nguyen']
        },
        {
          target_title: 'User Module Testing',
          target_description: 'First, a disclaimer takes a couple hours',
          users: ['Nguyen Hoai Thuong', 'Thuong Hoai Nguyen', 'Thuong Hoai Nguyen', 'Thuong Hoai Nguyen', 'Thuong Hoai Nguyen']
        }
      ]
    },
    {
      status: 'Đã thực hiện',
      status_color: 'success',
      targets: [
        {
          target_title: 'User Module Testing',
          target_description: 'First, a disclaimer takes a couple hours',
          users: ['Nguyen Hoai Thuong', 'Thuong Hoai Nguyen']
        },
        {
          target_title: 'User Module Testing',
          target_description: 'First, a disclaimer takes a couple hours',
          users: ['Thuong Hoai Nguyen']
        }
      ]
    }
  ]
  ngOnDestroy() {
    this.dragulaService.destroy("HANDLES")
  }
  ngOnInit(): void {
  }
  abc() {
    console.log(this.kanbanData)
  }
}
