import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args: string): any {
    return value.filter((x: any) => {
      if (args == 'debit') {
        if (x.value.debit) return x;
      }
      if (args == 'credit') {
        if (x.value.credit) return x;
      }
    }

    )
  }
}
