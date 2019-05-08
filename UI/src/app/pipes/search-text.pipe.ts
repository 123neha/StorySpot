import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchText'
})
export class SearchTextPipe implements PipeTransform {

  transform(items: any[], searchString: string, keys: Array<string>): any {
    if (!items) { return []; }
    if (!searchString) {
      return items;
    }
    searchString = searchString ? searchString.toLowerCase() : searchString;
    return items.filter(it => {
      let found = false;
      if (keys.length > 0) {
        for (const idx in keys) {
          if (it[keys[idx]].toLowerCase().includes(searchString)) {
            found = true;
            break;
          }
        }
      } else {
        if (it.toLowerCase().includes(searchString)) {
          found = true;
        }
      }
      return found;
    });
  }

}
