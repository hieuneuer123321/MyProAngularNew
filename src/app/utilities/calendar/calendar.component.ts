import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  @Input() eventList: Array<any> = [];
  @Output() getEvents = new EventEmitter<any>();
  dateActive = moment();
  today = moment().format('YYYY-MM-DD');
  selected_date = this.dateActive.format('YYYY-MM-DD');
  constructor() {}
  yearList = [];
  daysInMonth = [];
  ngOnInit(): void {
    this.getYears();
    this.getAllDateOfMonth();
  }
  selectedDay(date) {
    this.selected_date = date.fulldate;
    this.getEvents.emit(date);
  }

  getEvent(fulldate) {
    let i = [];
    this.eventList.forEach((x) => {
      if (x.fulldate == fulldate) {
        x.items.forEach((a) => {
          i.push(a);
        });
      }
    });
    return i;
  }
  getAllDateOfMonth() {
    this.daysInMonth = [];
    var date = moment(this.dateActive).date(1);
    for (let i = date.day(); i > 0; i--) {
      let item = {
        fulldate: null,
        items: [],
      };
      this.daysInMonth.push(item);
    }
    for (let i = 0; i < this.dateActive.daysInMonth(); i++) {
      let item = {
        fulldate: date.format('YYYY-MM-DD'),
        items: this.getEvent(date.format('YYYY-MM-DD')),
      };
      this.daysInMonth.push(item);
      if (date.format('YYYY-MM-DD') === this.dateActive.format('YYYY-MM-DD')) {
        this.selectedDay(item);
      }
      date.add(1, 'day');
    }
    for (let i = date.endOf('month').day(); i < 6; i++) {
      let item = {
        fulldate: null,
        items: [],
      };
      this.daysInMonth.push(item);
    }
  }
  getYears() {
    for (let i = 1970; i <= 2077; i++) {
      this.yearList.push(i);
    }
  }
  getMYSelected() {
    let wrap = document.querySelectorAll('.m-y-select-wrap');
    let a = document.querySelectorAll('.m-y-select-active');
    wrap.forEach((x, i) => {
      x.scrollTop = (a[i] as HTMLElement).offsetTop;
    });
    //document.querySelectorAll(".m-y-select-active").forEach(x => x.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'center' }))
  }
  nextPrevDate(dateType, type) {
    if (type === 'next') {
      this.dateActive.add(1, dateType);
    }
    if (type === 'prev') {
      this.dateActive.subtract(1, dateType);
    }
    this.getAllDateOfMonth();
  }
  changeDate(month, year) {
    this.dateActive.month(month).year(year);
    this.getAllDateOfMonth();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.eventList = changes.eventList.currentValue;
    this.getAllDateOfMonth();
    // if (changes.inputColor && !changes.inputColor.firstChange) {
    //   this.elementRef.nativeElement.style.backgroundColor =
    //     changes.inputColor.currentValue;
    // }
    // if (changes.inputWidth && !changes.inputWidth.firstChange) {
    //   this.elementRef.nativeElement.style.width =
    //     changes.inputWidth.currentValue;
    // }
    // if (changes.inputHeight && !changes.inputHeight.firstChange) {
    //   this.elementRef.nativeElement.style.height =
    //     changes.inputHeight.currentValue;
    // }
    // if (!changes.inputNumber.firstChange) {
    //   this.elementRef.nativeElement.style.backgroundColor =
    //     changes.inputNumber.currentValue;
    // }
  }
}
