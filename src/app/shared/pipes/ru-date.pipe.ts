import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'ruDate'
})
export class RuDatePipe implements PipeTransform {
  transform(value: any): string {
    if (!value) {
      return '';
    }

    let date = value instanceof Date
      ? value
      : new Date(value);

    return date.toLocaleDateString('ru-RU', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  }
}
