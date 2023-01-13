import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToolService {
  constructor() {}
  convertDateDDMMYYYY(date: string) {
    const pipe = new DatePipe('en-US');
    const now = new Date(date);
    const myFormattedDate = pipe.transform(now, 'dd/MM/yyyy  HH:mm');
    return myFormattedDate;
  }
}
