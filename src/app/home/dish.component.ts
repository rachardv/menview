import { Component, Input } from '@angular/core';

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
}
