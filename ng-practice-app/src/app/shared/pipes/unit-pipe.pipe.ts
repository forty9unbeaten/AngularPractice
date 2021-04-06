import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unitPipe'
})
export class UnitPipe implements PipeTransform {

  transform(value: string, quantity: number): string {
    if (quantity > 1) {
      return `${value}s`
    }
    return value
  }

}
