import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: any, args: string): any {
    return value.filter((x: any) => x.value.status
      .startsWith(args))
  }
}
