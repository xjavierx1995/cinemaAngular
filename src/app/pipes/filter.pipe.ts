import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(array: any[], text: string, column: string): unknown {
    if (text === '') {
      return array
    }
    return array.filter(option => option[column].toLowerCase().includes(text.toLowerCase()));
  }

}
