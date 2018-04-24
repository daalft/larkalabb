import {Injectable} from '@angular/core';

@Injectable()
export class DatetimeService {

  static currentTime() {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();
    return hour + ':' + minute + ':' + second;
  }

  static currentTimestamp () {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const time = DatetimeService.currentTime();
    return day + '.' + month + '.' + year + ' ' + time;
  }
}
