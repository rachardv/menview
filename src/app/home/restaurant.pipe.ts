import { Pipe, PipeTransform } from '@angular/core';

// read more at: https://angular.io/guide/pipes

@Pipe({name: 'restaurantFilter'})
export class RestaurantPipe implements PipeTransform {
  transform(items: any[], keyword: string): any[] {

    if (!items) { // handle case of no items
      return [];
    }
    if (!keyword) { // handle case of no keyword provided by user
      return items;
    }

    keyword = keyword.toUpperCase(); // sanitize input for case

    return items.filter( item => {
      // console.log(item); // debug
      return item.name.toUpperCase().includes(keyword); // sanitize items for case
    });

  }
}