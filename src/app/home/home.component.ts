import { Component, OnInit } from '@angular/core';

import { DishComponent } from './dish.component';
import { RestaurantComponent } from './restaurant.component';

import { RestaurantService } from '../_services'

import { restaurants, menus } from './sampleData'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [RestaurantService, DishComponent, RestaurantComponent]
})
export class HomeComponent implements OnInit {

  menuActive: boolean;
  message: string;
  menuItems: any;
  markers:any;

  /* maps vars */
  latitude = 49.279030;
  longitude = -122.912738;
  mapType = 'roadmap';

  selectedRestaurant:any;

  constructor(public api:RestaurantService) {
    this.menuActive = false;
  }

  getAllRestaurants() {
    console.log("home.component.ts running getRestaurants()")
    this.markers = [];
    this.api.getAllRestaurants().subscribe((data: {}) => {
      console.log(data);
      this.markers = data;
    });
  }


  getRestaurant(query:string) {
    console.log("home.component.ts running getRestaurants()")
    this.api.getRestaurant(query).subscribe((data: {}) => {
      console.log(data);
    });
  }

  receiveMessage($event) {
    this.message = $event;
    this.updateMenu($event);

    if (!this.menuActive) {
      this.toggleMenuActive();
    }
    //console.log(this.message);
  }

  getMarker(marker: any) {
    console.log(marker);
    this.selectedRestaurant = {
      name: marker.name,
      dishcount: marker.dishcount,
      lat: marker.lat,
      lon: marker.lon,
      alpha: marker.alpha
    }
  }

  updateMenu(test: string) {
    this.menuItems = menus[this.message]['menu'];
    //console.log(this.menuItems);
  }

  toggleMenuActive() {
    this.menuActive = !this.menuActive;
  }

  restaurantList = restaurants;

  ngOnInit() {
  }

}
