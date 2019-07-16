import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./home.component.css']
})

export class DishComponent {
  @Input()
  name: string;

  @Input()
  description: string;

  @Input()
  cost: number;

  @Input()
  rating: number;

  @Input()
  isrc: string;

  @Output()
  readReview = new EventEmitter<string>();

  @Output()
  writeReview = new EventEmitter<string>();

  read() {
    this.readReview.emit(this.name);
  }

  write() {
    this.writeReview.emit(this.name);
  }

}
