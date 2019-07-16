import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

import { DishComponent } from './dish.component';
import { RestaurantComponent } from './restaurant.component';

import { RestaurantService } from '../_services'

import { restaurants, menus } from './sampleData'

@Component({
  selector: 'app-home',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(250, style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate(250, style({ opacity: 0 }))
      ])
    ])
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [RestaurantService, DishComponent, RestaurantComponent]
})
export class HomeComponent implements OnInit {

  menuActive: boolean;
  message: string;
  menuItems: any;
  markers: any;
  loading: boolean = false;
  searchKeyword: string = "";

  /* maps vars */
  latitude = 49.279030;
  longitude = -122.912738;
  mapType = 'roadmap';
  overview: boolean = true;
  overlay: boolean = false;

  currentRestaurantName: string;
  selectedRestaurant: any;

  response: any = {
    "name": "",
    "lat": "",
    "lon": "",
    "address": "",
    "description": "",
    "rating": 0
  }

  constructor(public api: RestaurantService) {
    this.menuActive = false;
  }

  toggleOverview() {
    if (this.overview) {
      // ENABLE OVERLAY
      this.overview = !this.overview;

      setTimeout(() => {
        this.overlay = !this.overlay;
      }, 250);
    } else {
      // DISABLE OVERLAY
      this.overlay = !this.overlay;
      this.getAllRestaurants(); // load restaurant list again?

      setTimeout(() => {
        this.overview = !this.overview;
      }, 250);
    }
  }

  getAllRestaurants() {
    this.loading = true;
    this.markers = [];
    this.api.getAllRestaurants().subscribe((data: {}) => {
      console.log(data);

      var count = Object.keys(data).length;
      for (var i = 0; i < count; i++) {
        console.log(data[i]["lat"]);
        console.log(data[i]["lon"]);
        data[i]["lat"] = parseFloat(data[i]["lat"]);
        data[i]["lon"] = parseFloat(data[i]["lon"]);
      }
      console.log(count);

      this.response = JSON.stringify(data);

      this.markers = data;
      this.loading = false;
    },
      (error: any) => {
        console.log("Error retrieving all restaurants!");
        this.loading = false;
      }
    );
  }

  getRestaurant(query: string) {
    this.loading = true;

    this.api.getRestaurant(query).subscribe(
      (data: {}) => {

        // parse floats from response
        data["lat"] = parseFloat(data["lat"]);
        data["lon"] = parseFloat(data["lon"]);

        this.response = JSON.stringify(data);

        console.log(data);
        this.loading = false;
      },
      (error: any) => {
        console.log("Error retrieving " + query);
        this.loading = false;
      }
    );
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
    this.currentRestaurantName = this.message;
    this.menuItems = menus[this.message]['menu'];
    //console.log(this.menuItems);
  }

  toggleMenuActive() {
    this.menuActive = !this.menuActive;
  }

  restaurantList = restaurants;

  ngOnInit() {
    this.getAllRestaurants(); // load restaurant data on navigate
    
    // // TODO: DELETE, DEBUG
    // this.toggleOverview(); 
    // this.message = "Starbucks";
    // if (!this.menuActive) {
    //   this.toggleMenuActive();
    // }
    // this.updateMenu(this.message);
    // // END DELETE

  }

}
