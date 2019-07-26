import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

import { DishComponent } from './dish.component';
import { RestaurantComponent } from './restaurant.component';
import { ReviewComponent } from './review.component'

import { RestaurantService } from '../_services';

import { restaurants, menus } from './sampleData';
import { reviews } from './sampleReviews';


@Component({
  selector: 'app-home',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(225, style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate(225, style({ opacity: 0 }))
      ])
    ])
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:
    [
      RestaurantService,
      DishComponent,
      RestaurantComponent,
      ReviewComponent
    ]
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

  showDishes: boolean = true;
  showReviews: boolean = false;


  currentRestaurantName: string;
  currentDishName: string;
  selectedRestaurant: any;

  restaurantList: any = [];
  dishList: any = [];
  reviewList: any = [];


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

  toggleReviewList() {
    if (this.showDishes) {
      // ENABLE reviews
      this.showDishes = !this.showDishes;

      setTimeout(() => {
        this.showReviews = !this.showReviews;
      }, 250);
    } else {
      this.showReviews = !this.showReviews;

      setTimeout(() => {
        this.showDishes = !this.showDishes;
      }, 250);
    }
  }


  getAllRestaurants() {
    this.loading = true;
    this.markers = [];


    this.api.getAllRestaurants().subscribe((data: {}) => {
      //console.log(data);

      var count = Object.keys(data).length;
      for (var i = 0; i < count; i++) {
        data[i]["lat"] = parseFloat(data[i]["lat"]);
        data[i]["lon"] = parseFloat(data[i]["lon"]);
      }
      console.log(count + " restaurants retrieved.");

      // this.response = JSON.stringify(data);

      this.restaurantList = data;

      this.markers = data;
      this.loading = false;
    },
      (error: any) => {
        console.log("Error retrieving all restaurants!");
        this.loading = false;
      }
    );


    /* TEMPORARY SAMPLE DATA */
    // this.loading = false;
    // this.restaurantList = restaurants;

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


  getReviews(query: string) {
    /* TODO: API CALL FOR REVIEWS FROM THIS DISH */
    console.log("Getting reviews for " + query);
    this.reviewList = reviews;
  }

  getDishes($event: any) {
    console.log("Loading restaurant " + $event);
    this.loading = true;
    this.currentRestaurantName = $event;

    if (!this.menuActive) {
      this.toggleMenuActive();
    }
    /*    this.dishList = this.response;*/


    this.api.getDishes($event).subscribe((data: {}) => {
      //console.log(data);

      var count = Object.keys(data).length;

      console.log(count + " dishes retrieved.");

      this.dishList = data;

      this.loading = false;
    },
      (error: any) => {
        console.log("Error retrieving dishes for " + $event + "!");
        this.loading = false;
      }
    );
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

  toggleMenuActive() {
    this.menuActive = !this.menuActive;
  }

  readReview($event: any) {
    console.log("Read review called");
    console.log($event);

    this.currentDishName = $event;

    /* TODO: FETCH REVIEW FOR THIS DISH */
    this.getReviews($event); //placeholder

    /* TOGGLE REVIEW LIST VIEW */
    this.toggleReviewList();
  }

  writeReview($event: any) {
    console.log("Write review called");
    console.log($event);

    this.currentDishName = $event;

    /* TODO: WRITE A REVIEW FOR THIS DISH */
    this.getReviews($event); //placeholder


    /* TOGGLE REVIEW LIST VIEW */
    this.toggleReviewList();
  }

  ngOnInit() {
    this.getAllRestaurants(); // load restaurant data on navigate

    // // DELETE, DEBUG
    // this.toggleOverview(); 
    // this.message = "Starbucks";
    // if (!this.menuActive) {
    //   this.toggleMenuActive();
    // }
    // this.updateMenu(this.message);
    // // END DELETE

  }

}
