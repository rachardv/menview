import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'review',
  templateUrl: './review.component.html',
  styleUrls: ['./home.component.css']
})

export class ReviewComponent {

  constructor() { }

  @Input()
  review_id: number; // unique key from DB for this review
  
  @Input()
  rating: number;

  @Input()
  username: string;

  @Input()
  dish_id: number;

  @Input()
  review: string;
  

}
