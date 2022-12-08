import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-gantt-chart',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.css']
})
export class GanttChartComponent implements OnInit {
  data = [{
    startAt: '2022-10-11',
    endAt: '2022-10-23',
    taskTitle: 'Task 1',
  },
  {
    startAt: '2022-10-09',
    endAt: '2022-12-10',
    taskTitle: 'Task 2',
  },
  {
    startAt: '2022-10-12',
    endAt: '2022-10-22',
    taskTitle: 'Task 3',
  },
  {
    startAt: '2022-11-03',
    endAt: '2022-11-20',
    taskTitle: 'Task 3',
  },
  {
    startAt: '2022-11-23',
    endAt: '2022-12-02',
    taskTitle: 'Task 3',
  }]
  isMonthMode = false
  ganttRowGap: number = 50
  ganttData = []
  totalDay = 0
  minDate
  maxDate
  minDateOfTask
  //dragging
  isLeftDrag = false
  leftDragPos = 0
  isRightDrag = false
  rightDragPos = 0
  itemDraging
  //moving
  isMoving = false
  itemMovingPos
  constructor() { }

  ngOnInit(): void {
    this.getDays(this.data)
    this.addEvent()
  }
  move(event: MouseEvent, item): void {
    this.itemMovingPos = event.clientX
    this.itemDraging = item
    this.isMoving = true
  }
  changeViewMode(monthmode: boolean, size: number): void {
    this.isMonthMode = monthmode;
    this.ganttRowGap = size;
    this.getDays(this.data)
    this.addEvent()
  }
  onDrag(event: MouseEvent): void {
    let rightPos = this.rightDragPos - event.clientX
    let leftPos = this.leftDragPos - event.clientX
    let minDiff = this.itemDraging ? moment(this.itemDraging.startAt).diff(this.minDate, 'days') : 0;
    let maxDiff = this.itemDraging ? moment(this.maxDate).diff(this.itemDraging.endAt, 'days') : 0;
    let gap = this.ganttRowGap
    //left drag
    if (this.isLeftDrag) {
      this.changeMouseCursor("ew-resize")
      if (leftPos > gap && minDiff > 0) {
        this.leftDragPos = this.leftDragPos - gap
        this.itemDraging.startAt = moment(this.itemDraging.startAt).subtract(1, 'days').format("YYYY-MM-DD")
      }
      if (leftPos < -gap) {
        this.leftDragPos = this.leftDragPos + gap
        this.itemDraging.startAt = moment(this.itemDraging.startAt).add(1, 'days').format("YYYY-MM-DD")
      }
    }
    //right drag
    else if (this.isRightDrag) {
      this.changeMouseCursor("ew-resize")
      if (rightPos > gap) {
        this.rightDragPos = this.rightDragPos - gap
        this.itemDraging.endAt = moment(this.itemDraging.endAt).subtract(1, 'days').format("YYYY-MM-DD")
      }
      if (rightPos < -gap && maxDiff > 0) {
        this.rightDragPos = this.rightDragPos + gap
        this.itemDraging.endAt = moment(this.itemDraging.endAt).add(1, 'days').format("YYYY-MM-DD")
      }
    }
    //both drag
    else if (this.isMoving) {
      let cursorPos = this.itemMovingPos - event.x
      if (cursorPos > gap && minDiff > 0) {
        this.itemDraging.endAt = moment(this.itemDraging.endAt).subtract(1, 'days').format("YYYY-MM-DD")
        this.itemDraging.startAt = moment(this.itemDraging.startAt).subtract(1, 'days').format("YYYY-MM-DD")
        this.itemMovingPos = this.itemMovingPos - gap
      }
      if (cursorPos < -gap && maxDiff > 0) {
        this.itemDraging.endAt = moment(this.itemDraging.endAt).add(1, 'days').format("YYYY-MM-DD")
        this.itemDraging.startAt = moment(this.itemDraging.startAt).add(1, 'days').format("YYYY-MM-DD")
        this.itemMovingPos = this.itemMovingPos + gap
      }
    }
    event.preventDefault()
  }
  changeMouseCursor(cursor) {
    let gantt = document.querySelector(".gantt");
    (gantt as HTMLElement).style.cursor = cursor;
  }
  leftDrag(event: Event, item): void {
    this.isLeftDrag = true;
    this.leftDragPos = (event.target as HTMLElement).getBoundingClientRect().left
    this.itemDraging = item
  }
  rightDrag(event: Event, item): void {
    this.isRightDrag = true
    this.rightDragPos = (event.target as HTMLElement).getBoundingClientRect().left
    this.itemDraging = item
  }
  endDrag(): void {
    this.isLeftDrag = false
    this.isRightDrag = false
    this.isMoving = false
    //if (moment(this.maxDate).diff(this.itemDraging.endAt) === 0 || moment(this.minDate).diff(this.itemDraging.startAt) === 0) {
    this.getDays(this.data)
    this.changeMouseCursor("auto")
  }
  getDays(data): void {
    this.ganttData = []
    this.totalDay = 0
    let startAt = data.map(a => moment(a.startAt))
    let endAt = data.map(a => moment(a.endAt))
    this.minDateOfTask = moment.min(startAt).format('YYYY-MM-DD')
    let minDate = moment.min(startAt)
    let maxDate = moment.max(endAt)
    minDate.subtract(1, 'days')
    maxDate.add(1, 'days')
    if (this.isMonthMode) {
      minDate.startOf('year')
      maxDate.endOf('year')
      minDate.subtract(1, 'months')
      maxDate.add(1, 'months')
    }
    this.minDate = moment(minDate).format("YYYY-MM-DD")
    this.maxDate = moment(maxDate).format("YYYY-MM-DD")
    let monthDiff = maxDate.month() - minDate.month() + 12 * (maxDate.year() - minDate.year())//don't ask me
    for (let i = 0; i <= monthDiff; i++) {
      let month = minDate.month()
      let obj = {
        month: moment(minDate).format("YYYY-MMM"),
        list: []
      }
      while (minDate.month() === month) {
        if (maxDate.diff(minDate, 'days') > 0) {
          obj.list.push(moment(minDate).format('YYYY-MM-DD'))
        }
        minDate.add(1, 'days')
      }
      this.ganttData.push(obj)
      this.totalDay = this.totalDay + this.ganttData[i].list.length
    }
  }
  scrollToCurrentTask() {
    let bar = document.querySelector(".bar-node")
    let gantt = document.querySelector(".gantt")
    gantt.scrollLeft = (bar as HTMLElement).offsetLeft / 2
  }
  addEvent() {
    document.querySelector('a[data-bs-toggle="tab"][href="#targets"]')?.addEventListener('shown.bs.tab', function () {
      let bar = document.querySelector(".bar-node")
      let gantt = document.querySelector(".gantt")
      gantt.scrollLeft = (bar as HTMLElement).offsetLeft / 2
    })
  }
  getDiff(min, max): number {
    let minDate = new Date(min)
    let maxDate = new Date(max)
    let Difference_In_Time = maxDate.getTime() - minDate.getTime();
    return Difference_In_Time / (1000 * 3600 * 24);
  }
}
