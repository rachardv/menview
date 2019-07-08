import { Component, Input, Output, EventEmitter} from '@angular/core';
import { menus } from './sampleData'

@Component({
  selector: 'restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./home.component.css']
})

export class RestaurantComponent {

  constructor() { }

  @Input()
  id: number; // unique key from DB for this restaurant
  
  @Input()
  name: string;

  @Input()
  location: string;

  @Input()
  rating: number;

  @Input()
  dishcount: number;
  
  @Output() messageEvent = new EventEmitter<string>();

  //This is where the second API call would be based on restaurant clicked

  getMenu(){
    this.messageEvent.emit(this.name)
  }
}
