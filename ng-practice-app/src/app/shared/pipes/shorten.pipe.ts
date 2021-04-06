import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

  transform(value: string): string {
    if (value.length <= 39) {
      return value;
    }
    return `${value.slice(0, 35)}...`
  }

}
