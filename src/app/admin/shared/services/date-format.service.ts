import {Injectable} from '@angular/core';

@Injectable()
export class DateFormatService {
  transform(date: Date): string {
    if (!date) return '';

    const segments = date.toString().split(',');
    const day = segments.pop()?.padStart(2, '0');
    const month = segments.pop()?.padStart(2, '0');
    const year  = segments.pop();

    return `${year}-${month}-${day}`;
  }
}
