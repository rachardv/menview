import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'review',
  templateUrl: './review.component.html',
  styleUrls: ['./home.component.css']
})

export class ReviewComponent {

  rating_pretty: string = "";

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



  ngOnInit() {
    // prettify rating
    switch (this.rating) {
      case 1:
        this.rating_pretty = "&#9733;&#9734;&#9734;&#9734;&#9734;";
        break;
      case 2:
        this.rating_pretty = "&#9733;&#9733;&#9734;&#9734;&#9734;";
        break;
      case 3:
        this.rating_pretty = "&#9733;&#9733;&#9733;&#9734;&#9734;";
        break;
      case 4:
        this.rating_pretty = "&#9733;&#9733;&#9733;&#9733;&#9734;";
        break;
      case 5:
        this.rating_pretty = "&#9733;&#9733;&#9733;&#9733;&#9733;";
        break;
      default:
        // handles case 0 as well
        this.rating_pretty = "&#9734;&#9734;&#9734;&#9734;&#9734;";
        break;
    }



  }


}
